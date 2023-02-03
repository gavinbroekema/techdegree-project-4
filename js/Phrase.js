/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    // is this still needed w getter and setter?
    constructor(phrase) {
        this.phrase = phrase;
    }

    set phrase(phrase) {
        this._phrase = phrase.toLowerCase();
    }

    get phrase() {
        return this._phrase;
    }

    addPhraseToDisplay(phrase) {
        let phraseArray = phrase.split('');
        let fullPhraseHTML = '<ul>';
        phraseArray.forEach(letter => {
            if(letter == ' ') {
                fullPhraseHTML += `\t \t<li class="space"> </li> \n`;
            } else {
                fullPhraseHTML += `\t \t<li class="hide letter ${letter}">${letter}</li> \n`;
            }
        })
        fullPhraseHTML += '</ul>';
        return fullPhraseHTML;

    }

    /**
     * Checks to see if the letter selected by the player matches a letter in the phrase.
     * @param {*} e  
     */
    checkLetter(e) {
        const letters = this._phrase.split('');
        let matchedLetter = null;
        letters.forEach(letter => {
            if(e.target.innerHTML === letter && e.target.className !== 'keyrow') {
                e.target.className = 'key chosen';
                e.target.disabled = true;
                matchedLetter = letter;
            } 
        })
        if(e.target.className !== 'keyrow' && matchedLetter === null) {
            e.target.className = 'key wrong';       
            e.target.disabled = true;
        } 
        return matchedLetter;
    }
    
    /**
     * Check to see if the letter clicked on the screen matches any of the letters in the phrase

     */
    showMatchedLetter(e) {
        // change one or many of those letters' classes from hide to show
        let matchedLetter = this.checkLetter(e);
        const phraseHTML = document.getElementsByClassName('letter');
        Array.from(phraseHTML).forEach(listItem => {
            if(listItem.innerHTML === matchedLetter) {
                // Toggle the matched letter on the board
                listItem.classList.add('show');
                listItem.classList.remove('hide');
            }
        })
    }
  };

