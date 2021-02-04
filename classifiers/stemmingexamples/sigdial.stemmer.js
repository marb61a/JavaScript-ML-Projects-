const { dockStart } = require('@nlpjs/basic');
const { StemmerEn } = require('@nlpjs/lang-en');
const corpusAskubuntu = require('../data/corpus-askubuntu.json');
const corpusWebapp = require('../data/corpus-webapp.json');
const corpusChatbot = require('../data/corpus-chatbot.json');

const BrainClassifier = require('../classifiersexamples/01brain-classifier');
const NlpjsClassifier = require('../classifiersexamples/03-nlpjs-classifier');
const TensorflowClassifier = require('../classifiersexamples/02-tensorflow-classifier');
const OwnClassifier = require('../classifiersexamples/06-own-classifier');

async function measureCorpus(classifier, corpus){
    let total = 0;
    let good = 0;

    for (let i = 0; i < corpus.data.length; i += 1) {
        const item = corpus.data[i];
        for (let j = 0; j < item.tests.length; j += 1) {
            const test = item.tests[j];
            const output = await classifier.process(test);
            total += 1;
            const intent = Array.isArray(output) ? output[0].intent : output.intent;

            if (intent === item.intent) {
                good += 1;
            }
        }
    }

    return { total, good, name: classifier.constructor.name};
}

async function trainClassifier(classifier, corpus){
    if(classifier.addCorpus){
        classifier.removeLanguage('en');
        classifier.addCorpus(corpus);
    }

    await classifier.train(corpus);
}

async function measure(classifier){

}

async function main(){
    const dock = await dockStart({ use: ['Basic', 'LangEn'] });
    const nlp = dock.get('nlp');
    const classifiers = [];
    const stemmer = new StemmerEn();

    classifiers.push(new BrainClassifier(undefined, stemmer));
    classifiers.push(new TensorflowClassifier(undefined, stemmer));
    classifiers.push(new NlpjsClassifier(undefined, stemmer));
    classifiers.push(new OwnClassifier(undefined, stemmer));
    classifiers.push(nlp);

}

main();
