const { CorpusLookup } = require("@nlpjs/utils");
const { TokenizerEn } = require('@nlpjs/lang-en');

class BrainClassifier {
    constructor(){
        this.tokenizer = new TokenizerEn();
        this.stemmer = {
            tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true)
        };
    }

    train(corpus){
        this.lookups = new CorpusLookup(corpus, this.stemmer);
        
    }

    process(utterance){

    }
}

module.exports = BrainClassifier();

// Greeting intents
// good morning                 -> [1, 1, 0, 0, 0, 0, 0]
// good evening                 -> [1, 0, 1, 0, 0, 0, 0]

// Leaving intents
// see you later                -> [0, 0, 0, 1, 1, 1, 0]
// goodbye                      -> [0, 0, 0, 0, 0, 0, 1]

// These will need to be tokenised and changed to numeric vectors
// good morning evening see you later goodbye 
// Empty  -> [0, 0, 0, 0, 0, 0, 0]
