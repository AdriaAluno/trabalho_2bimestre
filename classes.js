class Produto {
  constructor(ob) {
    this.nome = ob.nome;
    this.preco = ob.preco;
    this.descricao = ob.descricao;
  }
  exibirInformacoes() {
    return `
Nome: ${this.nome}
Preço: ${this.preco.toFixed(2)}
Descrição: ${this.descricao}`;
  }
  desconto() {
    return 0;
  }
}

class ProdutoEletronico extends Produto {
  constructor(ob) {
    super(ob);
    this.voltagem = ob.voltagem;
    this.garantia = ob.garantia;
  }
  exibirInformacoes() {
    return `
${super.exibirInformacoes()}
Voltagem: ${this.voltagem}
Garantia: ${this.garantia}
`;
  }
  desconto() {
    let desconto = 0;
    if (this.preco > 1500) {
      desconto = this.preco * 0.05;
    }
    return desconto;
  }
}

class ProdutoAlimento extends Produto {
  constructor(ob) {
    super(ob);
    this.validade = ob.validade;
  }
  exibirInformacoes() {
    return `
${super.exibirInformacoes()}
Validade: ${this.validade}
 `;
  }
  desconto() {
    let desconto = 0;

    if (this.validade < 0) {
      desconto = this.preco * 0.5;
    } else if (this.validade <= 3) {
      desconto = this.preco * 0.3;
    } else if (this.validade <= 10) {
      desconto = this.preco * 0.1;
    }
    return desconto;
  }
}

class ProdutoRoupa extends Produto {
  constructor(ob) {
    super(ob);
    this.tamanho = ob.tamanho;
    this.material = ob.material;
  }
  exibirInformacoes() {
    return `
${super.exibirInformacoes()}
Tamanho: ${this.tamanho}
Material: ${this.material}
 `;
  }
  desconto() {
    let promoFixa = 0;

    if (this.tamanho === "M" || this.tamanho === "P") {
      promoFixa = this.preco * 0.15;
    }
    return promoFixa;
  }
}
module.exports = {
  ProdutoEletronico,
  ProdutoAlimento,
  ProdutoRoupa,
};
