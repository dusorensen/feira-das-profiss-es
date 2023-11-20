let score = 0;
let chanceReset = 0; // Chance inicial de resetar é 0%
let playerScores = []; // Array para armazenar jogadores e pontuações

const scoreDisplays = document.querySelectorAll('.score');
const buttons = document.querySelectorAll('.button');
const playerNameInputs = document.querySelectorAll('#playerName');
const scoreTables = document.querySelectorAll('.scoreTable');

function updateScore() {
  if (score < 100) {
    score++;
    scoreDisplays.forEach(display => display.textContent = score);
    checkReset();
  }
}

function checkReset() {
  if (Math.random() < chanceReset || score === 100) {
    playerNameInputs.forEach(input => {
      const playerName = input.value || "Jogador";
      const currentScore = score; // Salva a pontuação atual antes de resetar
      
      // Adiciona a jogada atual ao array de jogadores e pontuações
      playerScores.push({ name: playerName, score: currentScore-1 });

      // Ordena o array de objetos por pontuação (decrescente)
      playerScores.sort((a, b) => b.score - a.score);

      // Limpa a tabela antes de recriá-la e adiciona o cabeçalho fixo
      scoreTables.forEach(table => {
        table.innerHTML = `<tr><th>Nome</th><th>Pontuação</th></tr>`;
        
        // Atualiza a tabela com os dados ordenados
        playerScores.forEach(player => {
          table.innerHTML += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
        });
      });

      // Exibe o alerta com a pontuação correta
      alert(`Sua pontuação de ${currentScore-1} foi salva, ${playerName}!`);
    });

    score = 0;
    scoreDisplays.forEach(display => display.textContent = score);
    chanceReset = 0; // Reinicia a chance de resetar
    console.log('Pontuação resetada!');
  } else {
    // Aumenta a chance de resetar em 1%
    chanceReset += 0.01;
  }
}

buttons.forEach(button => button.addEventListener('click', updateScore));
