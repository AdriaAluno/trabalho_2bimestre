const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

module.exports = {
  async perguntar(msg = "") {
    try {
      const r = await rl.question(msg);
      return r.trim();
    } catch {
      console.log("\nEntrada cancelada.");
      process.exit(0);
    }
  },

  async perguntarLower(msg = "") {
    const r = await this.perguntar(msg);
    return r.toLowerCase();
  },

  limpar() {
    console.clear();
  },

  validarPalavras(ar) {
    for (let p of ar) {
      if (!p || p.trim() === "") return false;
    }
    return true;
  },

  validarNumeros(ar) {
    for (let n of ar) {
      const num = Number(n);
      if (isNaN(num) || num < 0) return false;
    }
    return true;
  },

  async pausar() {
    await this.perguntar("\nenter...");
  },

  sair() {
    rl.close();
    process.exit(0);
  },
};
 