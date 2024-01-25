// Elements
const welcomeScreen = document.getElementById(`welcome-screen`);
const gameScreen = document.getElementById(`game-screen`);
const startGameButton = document.getElementById(`start-game-button`);
const userNameInput = document.getElementById(`username`);
const userSelection = document.getElementById(`user-selection`);
const goButton = document.getElementById(`go-button`);
const scoreParagraph = document.getElementById(`score`);
const gameHistoryParagraph = document.getElementById(`game-history`);

// instantiate the game object from the `RockPaperScissors` class.
let game;

// hide game screen
gameScreen.classList.add(`d-none`);

// updateScoreTallyUI
function updateScoreTallyUI(){
  scoreParagraph.innerHTML = `${game.username}: ${game.score.user} v CPU: ${game.score.cpu}`;
}

// updateGameHistoryUI
function updateGameHistoryUI(){
  gameHistoryParagraph.innerHTML = ``;
  game.gameHistoryLog.forEach((log) => {
    gameHistoryParagraph.innerHTML += `<li>${log}</li>`;
  });
}

// start-game-button EventListener
startGameButton.addEventListener(`click`, function (e) {
  e.preventDefault();
  const username = userNameInput.value;
  // eslint-disable-next-line no-undef
  game = new RockPaperScissors(username);
  // Complete
  welcomeScreen.classList.add(`d-none`);
  gameScreen.classList.remove(`d-none`);
  updateScoreTallyUI();
});

// go-button EventListener
// add an Event Listener to the go-button on the click event.

// get the userSelection from the select
// call the play(userSelection) of the game object.
// update the text of scoreParagraph using the updateScoreTallyUI() function
// update the gameHistoryParagraph using the updateGameHistoryUI() function
goButton.addEventListener(`click`, function (e) {
  e.preventDefault();
  game.play(userSelection.value);
  updateScoreTallyUI();
  updateGameHistoryUI();
});

// If you're doing the extra-credit, uncomment the below: reset-game-button
// resetGameButton.addEventListener(`click`, function(e) { 
  
// });