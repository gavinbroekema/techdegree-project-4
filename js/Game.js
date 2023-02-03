/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('i love you'), new Phrase('you are my favorite'), new Phrase('mexican tonight'), new Phrase('hang out'), new Phrase('cuddle time')];
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

        // const qwerty = document.getElementById('qwerty');
        
        
    }

    removeLife(e) {
        // liveHeart.png images with a lostHeart.png
        // missed ++
        let letterValidator = this.activePhrase.checkLetter(e);
        if(letterValidator === null && e.target.className !== 'keyrow') {
            const tries = document.getElementsByClassName('tries');
            for(let i = (tries.length - 1); i >= 0; i--) {
                console.log(tries[i].firstChild.src);
                // is there a better way than the full path?
                if(tries[i].firstChild.src.includes('images/liveHeart.png')) {
                    tries[i].firstChild.src = 'images/lostHeart.png';
                    break;
                }
            }

            this.missed++;
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
        console.log('Resetting...')
        // Remove the phrase from the board
        const phrase = document.getElementById('phrase');
        phrase.firstChild.remove();

        // Reset all keys 
        // For some reason I am unable to 
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
        console.log(keyButtons);
        keyButtons.forEach(key => {
            console.log(key);
            key.disabled = false;
        })

        // reset game object
        this.activePhrase = null;
        
        // Reset lives
        this.missed = 0; 
        const scoreboard = document.getElementById('scoreboard');
        const tries = scoreboard.querySelectorAll('img');
        const triesArray = Array.from(tries);
        
        for(let i = 0; i < triesArray.length; i++) {
            triesArray[i].src = 'images/liveHeart.png';
        }
    }

    gameOver() {
        // display original start screen overlay
        // if win display start
        // if loss display loss
        const overlay = document.getElementById('overlay');

        if(this.missed === 5) {
            overlay.className = 'lose';
            overlay.style.display = '';

            // reset game 

            this.resetBoard();

        } else if (this.missed < 5 && this.checkForWin() === true) {
            overlay.className = 'win';
            overlay.style.display = '';
            // reset lives 
            this.resetBoard();
        }

    }

    handleInteraction() {
        // check letter 
        const qwerty = document.getElementById('qwerty');
        qwerty.addEventListener('click', e => {
            // this.activePhrase.checkLetter(e);
            this.activePhrase.showMatchedLetter(e);
            this.removeLife(e);
            this.checkForWin();
            this.gameOver();
        })

    }
 

}
