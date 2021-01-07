const { dockStart } = require('@nlpjs/basic');
const corpusAskubuntu = require('./data/corpus-askubuntu.json');
const corpusWebapp = require('./data/corpus-webapp.json');
const corpusChatbot = require('./data/corpus-chatbot.json');

const BrainClassifier = require('./classifiersexamples/01-brain-classifier');
const TensorflowClassifier = require('./classifiersexamples/02-tensorflow-classifier');
const NlpjsClassifier = require('./classifiersexamples/03-nlpjs-classifier');
const OwnClassifier = require('./classifiersexamples/06-own-classifier');

async function measureCorpus(classifier, corpus){

}

async function main(){
    const dock = await dockStart({
        use: ['Basic', 'LangEn']
    });
    const nlp = dock.get("nlp");
    nlp.addCorpus(corpus);
    const classifiers = [];
    
}

main();
