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

    tf.data.csv(`file://${filename}`, options).map(row => ({
        xs: Object.values(row.xs).map((x, i) => i === 0 ? sexToNumber(x) : x),
        ys: [row.ys.rings]
    }));

}

// Create topology of neural network
function createModel(){
    
}

const csvName = './data/abalone.csv';
const csvSize = getCsvSize(csvName);
const data = prepareData(csvName);
console.log(csvSize);
