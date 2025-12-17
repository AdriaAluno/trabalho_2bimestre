const {
  adicionarProduto,
  buscarProdutoPeloNome,
  buscarProdutosPelaCategoria,
  deletarProduto,
  verificaSeExiste,
} = require("./manipulacaoProdutos.js");

const utils = require("./utils.js");
const { donoMenus, clienteMenus, carrinho } = require("./menus.js");

async function loja(estoque) {
  while (true) {
    utils.limpar();

    const opcao = await utils.perguntarLower(`
   Escolha uma das opções:
   1. Dono
   2. Cliente
   sair (S)
   `);

    if (opcao === "1") await donoLoja(estoque);
    else if (opcao === "2") await cliente(estoque);
    else if (opcao === "s") utils.sair();
  }
}

async function donoLoja(estoque) {
  while (true) {
    utils.limpar();
    const opcao = await utils.perguntarLower(donoMenus.primeiroMenu);

    if (opcao === "1") await cadastrarProduto(estoque);
    else if (opcao === "2") await listarProdutosDono(estoque);
    else if (opcao === "3") await buscarProdutoDono(estoque);
    else if (opcao === "4") await deletarProdutoDono(estoque);
    else if (opcao === "v") return;
    else if (opcao === "s") utils.sair();
  }
}

async function cadastrarProduto(estoque) {
  while (true) {
    utils.limpar();
    const opcao = await utils.perguntarLower(donoMenus.cadastrarProduto);

    if (opcao === "v") return;
    if (opcao === "s") utils.sair();
    if (!["1", "2", "3"].includes(opcao)) continue;

    const nome = await utils.perguntar("nome: ");
    if (verificaSeExiste(nome, estoque)) {
      console.log("Produto já existe");
      await utils.pausar();
      continue;
    }

    const preco = await utils.perguntar("preço: ");
    const descricao = await utils.perguntar("descrição: ");

    if (
      !utils.validarPalavras([nome, descricao]) ||
      !utils.validarNumeros([preco])
    ) {
      console.log("Dados inválidos");
      await utils.pausar();
      continue;
    }

    if (opcao === "1") {
      const voltagem = await utils.perguntar("voltagem: ");
      const garantia = await utils.perguntar("garantia: ");

      adicionarProduto(
        {
          nome,
          preco: Number(preco),
          descricao,
          voltagem,
          garantia,
          categoria: "eletronico",
        },
        estoque
      );
      return;
    }

    if (opcao === "2") {
      const validade = await utils.perguntar("validade: ");

      adicionarProduto(
        {
          nome,
          preco: Number(preco),
          descricao,
          validade,
          categoria: "alimento",
        },
        estoque
      );
      return;
    }

    if (opcao === "3") {
      const tamanho = (await utils.perguntar("tamanho: ")).toUpperCase();
      const material = await utils.perguntar("material: ");

      adicionarProduto(
        {
          nome,
          preco: Number(preco),
          descricao,
          tamanho,
          material,
          categoria: "roupa",
        },
        estoque
      );
      return;
    }
  }
}

async function listarProdutosDono(estoque) {
  const mapa = { 1: "eletronico", 2: "alimento", 3: "roupa" };

  while (true) {
    utils.limpar();
    const opcao = await utils.perguntarLower(donoMenus.listarProdutosMenu);

    if (opcao === "v") return;
    if (opcao === "s") utils.sair();

    if (opcao === "4") {
      Object.values(estoque)
        .flat()
        .forEach((p) => console.log(p.exibirInformacoes()));
      await utils.pausar();
      continue;
    }

    if (mapa[opcao]) {
      const produtos = buscarProdutosPelaCategoria(mapa[opcao], estoque);
      if (!produtos.length) console.log("Nenhum produto");
      produtos.forEach((p) => console.log(p.exibirInformacoes()));
      await utils.pausar();
    }
  }
}

async function buscarProdutoDono(estoque) {
  while (true) {
    const nome = await utils.perguntarLower("nome (v para voltar): ");
    if (nome === "v") return;
    if (nome === "s") utils.sair();

    const produtos = buscarProdutoPeloNome(nome, estoque);
    if (!produtos.length) console.log("Não encontrado");
    produtos.forEach((p) => console.log(p.exibirInformacoes()));
    await utils.pausar();
  }
}

async function deletarProdutoDono(estoque) {
  const mapa = { 1: "eletronico", 2: "alimento", 3: "roupa" };

  while (true) {
    const nome = await utils.perguntarLower("nome (v para voltar): ");
    if (nome === "v") return;
    if (nome === "s") utils.sair();

    const cat = await utils.perguntar("categoria (1/2/3): ");
    if (!mapa[cat]) {
      console.log("Categoria inválida");
      await utils.pausar();
      continue;
    }

    deletarProduto(nome, mapa[cat], estoque);
    return;
  }
}

async function cliente(estoque) {
  const carrinhoObj = {
    totalItens: 0,
    valor: 0,
    valorComDesconto: 0,
    itens: [],
    adicionar(p) {
      this.itens.push(p);
      this.totalItens++;
      this.valor += p.preco;
      this.valorComDesconto += p.preco - p.desconto();
    },
    pagar() {
      this.totalItens = 0;
      this.valor = 0;
      this.valorComDesconto = 0;
      this.itens = [];
    },
  };

  while (true) {
    utils.limpar();
    const opcao = await utils.perguntarLower(clienteMenus.primeiroMenu);

    if (opcao === "1") await listarProdutosCliente(estoque, carrinhoObj);
    else if (opcao === "2") await buscarProdutoCliente(estoque);
    else if (opcao === "c") await finalizarCompra(carrinhoObj);
    else if (opcao === "v") return;
    else if (opcao === "s") utils.sair();
  }
}

async function listarProdutosCliente(estoque, carrinhoObj) {
  const mapa = { 1: "eletronico", 2: "alimento", 3: "roupa" };

  while (true) {
    utils.limpar();
    const opcao = await utils.perguntarLower(clienteMenus.listarProdutosMenu);
    if (opcao === "v") return;
    if (opcao === "s") utils.sair();

    if (mapa[opcao]) {
      const produtos = buscarProdutosPelaCategoria(mapa[opcao], estoque);
      produtos.forEach((p) => console.log(p.exibirInformacoes()));

      const add = await utils.perguntarLower("Adicionar? (s/n): ");
      if (add === "s") {
        const nome = await utils.perguntar("nome: ");
        const p = buscarProdutoPeloNome(nome, estoque)[0];
        if (p) carrinhoObj.adicionar(p);
      }
    }
  }
}

async function buscarProdutoCliente(estoque) {
  while (true) {
    const nome = await utils.perguntarLower("nome (v para voltar): ");
    if (nome === "v") return;

    const produtos = buscarProdutoPeloNome(nome, estoque);
    produtos.forEach((p) => console.log(p.exibirInformacoes()));
    await utils.pausar();
  }
}

async function finalizarCompra(carrinhoObj) {
  while (true) {
    utils.limpar();
    const opcao = await utils.perguntarLower(carrinho(carrinhoObj));

    if (opcao === "1") {
      console.log("Total:", carrinhoObj.valor);
      carrinhoObj.pagar();
      return;
    }

    if (opcao === "2") {
      console.log("Total com desconto:", carrinhoObj.valorComDesconto);
      carrinhoObj.pagar();
      return;
    }

    if (opcao === "f") return;
  }
}

const estoque = {
  eletronico: [],
  alimento: [],
  roupa: [],
};

(async () => {
  await loja(estoque);
})();

module.exports = loja;

