const inputEn = 'Who is your developer?';
const inputEs = '¿Quién es tu desarrollador?';

function normalize(text){
    return text
        .normalize('NFD')
        // Unicode range
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

console.log(normalize(inputEn));
console.log(normalize(inputEs));

// console.log(inputEs.length);

// NFD is a normalization type, normalize() method returns the Unicode Normalization Form of the string
// This should make the return value one character more than above, it will turn the single é letter
// into 2 different characters e and '
// console.log(inputEs.normalize("NFD").length);
