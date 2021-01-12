require('dotenv').config();
const { StemmerEn } = require('@nlpjs/lang-en');
const fs = require('fs');
const { NluLuis } = require('@nlpjs/nlu-luis');
const corpus = require('./data/corpus-en.json');

async function main(){
    let total = 0;
    let good = 0;

    for(let i = 0; i < corpus.data.length; i += 1){
        const item = corpus.data[i];

        for(let j = 0; j < item.tests.length; j += 1){
            const test = item.tests[j];
            const output = await luis.processUtterance(test);
            total += 1;

            if(output.prediction.topIntent){
                good += 1;
            }

            console.log(`${good} good from a total of ${total} which is ${good * 100 / total}%`);
        }
    }

    console.log(`${good} good from a total of ${total} which is ${good * 100 / total}%`);
}

main();