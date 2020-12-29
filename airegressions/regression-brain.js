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
function prepareData(data){
    // Returns the first and last columns
    return data.map(row => {
        const values = Object.values(row).slice(0, -1);
    });
}
