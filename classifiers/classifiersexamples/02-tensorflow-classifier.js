const tf = require('@tensorflow/tfjs-node');
const { CorpusLookup } = require('@nlpjs/utils');
const { TokenizerEn } = require('@nlpjs/lang-en');
const { mod } = require('@tensorflow/tfjs-node');

class TensorflowClassifier{
    constructor(settings, stemmer) {
        this.settings = settings || {};
        this.tokenizer = new TokenizerEn();
        this.stemmer = stemmer || { tokenizeAndStem: (str) => this.tokenizer.tokenize(str, true) };
    }

    createModel(numFeatures, numClasses){
        const model = tf.sequential();
        model.add({
            inputShape: [numFeatures],
            activation: "linear",
            units: numClasses
        });
        model.add(tf.layers.softmax);

        model.compile({
            optimizer: tf.train.adagrad(0.5),
            loss: "categoricalCrossentropy"
        });

        return model;
    }

    getTrainingData(){
        const result = {
            xs: [],
            ys: []
        };

        
    }

    // Tensorflow is async
    async train(corpus){
        this.lookups = new CorpusLookup(corpus, this.stemmer);
    }

    process(utterance){

    }

}

module.exports = TensorflowClassifier;