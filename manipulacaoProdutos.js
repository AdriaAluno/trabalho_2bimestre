const {
     ProdutoEletronico,
     ProdutoAlimento,
     ProdutoRoupa,
   } = require("./classes.js");
   
   function adicionarProduto(ob, estoque) {
     if (!ob || !ob.categoria) return;
   
     if (ob.categoria === "eletronico") {
       const novoProduto = new ProdutoEletronico(ob);
       estoque.eletronico.push(novoProduto);
     } else if (ob.categoria === "alimento") {
       const novoProduto = new ProdutoAlimento(ob);
       estoque.alimento.push(novoProduto);
     } else if (ob.categoria === "roupa") {
       const novoProduto = new ProdutoRoupa(ob);
       estoque.roupa.push(novoProduto);
     }
   
     return estoque;
   }
   
   function deletarProduto(nome, categoria, estoque) {
     estoque[categoria] = estoque[categoria].filter(
       (produto) => produto.nome !== nome
     );
     return estoque;
   }
   
   function buscarProdutoPeloNome(nome, estoque) {
     for (const categoria in estoque) {
       const produtos = estoque[categoria].filter(
         (produto) => produto.nome === nome
       );
   
       if (produtos.length > 0) {
         return produtos;
       }
     }
     return [];
   }
   
   function buscarProdutosPelaCategoria(categoria, estoque) {
     return estoque[categoria] ?? [];
   }
   
   function verificaSeExiste(nome, estoque) {
     for (const categoria in estoque) {
       if (estoque[categoria].some((produto) => produto.nome === nome)) {
         return true;
       }
     }
     return false;
   }
   
   module.exports = {
     adicionarProduto,
     deletarProduto,
     buscarProdutoPeloNome,
     buscarProdutosPelaCategoria,
     verificaSeExiste,
   };
   
