const tf = require('@tensorflow/tfjs-node');
const { CorpusLookup } = require('@nlpjs/utils');
const { TokenizerEn } = require('@nlpjs/lang-en');

class TensorflowClassifier{
    constructor(settings, stemmer) {
        this.settings = settings || {};
        this.tokenizer = new TokenizerEn();
        this.stemmer = stemmer || { tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true) };
    }

    createModel(){
        
    }

    // Tensorflow is async
    async train(corpus){
        this.lookups = new CorpusLookup(corpus, this.stemmer);
    }

    process(utterance){

    }

}

module.exports = TensorflowClassifier;