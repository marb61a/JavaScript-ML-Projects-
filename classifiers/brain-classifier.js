const BrainClassifier = require('./classifiersexamples/brain-classifier');
const corpus = require('./data/corpus-en.json');

const classifier = new BrainClassifier();
classifier.train(corpus);
