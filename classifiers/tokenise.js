const natural = require('natural');

const input = "I didn't finish the task. I cannot end today. I'll end tomorrow";

function tokenize(text){
    // Split by word but not a good approach for other languages
    // return text.split(/\W+/g);

    return text.split(/[\s,.!?;:([\]'"¿¡)/]+/);
}

function tokenizeAggresive(text){

}

function tokenizeTreebank(text){
    
}

console.log(tokenize(input));

// Special characters will be considered as whitespaces using the word split approach so Quién
// will be returned as 2 words Qui and n, with normalization this will not happen
console.log(tokenize("Quién"));
