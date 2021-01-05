const fs = require('fs');
const { NluLuis } = require('@nlpjs/nlu-luis');
const corpus = require("./data/corpus-en.json");

const luis = new NluLuis();

// Returns corpus and writes to file
function exportCorpus(){
    const json = luis.fromCorpus(corpus);
    fs.writeFileSync("./data/corpus-en-luis.json", JSON.stringify(json, null, 2), "utf-8");

}

exportCorpus();