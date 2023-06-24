/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    let chains;
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

    let patterns = {};

    this.words.forEach( (word, i) => {

        if(this.words.length == i+1){
            patterns[word] = [null];
        }
        else if(word in patterns){
            patterns[word].push(this.words[i+1]);
        }
        else{
            patterns[word] = [this.words[i+1]];
        }

    });
    
    this.chains = patterns;

  }


  /** return random text from chains */

  makeText(numWords = 100) {
    
    let keys = Object.keys(this.chains);
    let currentWord = keys[Math.trunc(keys.length * Math.random())];

    let genText = currentWord;
    let wordCount = 1;

    while(wordCount < numWords){
        let nextWords = this.chains[currentWord];

        if(nextWords[0] === null){
            break;
        }
        else{
            currentWord = nextWords[Math.trunc(nextWords.length * Math.random())];
            genText += " " + currentWord;
        }

        wordCount += 1;

    }

    return genText;

  }
}

module.exports = MarkovMachine;
