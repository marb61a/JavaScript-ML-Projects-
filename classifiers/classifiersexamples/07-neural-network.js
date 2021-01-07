const Perceptron = require('./05-perceptron');

const defaultSettings = {
    learningRate: 0.6,
    momentum: 0.5,
    alpha: 0.07,
    maxIterations: 2000,
    errorTresh: 0.00005,
};

class NeuralNetwork{
    constructor(settigns){
        this.settings = settings || defaultSettings;
    }
    
    initialize(numInputs, labels){
        this.perceptrons = [];
        this.outputs = {};

        for(let i = 0; i < labels.length; i += 1){
            const percptron = new Perceptron({
                id: i,
                label: labels[i],
                numInputs,
                momentum: this.settings.momentum,
                alpha: this.settings.alpha,
                learningRate: this.settings.learningRate
            });

            this.perceptrons.push(percptron);
            this.outputs[labels[i]] = 0;
        }
    }

    run(input){
        for(let i = 0; i < this.perceptrons.length; i += 1){
            const perceptron = this.perceptrons[i];
            this.outputs[perceptron.label] = perceptron.run(input);
        }

        return this.outputs;
    }
}

module.exports = NeuralNetwork;