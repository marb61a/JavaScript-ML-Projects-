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
    
}

module.exports = NeuralNetwork;