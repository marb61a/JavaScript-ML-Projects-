const { dockStart } = require('@nlpjs/basic');
const corpus = require('./data/corpus-en.json');
const BrainClassifier = require('./classifiersexamples/01-brain-classifier');
const TensorflowClassifier = require('./classifiersexamples/02-tensorflow-classifier');
const NlpjsClassifier = require('./classifiersexamples/03-nlpjs-classifier');
const OwnClassifier = require('./classifiersexamples/06-own-classifier');

async function measure(classifier){
    let total = 0;
    let good = 0;

    for(let i = 0; i < corpus.data.length; i += 1){
        const item = corpus.data[i];
        for(let j = 0; j < item.tests.length; i += 1){
            const test = item.tests[j];
            const output = await classifier.process(test);
            total += 1;
            const intent = Array.isArray(output) ? output[0].intent : output.intent;

            if(intent === item.intent){
                good += 1;
            }
        }
    }

    return { total, good, name: classifier.constructor.name };
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

    for(let i = 0; i < classifiers.length; i += 1){
        const classifier = classifiers[i];
        await classifier.train(corpus);
        const output = await measure(classifier);
        outputs.push(output);
    }

    for(let i = 0; i < outputs.length; i += 1){
        const { name, good, total } = outputs[i];
        console.log(`${name} - ${good}  good from a total of ${total} which is ${good * 100 / total}%`);
    }
}

main();