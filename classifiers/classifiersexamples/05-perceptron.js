class Perceptron {
    constructor(settings){
        this.bias = 0;
        
    }

    activation(){

    }

    // Again will make use of intents like in brain-js classifier
    // i.e. Empty  -> [0, 0, 0, 0, 0, 0, 0]
    // In order to improve performance this will be in the form of an object
    // such as {data: {"2": 1, "3": 1}, keys: ["2", "3"]} which refers to positions
    // this.weighs can be used when the value is always the same eg 1
    // This will not always be true in real world perceptrons
    run(input){
        const sum = input.keys.reduce((prev, key) => prev + this.weights[key], this.bias);
        return this.activation(sum);
    }

    
}

module.exports = Perceptron;