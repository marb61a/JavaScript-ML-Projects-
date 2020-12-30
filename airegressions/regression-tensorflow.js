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
}

const csvName = './data/abalone.csv';
getCsvSize(csvName);
