const palavras = ["serra", "linha", "feira", "tigre", "piano", "pedro", "ferro", "terra", "carta", "livro"];

const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
const maxTentativas = 6;
let tentativaAtual = 0;
let palavraDigitada = "";

const gameBoard = document.getElementById("game-board");
const message = document.getElementById("message");

for (let i = 0; i < maxTentativas; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }
  gameBoard.appendChild(row);
}
function mostrarMensagem(msg) {
  message.textContent = msg;
}
function verificarTentativa(palavra) {
  const row = gameBoard.children[tentativaAtual];
  const letras = palavra.split("");
  const letrasSecretas = palavraSecreta.split("");

  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    tile.textContent = letras[i];

    if (letras[i] === letrasSecretas[i]) {
      tile.classList.add("correct");
    } else if (letrasSecretas.includes(letras[i])) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  }

  if (palavra === palavraSecreta) {
    mostrarMensagem("Parabéns! Você acertou!");
    document.removeEventListener("keydown", handleKeyPress);
  } else if (tentativaAtual === maxTentativas - 1) {
    mostrarMensagem(`Fim de jogo! A palavra era: ${palavraSecreta}`);
    document.removeEventListener("keydown", handleKeyPress);
  }

  tentativaAtual++;
  palavraDigitada = "";
}
function handleKeyPress(e) {
  const key = e.key.toLowerCase();
  if (key === "enter") {
    if (palavraDigitada.length === 5) {
      verificarTentativa(palavraDigitada);
    }
  } else if (key === "backspace") {
    palavraDigitada = palavraDigitada.slice(0, -1);
    atualizarLinha();
  } else if (/^[a-zà-ú]$/.test(key) && palavraDigitada.length < 5) {
    palavraDigitada += key;
    atualizarLinha();
  }
}
function atualizarLinha() {
  const row = gameBoard.children[tentativaAtual];
  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    tile.textContent = palavraDigitada[i] || "";
  }
}
document.addEventListener("keydown", handleKeyPress);