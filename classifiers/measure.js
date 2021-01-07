const { dockStart } = require('@nlpjs/basic');
const corpus = require('./data/corpus-en.json');
const BrainClassifier = require('./classifiersexamples/01-brain-classifier');
const TensorflowClassifier = require('./classifiersexamples/02-tensorflow-classifier');
const NlpjsClassifier = require('./classifiersexamples/03-nlpjs-classifier');
const OwnClassifier = require('./classifiersexamples/06-own-classifier');

async function measure(classifier){

}

async function main(){
    const dock = await dockStart({
        use: ['Basic', 'LangEn']
    });
    const nlp = dock.get("nlp");
    nlp.addCorpus(corpus);
    const classifiers = [];

    classifiers.push(new BrainClassifier());
    classifiers.push(new TensorflowClassifier());
    classifiers.push(new NlpjsClassifier());
    classifiers.push(new OwnClassifier());
    classifiers.push(nlp);
    const outputs = [];
    
}

main();