// helpers
const $ = (sel) => document.querySelector(sel);
const cap = (s) => s[0].toUpperCase() + s.slice(1);

function getComputerChoice() {
    const n = Math.floor(Math.random() * 3);
    return n === 0 ? "rock" : n === 1 ? "paper" : "scissors";
  }
  
  let humanScore = 0;
  let computerScore = 0;
  let round = 1;
  let gameOver = false;

  const statusEl  = $("#status");
  const scoreEl   = $("#score");
  const rockBtn   = $("#rockBtn");
  const paperBtn  = $("#paperBtn");
  const scissBtn  = $("#scissorsBtn");
  const restartEl = $("#restart");

  rockBtn.addEventListener("click",   () => handleHuman("rock"));
  paperBtn.addEventListener("click",  () => handleHuman("paper"));
  scissBtn.addEventListener("click",  () => handleHuman("scissors"));
  restartEl.addEventListener("click", resetGame)

    if (human === comp) {
        console.log(`Tie! You both chose ${human}.`);
        return 'tie';
    }

    const humanWins =
        (human === "rock"     && comp === "scissors") ||
        (human === "paper"    && comp === "rock")     ||
        (human === "scissors" && comp === "paper")

    if (humanWins) {
        humanScore++;
        humanStreak++;
        compStreak = 0;
        console.log(`You win! ${capitalize(human)} beats ${capitalize(comp)}.`);
        console.log(`Score - You: ${humanScore} | Robot: ${computerScore}`);
        return 'human';
    } else {
        computerScore++;
        compStreak++;
        humanStreak = 0;
        console.log(`You lose! ${capitalize(comp)} beats ${capitalize(human)}.`);
        console.log(`Score - You: ${humanScore} | Robot: ${computerScore}`);
        return 'computer';
    }

  function capitalize(s) {
    s = String(s);
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }

  function playGame() {
    humanScore = 0;
    computerScore = 0;
    humanStreak = 0;
    compStreak = 0;

    console.log("Best of 5 - Rock, Paper, Scissors!");

    for (let round = 1; round <= 5; ) {
        console.log(`\nRound ${round}:`);

        const human    = getHumanChoice();
        if (human === null) {
            console.log("Game Cancelled.");
            return;
        }
        if (human === "invalid") {
            continue;
        }

        const computer = getComputerChoice();
        playRound(human, computer); 

        if (humanScore === 3 || computerScore === 3) {
            console.log("\nEarly Finish: someone reached 3 wins.");
            break;
        }
        
        if (humanStreak === 3 || compStreak === 3) {
            console.log("\nEarly Finish: someone won 3 in a row.");
            break;
        }

        round++;
    }

    console.log("\nFinal Result:");
    if (humanScore > computerScore) {
        console.log(`You win the game! ${humanScore}-${computerScore}`);
    } else if (computerScore > humanScore) {
        console.log(`Robot wins the game! ${computerScore}-${humanScore}`);
    } else {
        console.log(`It's a tie game! ${humanScore}-${computerScore}`);
    }
  }


