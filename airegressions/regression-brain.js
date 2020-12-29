const brain = require("brain.js");
const NeuralNetwork = brain.NeuralNetwork;

const abalone = require("./data/abalone.json");

// There are 3 genders in the file M, F and I for unknown
// These will have to be changed to a numeric value
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

// Preparing input and output data
function prepareData(data, ratio = 29){
    return data.map(row => {
        // Slices the last column from the json object and adds to an array
        const values = Object.values(row).slice(0, -1);
        values[0] = sexToNumber(values[0]);

        return {
            input: values,
            output: [row.rings / ratio]
        }
    });
}

// const prepared = prepareData(abalone);
// console.log(prepared);

// Normailising the data to get the max ring value
// This will generate an array that only holds the values of the rings
// const rings = abalone.map(x => x.rings);
// Will need to use the spread parameter with Math.max to avoid a NaN error
// This is because Math.max expects numeric values
// console.log(Math.max(...rings));

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
const split = (arr, trainRatio = 0.75) => {
    const l = Math.floor(arr.length * trainRatio);
    return {
        train: arr.slice(0, l),
        test: arr.slice(l)
    };
};

const prepared = split(shuffle(prepareData(abalone)));
// console.log(prepared.train.length);
// console.log(prepared.test.length);
const net = new NeuralNetwork();
net.train(prepared.train, {
    iterations: 500,
    logPeriod: 10,
    log: (str) => console.log(str)
});

let totalError = 0;

prepared.test.forEach(item => {
    const output = net.run(item.input);
    console.log(`Expected: ${item.output * 29} Predicted: ${output * 29}`);
    totalError += (output - item.output) ** 2;
});

console.log(totalError / prepared.test.length);
