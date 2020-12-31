// const { train } = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs-node');
const fs = require("fs");

function sexToNumber(sex){
    switch(sex){
        case "F":
            return 0;
        case "M":
            return 1;
        default:
            return 0.5
    }
}

function getCsvSize(fileName){
    // This will split by end of line on multiple platforms as 
    // the characters differ so regex is best
    const lines = fs.readFileSync(fileName, "utf-8").split(/\r?\n/);
    console.log(lines);

    // Number of lines
    return {
        rows: lines.length -1,
        columns: lines[0].split(",").length
    };
}

function prepareData(filename){
    const options = {
        hasHeader: true,
        columnConfigs: { rings: { isLabel: true }}
    };

    return tf.data.csv(`file://${filename}`, options).map(row => ({
        xs: Object.values(row.xs).map((x, i) => i === 0 ? sexToNumber(x) : x),
        ys: [row.ys.rings]
    }));

}

// Create topology of neural network
// By default activation is sigmoid
function createModel(inputShape, activation = 'sigmoid', lr = 0.01){
    const model = tf.sequential();

    // Dense means dense connected
    model.add(tf.layers.dense({
        inputShape,
        activation,
        units: inputShape[0] * 2
    }));

    // A layer for output
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({
        optimizer: tf.train.sgd(lr),
        loss: 'meanSquaredError'
    });

    return model;
}

// Epochs are iterations
async function train({ model, data, numRows, batchSize = 100, epochs = 200, trainRatio = .75 }){
    const trainLength = Math.floor(numRows * trainRatio);
    const trainBatches = Math.floor(trainLength / batchSize);
    const shuffled = data.shuffle(100).batch(batchSize);
    const trainData = shuffled.take(trainBatches);
    const testData = shuffled.skip(trainBatches);
    await model.fitDataset(trainData, { 
        epochs, 
        validationData: testData 
    });
}

const tests = [
    [0,0.505,0.4,0.125,0.583,0.246,0.13,0.175],
    [1,0.45,0.345,0.105,0.4115,0.18,0.1125,0.135],
    [1,0.505,0.405,0.11,0.625,0.305,0.16,0.175],
    [0,0.53,0.41,0.13,0.6965,0.302,0.1935,0.2],
];

async function main(csvName){
    const data = prepareData(csvName);
    const size = getCsvSize(csvName);
    const model = createModel([size.columns - 1]);

    await train({ model, data, numRows: size.rows});
    for (let i = 0; i < tests.length; i += 1) {
        const test = tests[i];
        const output = model.predict(tf.tensor2d([test]));
        console.log(output.dataSync());
    }
}

const csvName = './data/abalone.csv';
main(csvName);

// const csvSize = getCsvSize(csvName);
// const data = prepareData(csvName);
// console.log(csvSize);
