/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const start = document.getElementById('btn__reset');

start.addEventListener('click', (e) => {
    const game = new Game();
    game.startGame();
    game.handleInteraction();
    
    
    console.log(game.missed);
 
})

// start.addEventListener('onkeyup', (e) => {
//     let keyPress = 

// })