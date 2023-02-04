/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const start = document.getElementById('btn__reset');

const game = new Game();
start.addEventListener('click', (e) => {
    game.startGame();  
    console.log('Game phrase = ' + game.activePhrase.phrase);
})
game.handleInteraction();