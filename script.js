function getComputerChoice() {
    const n = Math.floor(Math.random() * 3); // 0, 1, or 2
    if (n === 0) return "rock";
    if (n === 1) return "paper";
    return "scissors";
  }

  function getHumanChoice() {
    return prompt("Choose Rock, Paper, or Scissors:")
  }

  