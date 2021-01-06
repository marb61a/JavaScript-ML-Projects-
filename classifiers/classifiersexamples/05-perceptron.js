class Perceptron {
    constructor(settings){
        this.id = settings.id;
        this.label = settings.label;
        this.numInputs = settings.numInputs;
        this.weights = new Float32Array(this.numInputs);
        this.changes = new Float32Array(this.numInputs);
        this.momentum = settings.momentum;
        this.bias = 0;
        this.alpha = settings.alpha;
        this.learningRate = settings.learningRate;
    }

    activation(value){
        return value <= 0 ? 0 : this.alpha * value;
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

    calculateDelta(output, error){
        return output > 0 ? error : this.alpha * error;
    }

    train(data){
        let error = 0;

        for(let i = 0; i < data.length; i += 1){
            const { input, output } = data[i];
            const predictedOutput = this.run(input);
            const expectedOutput = output[this.id] || 0;
            const currentError = expectedOutput - predictedOutput;

            if(currentError !== 0){
                error += currentError ** 2;
                const delta = this.calculateDelta(predictedOutput, currentError) * this.learningRate;

                for(let j = 0; j < input.keys.length; j += 1){
                    const key = input.keys[j];
                    const change = delta * input.data[key] + this.momentum * this.changes[key];
                    this.changes[key] = change;
                    this.weights[key] += change;
                }

                this.bias += delta;
            }
        }

        return error;
    }
}

module.exports = Perceptron;