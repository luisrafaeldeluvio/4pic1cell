let word = pickGuess();
let guess = []; // the player's guess

let isPlaying = true;

function pickGuess() {
  const guess = [
  'NUCLEUS',
  'NUCLEAR MEMBRANE',
  'NUCLEAR PORES',
  'NUCLEOLUS',
  'CELL MEMBRANE',
  'GOLGI BODIES',
  'ENDOPLASMIC RETICULUM',
  'RIBOSOME',
  'MITOCHONDRION',
  'LYSOSOME',
  'VACUOLE',
  'CENTRIOLE',
  'MICROTUBULE',
  'SECRETORY VESICLE',
  'CHLOROPHYLL',
  'CELL WALL',
  'DNA',
  'RNA',
  'CHROMOSOME',
  'ATP',
  'SUGAR',
  'PROTEIN',
  'LIPIDS',
  'CYTOPLASM',
  'ENDOPLASM',
  'ECTOPLASM',
  'CILIA',
  'FLAGELLA',
  'MITOSIS',
  'PHOSPHOLIPIDS',
  'CYTOSOL',
  'ORGANELLE',
  'NUCLEAR ENVELOPE',
  'CISTERNA',
  'CRISTAE'
  ];
  const randNum = Math.floor(Math.random() * guess.length);
  
  return guess[randNum];
}

console.log(word);

function setLetters() {
  //seperates each letters of the word and push
  //it in the array
  const neededLetters = [];
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i) !== " ") {
      neededLetters.push(word.charAt(i))
    }
  }
  
  //assigns places for the letters of the word
  const assignedPlace = [];
  while (assignedPlace.length < neededLetters.length) {
    const randNum = Math.floor(Math.random() * 20);
    if (!assignedPlace.includes(randNum)) {
      assignedPlace.push(randNum)
    }
  }
  
  function randomLetters() {
    const alphabet = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const randNum = Math.floor(Math.random() * alphabet.length);
    return alphabet[randNum]
    
  }
  
  for (var i = 0; i < 20; i++) {
    const element = document.getElementById(`letter-${i}`)
    
    const letterIndex = assignedPlace.indexOf(i);
    if (letterIndex !== -1) {
      element.innerText = neededLetters[letterIndex];
    } else {
      element.innerText = randomLetters()
    }
    
  }
}

setLetters()

function getWordAmount() {
  if (word.includes(' ')) {
    return word.length - 1
  } else {
    return word.length
  }
}

function getGuessAmount() {
  let amount = 0;
  for (var i = 0; i < guess.length; i++) {
    if (guess[i] !== '') {
      amount++
    }
  }
  return amount;
}

document.querySelector('.letter-container').addEventListener('click', (event) => {
  clickedLetter = event.target;
  
  if (clickedLetter.tagName.toLowerCase() === 'span' &&
      clickedLetter.id.startsWith('letter-') &&
      !clickedLetter.classList.contains('picked-letter') &&
      getGuessAmount() !== getWordAmount()) {
    clickedLetter.classList.add('picked-letter')
    
    for (var i = 0; i < guess.length; i++) {
      if (guess[i] === '') {
        guess[i] = clickedLetter.innerText;
        document.getElementById(`guess-${i}`).innerHTML = guess[i];
        break;
      }
    }
  }
});

document.querySelector('.guess-container').addEventListener('click', (event) => {
  const clickedLetter = event.target;
  
  if (clickedLetter.innerHTML !== '') {
    const id = clickedLetter.id
    const idNum = id.slice(6,7);
    guess[idNum] = '';
    document.getElementById(`guess-${idNum}`).innerHTML = '';
  }
})

function setGuessContainer() {
  for (var i = 0; i < getWordAmount(); i++) {
    const parent = document.querySelector('.guess-container')
    const elem = document.createElement('span');
    elem.id = `guess-${i}`;
    elem.classList.add('guess');
    elem.innerHTML = '';
    parent.appendChild(elem);
    
    guess.push('')
    
  }
}

setGuessContainer()

//function for guess-container
//create a span for each letter of word
//so the above can work on it

//game loop
  
  setInterval(() => {
    const answer = guess.toString();
    const realanswer = answer.replaceAll(",", "")
    console.log(realanswer)
    //document.querySelector('.guess-container').innerHTML = realanswer;
    
    //will not work if word has spaces. fix!!!
    if (realanswer === word) {
      alert('YOU FUCKIN\' WON BRO');
    }
    
  }, 2500)

function newRound() {
  pickGuess();
  setLetters();
}

