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

  // totals
  let totalYou = Number(localStorage.getItem("rps_total_you") || 0);
  let totalRobot = Number(localStorage.getItem("rps_total_robot")|| 0);

  // elements
  const statusEl  = $("#status");
  const scoreEl   = $("#score");
  const rockBtn   = $("#rockBtn");
  const paperBtn  = $("#paperBtn");
  const scissBtn  = $("#scissorsBtn");
  const restartEl = $("#restart");
  const totalsEl  = $("#totals");

  const resetTotalsEl = $("#resetTotals");

  function renderTotals() {
    totalsEl.textContent = `Total Wins - You: ${totalYou} | Robot: ${totalRobot}`;
  }
  renderTotals();

  // buttons
  rockBtn.addEventListener("click",   () => handleHuman("rock"));
  paperBtn.addEventListener("click",  () => handleHuman("paper"));
  scissBtn.addEventListener("click",  () => handleHuman("scissors"));
  restartEl.addEventListener("click", resetGame)

  resetTotalsEl.addEventListener("click", () => {
    if (!confirm('Reset total wins for both players?')) return;

    localStorage.setItem('rpsHumanWins', '0');
    localStorage.setItem('rpsRobotWins', '0');

    totalYou = 0;
    totalRobot = 0;

    renderTotals();
  });

  function handleHuman(human) {
    if (gameOver) return;

    const comp = getComputerChoice();

    // decide winner
    let msgHTML = "";

    if (human === comp) {
        msgHTML = `<strong>Tie!</strong> You both chose ${human}.`;
    } else {
        const humanWins =
            (human === "rock"     && comp === "scissors") ||
            (human === "paper"    && comp === "rock")     ||
            (human === "scissors" && comp === "paper");

        if (humanWins) {
            humanScore++;
            msgHTML = `<span class="win">You win!</span> ${cap(human)} beats ${cap(comp)}.`;
        } else {
            computerScore++;
            msgHTML = `<span class="lose">You lose!</span> ${cap(comp)} beats ${cap(human)}.`;
        }
    }

    // update UI for this round
    statusEl.innerHTML = `Round ${round}: ${msgHTML}`;
    scoreEl.textContent  = `Score - You: ${humanScore} | Robot: ${computerScore}`;

    round++;

    // first to 5 wins
    if (humanScore === 5 || computerScore === 5) {
        gameOver = true;
        const youWon = humanScore > computerScore;
        const winner = youWon ? "You" : "Robot"; 
        statusEl.textContent = `${winner} win the game!`;

        // update totals
        if (youWon) totalYou++;
        else totalRobot++;
        localStorage.setItem("rps_total_you", String(totalYou));
        localStorage.setItem("rps_total_robot", String(totalRobot));
        renderTotals;

        toggleButtons(false);
        restartEl.style.display = "block";
    }
}

function toggleButtons(on) {
    [rockBtn, paperBtn, scissBtn].forEach(b => b.disabled = !on);
}

function resetGame() {
    humanScore = computerScore = 0;
    round = 1;
    gameOver = false;

    // refresh totals
    renderTotals();

    statusEl.textContent = "Round 1: Make your move!";
    scoreEl.textContent  = "Score - You: 0 | Robot: 0";
    restartEl.style.display = "none";
    toggleButtons(true);
}

// start ready
toggleButtons(true);