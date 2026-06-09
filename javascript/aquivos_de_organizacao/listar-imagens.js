const fs = require("fs");
const path = require("path");

const baseDir = "assets/imagens";
const outputFile = "lista-imagens.txt";
const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

const linhas = [];

function listar(dir, prefix = "") {
  const itens = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name, "pt-BR");
    });

  itens.forEach((item, index) => {
    const fullPath = path.join(dir, item.name);
    const ultimo = index === itens.length - 1;
    const conector = ultimo ? "└── " : "├── ";

    if (item.isDirectory()) {
      linhas.push(prefix + conector + item.name + "/");
      listar(fullPath, prefix + (ultimo ? "    " : "│   "));
    } else if (exts.includes(path.extname(item.name).toLowerCase())) {
      linhas.push(prefix + conector + item.name);
    }
  });
}

linhas.push(baseDir + "/");
listar(baseDir);

fs.writeFileSync(outputFile, linhas.join("\n"), "utf8");

console.log(`Arquivo gerado com sucesso: ${outputFile}`);