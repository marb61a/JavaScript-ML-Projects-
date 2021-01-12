const { dockStart } = require('@nlpjs/basic');
const { StemmerEn } = require('@nlpjs/lang-en');
const corpus = require('./data/corpus-en.json');

const BrainClassifier = require('../classifiersexamples/01-brain-classifier');
const TensorflowClassifier = require('../classifiersexamples/02-tensorflow-classifier');
const NlpjsClassifier = require('../classifiersexamples/03-nlpjs-classifier');
const OwnClassifier = require('../classifiersexamples/06-own-classifier');

async function main(){
    const dock = await dockStart({
        use: ['Basic', 'LangEn']
    });
    const nlp = dock.get("nlp");
    nlp.addCorpus(corpus);
    const classifiers = [];
    const stemmer = new StemmerEn();

    classifiers.push(new BrainClassifier(undefined, stemmer));
    classifiers.push(new TensorflowClassifier(undefined, stemmer));
    classifiers.push(new NlpjsClassifier(undefined, stemmer));
    classifiers.push(new OwnClassifier(undefined, stemmer));
    classifiers.push(nlp);
    const outputs = [];
    
}

main();