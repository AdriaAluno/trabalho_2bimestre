const donoMenus = {
  primeiroMenu: `
   Escolha a operação que deseja fazer:
   1. Cadastrar produto
   2. Listar produtos
   3. Buscar produto
   4. Deletar produto
   voltar (v)
   sair   (S)
   `,
  cadastrarProduto: `
   Escolha a categoria do produto que deseja cadastrar:
   1. Eletrônico
   2. Alimento
   3. Roupa
   voltar (v)
   sair   (S)
   `,
  listarProdutosMenu: `
   Escolha a categoria dos produtos que deseja listar:
   1. Eletrônico
   2. Alimento
   3. Roupa
   voltar (v)
   sair   (S)
   `,
};

const clienteMenus = {
  primeiroMenu: `
   Escolha a operação que deseja fazer:
   1. Listar produtos
   2. Buscar produto
   Carrinho (c)
   voltar (v)
   sair   (S)
   `,
  listarProdutosMenu: `
   Escolha a categoria dos produtos que deseja listar:
   1. Eletrônico
   2. Alimento
   3. Roupa
   voltar (v)
   sair   (S)
   `,
};

function carrinho(ob) {
  return `
         __________
        ||Carrinho||
   Itens: ${ob.totalItens}
   Valor: ${ob.valor}
   Com desconto: ${ob.valorComDesconto}
   1. pagar
   2. pagar com desconto
   fechar (f)
   `;
}

module.exports = { donoMenus, clienteMenus, carrinho };
