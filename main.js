let loja = require("./metodosMenu");
let estoque = {
  eletronico: [],
  alimento: [],
  roupa: [],
};
async function iniciar() {
  return await loja(estoque);
}
iniciar();
