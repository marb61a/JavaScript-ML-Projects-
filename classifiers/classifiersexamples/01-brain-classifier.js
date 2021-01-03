const { CorpusLookup } = require("@nlpjs/utils");
const { TokenizerEn } = require('@nlpjs/lang-en');
const { NeuralNetwork } = require("brain.js");

const defaultNetOptions = {
    log: (str) => console.log(str),
    logPeriod: 10,
    hiddenLayers: [],
    activation: "leaky-relu",
    learningRate: 0.7,
    momentum: 0.5,
    alpha: 0.08,
    errorThresh: 0.00005
};

class BrainClassifier {
    constructor(settings){
        this.settings = settings || defaultNetOptions;
        this.tokenizer = new TokenizerEn();
        this.stemmer = settings.stemmer || {
            tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true)
        };
    }

    train(corpus){
        this.lookups = new CorpusLookup(corpus, this.stemmer);
        // console.log(this.lookups);
        
        this.net = new NeuralNetwork();
    }

    process(utterance){

    }
}

module.exports = BrainClassifier;

// Greeting intents
// good morning                 -> [1, 1, 0, 0, 0, 0, 0]
// good evening                 -> [1, 0, 1, 0, 0, 0, 0]

// Leaving intents
// see you later                -> [0, 0, 0, 1, 1, 1, 0]
// goodbye                      -> [0, 0, 0, 0, 0, 0, 1]

// These will need to be tokenised and changed to numeric vectors
// good morning evening see you later goodbye 
// Empty  -> [0, 0, 0, 0, 0, 0, 0]
