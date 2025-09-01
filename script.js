function getComputerChoice() {
    const n = Math.floor(Math.random() * 3);
    if (n === 0) return "rock";
    if (n === 1) return "paper";
    return "scissors";
  }

  function getHumanChoice() {
    return prompt("Choose Rock, Paper, or Scissors:")
  }

  function normalize(choice) {
    return choice.toLowerCase().trim();
  }

  let humanScore = 0;
  let computerScore = 0;

  playGame();

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

  function capitalize(s) {
    s = String(s);
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }

  function playGame() {
    humanScore = 0;
    computerScore = 0;

    console.log("Best of 5 - Rock, Paper, Scissors!");

    for (let round = 1; round <= 5; round++) {
        console.log(`\nRound ${round}:`);
        const human    = getHumanChoice();
        const computer = getComputerChoice();
        playRound(human, computer); 
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


