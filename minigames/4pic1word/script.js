let word;
let guess = []; // the player's guess
let letters = []; // the og, should not be changed


let isPlaying = true;

const letterContainer = document.querySelector('.letter-container');
const guessContainer = document.querySelector('.guess-container');
const hintBtn = document.getElementById('hint-btn');
const shuffleBtn = document.getElementById('shuffle-btn');

function getWordAmount() {
  if (word.includes(' ')) {
    return word.length - 1
  } else {
    return word.length
  }
}

function getGuessAmount() {
  let amount = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] !== '') {
      amount++
    }
  }
  return amount;
}

function pickGuess() {
  const guess = [
  'NUCLEUS',
  'NUCLEAR MEMBRANE',
  'NUCLEAR PORES',
  'NUCLEOLUS',
  'CELL MEMBRANE',
  'GOLGI BODIES',
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

function setGuessContainer() {
  const parent = document.querySelector('.guess-container')
  //check if there is already span in container, if
  //true remove it first then continue
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
  
  for (var i = 0; i < getWordAmount(); i++) {
    const elem = document.createElement('span');
    elem.id = `guess-${i}`;
    elem.classList.add('guess');
    elem.innerHTML = '';
    parent.appendChild(elem);
    
    guess.push('')
    
  }
}

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
    const letterIndex = assignedPlace.indexOf(i);
    if (letterIndex !== -1) {
      letters.push(neededLetters[letterIndex]);
    } else {
      letters.push(randomLetters());
    }
  }
  
  for (var i = 0; i < letters.length; i++) {
    const element = document.getElementById(`letter-${i}`)
    
    element.innerText = letters[i]
    
  }
}

function setImages() {
  for (var i = 1; i < 5; i++) {
    document.getElementById(`pic-${i}`).src = `pics/${word}-${i}.png`;
  }
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    updateLetterContainer()
}

function updateLetterContainer() {
  for (var i = 0; i < letters.length; i++) {
    const element = document.getElementById(`letter-${i}`)
    
    element.innerText = letters[i]
    
  }
}

function testGuess() {
  const soundWrong = new Audio('wrong.wav');
  
  if (getGuessAmount() !== getWordAmount()) return;
  
  const answer = guess.toString().replaceAll(',', '');
  const _word = (word.includes(' ')) ? word.replace(' ', '') : word;
  
  if (answer === _word) {
    console.log('you won')
    newRound();
    
  } else {
    console.log('wrong answer')
    soundWrong.play();
  }
  
}

function newRound() {
  word = pickGuess();
  guess = [];
  letters = [];
  
  setGuessContainer();
  setLetters();
  setImages();
  console.log(word);
}

letterContainer.addEventListener('click', (event) => {
  clickedLetter = event.target;
  const sound = new Audio('click.wav')
  
  if (!clickedLetter.matches('span')) return;
  if (getGuessAmount() === getWordAmount()) return;
  if (clickedLetter.innerHTML === '') return;
  
  sound.play();
  
  //remove the clicked letter from letter container
  for (var i = 0; i < letters.length; i++) {
    if (i === parseInt(clickedLetter.id.replace(/\D/g,''))) {
      letters[i] = '';
      break;
    }
  }
    
  //put the clicked letter in the guess container
  for (var i = 0; i < guess.length; i++) {
    if (guess[i] === '') {
      const guessElem = document.getElementById(`guess-${i}`);
      guess[i] = clickedLetter.innerText;
      guessElem.innerHTML = guess[i];
      break;
    }
  }
  
  updateLetterContainer()
  
  testGuess();
});

guessContainer.addEventListener('click', (event) => {
  const clickedLetter = event.target;
  const sound = new Audio('undo.wav');
  
  if (!clickedLetter.matches('span')) return;
  if (clickedLetter.innerHTML === '') return;
  
  sound.play();
  
  //replaces clicked letter to an empty string in the
  // guess array
  const guessIndex = parseInt(clickedLetter.id.replace(/^\D+/g, ''))
  if (guessIndex !== -1) {
    guess[guessIndex] = '';
  }
  
  // Find the first empty index in letters
  const emptyIndex = letters.findIndex(letter => letter === '');
  if (emptyIndex !== -1) {
    letters[emptyIndex] = clickedLetter.innerHTML;
  }
  
  updateLetterContainer()
  
  clickedLetter.innerHTML = ''
})

let shuffleCooldown = false;
shuffleBtn.addEventListener('click', () => {
  if (shuffleCooldown) return;
  
  const sound = new Audio('shuffle.wav');
  sound.play();
  shuffle(letters);
  shuffleCooldown = true;
  setTimeout(() => { shuffleCooldown = false }, 600);
  
})

hintBtn.addEventListener('click', () => {
  alert(`The answer is ${word}, stupid. 🤓☝️`)
})

document.addEventListener('DOMContentLoaded', function() {
    newRound()
});