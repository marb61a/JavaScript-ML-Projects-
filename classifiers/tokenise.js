const natural = require('natural');
const { TokenizerEn } = require('@nlpjs/lang-en');

const input = "I didn't finish the task. I cannot end today. I'll end tomorrow";

function tokenize(text){
    // Split by word but not a good approach for other languages
    // return text.split(/\W+/g);

    return text.split(/[\s,.!?;:([\]'"¿¡)/]+/);
}

function tokenizeAggresive(text){
    const tokenizer = new natural.AggressiveTokenizer();
    return tokenizer.tokenize(text);
}

function tokenizeTreebank(text){
    const tokenizer = new natural.TreebankWordTokenizer();
    return tokenizer.tokenize(text);
}

// Will normalize the string, differently to above
// i'll ->  will become -> I will, the true value will change
// certain values to uppercase eg i to I
function tokenizeNlpjs(text) {
    const tokenizer = new TokenizerEn();
    return tokenizer.tokenize(text, true);
}

console.log(tokenize(input));

// Special characters will be considered as whitespaces using the word split approach so Quién
// will be returned as 2 words Qui and n, with normalization this will not happen
// console.log(tokenize("Quién"));

console.log(tokenizeAggresive(input));
console.log(tokenizeTreebank(input));
console.log(tokenizeNlpjs(input));
