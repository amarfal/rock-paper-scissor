function getComputerChoice() {
    const n = Math.floor(Math.random() * 3); // 0, 1, or 2
    if (n === 0) return "rock";
    if (n === 1) return "paper";
    return "scissors";
  }

  function getHumanChoice() {
    return prompt("Choose Rock, Paper, or Scissors:")
  }

  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    const human = normalize(humanChoice);
    const comp = normalize(computerChoice);

    if (human === comp) {
        console.log(`Tie! You both chose ${human}.`);
        return;
    }

    const humanWins =
        (human === "rock"     && comp === "scissors") ||
        (human === "paper"    && comp === "rock")     ||
        (human === "scissors" && comp === "paper")

    if (humanWins) {
        humanScore++;
        console.log(`You win! ${capitalize(human)} beats ${capitalize(comp)}.`);
    } else {
        computerScore++;
        console.log(`You lose! ${capitalize(comp)} beats ${capitalize(human)}.`);
    }
    console.log(`Score - You: ${humanScore} | Robot: ${computerScore}`);
  }

