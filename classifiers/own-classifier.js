const OwnClassifier = require('./classifiersexamples/06-own-classifier');
const corpus = require('./data/corpus-en.json');

const classifier = new OwnClassifier();
classifier.train(corpus);

let total = 0;
let good = 0;