// helpers
const $ = (sel) => document.querySelector(sel);
const cap = (s) => s[0].toUpperCase() + s.slice(1);

// computer move
function getComputerChoice() {
    const n = Math.floor(Math.random() * 3);
    return n === 0 ? "rock" : n === 1 ? "paper" : "scissors";
  }
  
  // state
  let humanScore = 0;
  let computerScore = 0;
  let round = 1;
  let gameOver = false;

  // elements
  const statusEl  = $("#status");
  const scoreEl   = $("#score");
  const rockBtn   = $("#rockBtn");
  const paperBtn  = $("#paperBtn");
  const scissBtn  = $("#scissorsBtn");
  const restartEl = $("#restart");

  // buttons
  rockBtn.addEventListener("click",   () => handleHuman("rock"));
  paperBtn.addEventListener("click",  () => handleHuman("paper"));
  scissBtn.addEventListener("click",  () => handleHuman("scissors"));
  restartEl.addEventListener("click", resetGame)

  function handleHuman(human) {
    if (gameOver) return;

    const comp = getComputerChoice();

    // decide winner
    let msg = "";
    if (human === comp) {
        msg = `Tie! You both chose ${human}.`;
    } else {
        const humanWins =
            (human === "rock"     && comp === "scissors") ||
            (human === "paper"    && comp === "rock")     ||
            (human === "scissors" && comp === "paper");

        if (humanWins) {
            humanScore++;
            msg = `You win! ${cap(human)} beats ${cap(comp)}.`;
        } else {
            computerScore++;
            msg = `You lose! ${cap(comp)} beats ${cap(human)}.`;
        }
    }

    // update UI
    statusEl.textContent = `Round ${round}: ${msg}`;
    scoreEl.textContent  = `Score - You: ${humanScore} | Robot: ${computerScore}`;

    // first to 5 wins
    if (humanScore === 5 || computerScore === 5) {
        gameOver = true;
        const winner = humanScore > computerScore ? "You" : "Robot";
        statusEl.textContent = `${winner} win the game!`;
        toggleButtons(false);
        restartEl.style.display = "inline-block";
    }
}

function toggleButtons(on) {
    [rockBtn, paperBtn, scissBtn].forEach(b => b.disabled = !on);
}

function resetGame() {
    humanScore = computerScore = 0;
    round = 1;
    gameOver = false;
    statusEl.textContent = "Round 1: Make your move!";
    scoreEl.textContent  = "Score - You: 0 | Robot: 0";
    restartEl.style.display = "none";
    toggleButtons(true);
}

// start ready
toggleButtons(true);