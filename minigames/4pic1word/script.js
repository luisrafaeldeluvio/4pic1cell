let word = pickGuess();
let guess = []; // the player's guess
const letters = []; // the og, should not be changed
let lettersTemp = letters;

let isPlaying = true;

const letterContainer = document.querySelector('.letter-container');
const guessContainer = document.querySelector('.guess-container');

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
  
  for (var i = 0; i < lettersTemp.length; i++) {
    const element = document.getElementById(`letter-${i}`)
    
    element.innerText = lettersTemp[i]
    
  }
}

setLetters()

//function for setting images based on word

letterContainer.addEventListener('click', (event) => {
  clickedLetter = event.target;
  
  if (!clickedLetter.matches('span')) return;
  
  if (clickedLetter.tagName.toLowerCase() === 'span' &&
      clickedLetter.id.startsWith('letter-') &&
      !clickedLetter.classList.contains('picked-letter') &&
      getGuessAmount() !== getWordAmount()) {
    clickedLetter.classList.add('picked-letter')
    
    for (var i = 0; i < lettersTemp.length; i++) {
      if (i === parseInt(clickedLetter.id.replace(/\D/g,''))) {
        lettersTemp[i] = '';
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
  }
});
console.log(letters);
guessContainer.addEventListener('click', (event) => {
  const clickedLetter = event.target;
  //also works if you press the parent XD fix it
  if (!clickedLetter.matches('span')) return;
  
  
  const elemId = parseInt(clickedLetter.id.replace(/^\D+/g, ''))
  
  guess.splice(elemId, 1)
  
  if (clickedLetter.innerHTML === '') return;
  
  for (var i = 0; i < letters.length; i++) {
    if (lettersTemp[i] === '') {
      lettersTemp[i] = clickedLetter.innerHTML
      break;
    }
  }
  
  clickedLetter.innerHTML = ''
  
})

setGuessContainer()


//game loop

setInterval(() => {
for (var i = 0; i < lettersTemp.length; i++) {
    const element = document.getElementById(`letter-${i}`)
    
    element.innerText = lettersTemp[i]
    
  }
}, 100)
  
  setInterval(() => {
    
    console.log(letters);
    
    const answer = guess.toString();
    const realanswer = answer.replaceAll(",", "")
    console.log(realanswer)
    //document.querySelector('.guess-container').innerHTML = realanswer;
    
    //will not work if word has spaces. fix!!!
    
    
    function getWord() {
      if (word.includes(' ')) {
        return word.replace(' ', '')
      } else {
        return word
      }
    }
 
    
    if (realanswer === getWord()) {
      alert('YOU FUCKIN\' WON BRO');
    }
    
  }, 2500)

function newRound() {
  pickGuess();
  setLetters();
}

