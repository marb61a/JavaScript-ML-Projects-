const { StemmerEn } = require('@nlpjs/lang-en');
const BrainClassifier = require('../classifiersexamples/01-brain-classifier');
const corpus = require('../data/corpus-en.json');

const stemmer = new StemmerEn();
const classifier = new BrainClassifier(undefined, stemmer);
classifier.train(corpus);

let total = 0;
let good = 0;

corpus.data.forEach(item => {
    item.tests.forEach(test => {
        const classifications = classifier.process(test);
        total += 1;
        if (classifications[0].intent === item.intent) {
            good += 1;
        }
    });
});

console.log(`${good}  good from a total of ${total} which is ${good * 100 / total}%`);