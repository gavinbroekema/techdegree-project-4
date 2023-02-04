/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('test a'), new Phrase('test b'), new Phrase('test c'), new Phrase('test d'), new Phrase('test e')];
        this.activePhrase = null;
    }

    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * 4)];
    }

    startGame() {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'none';

        // add random phrase to display
        const randomPhrase = this.getRandomPhrase();
        this.activePhrase = randomPhrase;

        // create a phrase object and set the phrase to the active phrase
        // addPhraseToDisplay(activePhrase)
        const phraseDisplay = document.getElementById('phrase');
        phraseDisplay.innerHTML = randomPhrase.addPhraseToDisplay(this.activePhrase.phrase);
    }

    removeLife(e) {
        let livesLeft;
        if(e.target.className !== 'keyrow') {

            this.missed++;
            livesLeft = 5 - this.missed;
            
            
            const tries = document.getElementsByClassName('tries');
            
            for(let i = 0; i < livesLeft - 1; i++) {
                tries[i].firstChild.src = 'images/liveHeart.png';
            }
            for(let j = livesLeft; j < 5; j++) {
                tries[j].firstChild.src = 'images/lostHeart.png';
            }
        }
    }

    /**
     * // Check if all letters have been revealed
     * @returns boolean
     */
    checkForWin() {
        const phrase = document.getElementById('phrase');
        const letters = phrase.querySelectorAll('li');
        const lettersArray = Array.from(letters);
        
        // if any of the tiles are hidden the game has not been won
        let correctTiles = 0;
        const noSpacePhrase = this.activePhrase.phrase.replace(/ /g, '');

        // check phrase length
        let phraseLength = noSpacePhrase.length;

        // check number of correct tiles
        lettersArray.forEach(letter => {
            if(letter.classList.contains('show')) {
                correctTiles++;            } 
            
        })
        if(correctTiles === phraseLength) {
            return true;
        }
    }

    resetBoard() {
        console.log('Resetting...');
        // Remove the phrase from the board
        const phrase = document.getElementById('phrase');
        phrase.firstChild.remove();

        // Reset all keys  
        const keysChosenArray = Array.from(document.getElementsByClassName('chosen'));
        const keysWrongArray = Array.from(document.getElementsByClassName('wrong'));

        keysChosenArray.forEach(key => {
            key.className = 'key';
        })
        keysWrongArray.forEach(key => {
            key.className = 'key';
        })
        // enable all buttons
        const keyButtons = document.querySelectorAll('.key');
        keyButtons.forEach(key => {
            key.disabled = false;
        })

        // reset game
        this.activePhrase = null;
        this.missed = 0;
        
        
        const scoreboard = document.getElementById('scoreboard');
        const tries = scoreboard.querySelectorAll('img');
        const triesArray = Array.from(tries);
        
        for(let i = 0; i < triesArray.length; i++) {
            triesArray[i].src = 'images/liveHeart.png';
        }
    }

    /**
     * Checks to see if the game is over and displays a win or loss overlay
     */
    gameOver() {
        // display original start screen overlay
        // if win display start
        const overlay = document.getElementById('overlay');
        const btn__reset = document.getElementById('btn__reset');
        if(this.missed === 5) {
            overlay.className = 'lose';
            overlay.style.display = '';
            btn__reset.innerHTML = 'You Lose';
            this.resetBoard();
        // if loss display loss
        } else if (this.missed < 5 && this.checkForWin() === true) {
            overlay.className = 'win';
            overlay.style.display = '';
            btn__reset.innerHTML = 'You Win!';
            this.resetBoard();
        }

    }
    /**
     * Handles all interations within the game
     */
    handleInteraction() {
        const qwerty = document.getElementById('qwerty');
        qwerty.addEventListener('click', e => {
            if(e.target.nodeName === 'BUTTON') {
                const letters = this.activePhrase.phrase.split('');
                e.target.disabled = true;
                if(this.activePhrase.checkLetter(e)) {
                    letters.forEach(letter => {
                        if(e.target.innerHTML === letter) {
                            e.target.className = 'key chosen';
                        }       
                    })
                    this.activePhrase.showMatchedLetter(e);
                    if(this.checkForWin()) {
                        this.gameOver();
                    }
                } else if (!this.activePhrase.checkLetter(e)) {
                    letters.forEach(letter => {
                        if(e.target.innerHTML !== letter) {
                            e.target.className = 'key wrong';
                        }       
                    })
                    this.removeLife(e);
                    this.gameOver();
                }
            }
        })
            
    }
 

}
