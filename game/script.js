let word;
let guess = []; // the player's guess
let letters = []; // the og, should not be changed
let score = 0;
let hintcount = 0;
let time = 90;

let isGameOver = false;

let terms = [];
let hint = [];

const letterContainer = document.querySelector('.letter-container');
const guessContainer = document.querySelector('.guess-container');
const scoreContainer = document.querySelector('.score');
const picContainer = document.querySelector('.image');
const pauseBtn = document.getElementById('pause-btn');
const pauseContainer = document.querySelector('.modal__pause');
const hintBtn = document.getElementById('hint-btn');
const hintContainer = document.querySelector('.modal__hint');
const shuffleBtn = document.getElementById('shuffle-btn');
const clueBtn = document.getElementById('clue-btn')
const shareBtn = document.getElementById('share-btn');
const timerContainer = document.querySelector('.timer'); 

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


function modScore(state, mod) {
  
  switch (state) {
    case 'add':
      score += mod;
      break;
    case 'sub':
      score -= mod;
      break;
  }
  
  if (score < 0) score = 0;
  
}

function pickGuess() {
  
  const randNum = Math.floor(Math.random() * terms.length);
  
  return terms[randNum];
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
  
  function downscale(length, expectedMaxLength, baseFontSize, minFontSize) {
    const scalingFactor = 1 - Math.min(1 / expectedMaxLength * length, 1);
    return Math.ceil(Math.max(scalingFactor * (baseFontSize - minFontSize) + minFontSize, minFontSize));
  }
  
  guessContainer.style.fontSize = `${downscale(getWordAmount(), 13, 20, 16)}px`
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
  //for (var i = 1; i < 5; i++) {
    //document.getElementById(`pic-${i}`).src = `https://res.cloudinary.com/dxiisdca0/image/upload/v1725371308/4pic1word/${word}-${i}.png`;
  //}
  
  const word_ = word.replace(' ', '_')
  
  document.querySelector(`.image--1`).src = `https://res.cloudinary.com/dxiisdca0/image/upload/v1725371308/4pic1word/${word_}-1.webp`
  document.querySelector(`.image--3`).src = `https://res.cloudinary.com/dxiisdca0/image/upload/v1725371308/4pic1word/${word_}-3.webp`
  document.querySelector(`.image--4`).src = `https://res.cloudinary.com/dxiisdca0/image/upload/v1725371308/4pic1word/${word_}-4.webp`
  
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
  const soundWrong = new Audio('assets/wrong.wav');
  const soundRight = new Audio('assets/right.wav');
  
  if (getGuessAmount() !== getWordAmount()) return;
  
  const answer = guess.toString().replaceAll(',', '');
  const _word = (word.includes(' ')) ? word.replace(' ', '') : word;
  
  if (answer === _word) {
    soundRight.play();
    modScore('add', getWordAmount() - hintcount);
    increaseTimer(10)
    newRound();
    vibrate(40)
  } else {
    soundWrong.play();
  }
  
}

function newRound() {
  word = pickGuess();
  guess = [];
  letters = [];
  
  hintcount = 0;
  
  setGuessContainer();
  setLetters();
  setImages();
  setPicDesc();
  console.log(word);
  
  scoreContainer.innerHTML = score;
}

let picDesc = [];

function setPicDesc() {
  picContainer.querySelector('.image__clue--2').innerHTML = getWordAmount();
  picContainer.querySelector('.image__clue--3').innerHTML = picDesc[word].appearance.toUpperCase();
  picContainer.querySelector('.image__clue--4').innerHTML = picDesc[word].function.toUpperCase();
}

let Timer;
let isTimerPaused = false;
function startTimer(seconds) {
  if (isTimerPaused) return;
  timerContainer.innerHTML = seconds;
  seconds -= 1;
  Timer = setTimeout(() => {
    startTimer(seconds)
    if (seconds === 0) {
      clearTimeout(Timer)
      isGameOver = true;
      document.querySelector('.gameover-container').style.display = "block";
      
      if (score > parseInt(localStorage.getItem("score"))) localStorage.setItem("score", score);
      
      
    }
  }, 1000)
}

function pauseTimer() {
  clearTimeout(Timer)
  isTimerPaused = true;
  console.log('paused', isTimerPaused);
}

function resumeTimer() {
  const t = parseInt(timerContainer.innerHTML)
  isTimerPaused = false;
  startTimer(t)
  console.log('resume', isTimerPaused);
}

function increaseTimer(seconds) {
  clearTimeout(Timer)
  const t = parseInt(timerContainer.innerHTML) + seconds
  startTimer(t <= 90 ? t : 90)
}

startTimer(time)

function vibrate(ms) {
  if ('vibrate' in navigator) navigator.vibrate(ms)
}

picContainer.addEventListener('click', (event) => {
  if (isGameOver) return;
  
  target = event.target;
  
  if (target.classList[0] === 'image') return;
  if (target.classList[0] === 'image--1') return;
  if (target.classList[1] === 'image__clue--2') return;
  
  const num = target.classList.length === 1
    ? target.classList[0].match(/\d+/)[0] 
    : target.classList[1].match(/\d+/)[0];
  
  if (target.classList[0].startsWith('image--')) {
    target.style.display = "none";
    picContainer.querySelector(`.image__clue--${num}`).style.display = "block";
  }
  
  if (target.classList[0] === 'image__clue') {
    target.style.display = "none";
    picContainer.querySelector(`.image--${num}`).style.display = "block";
  }
  
  vibrate(28)
})

letterContainer.addEventListener('click', (event) => {
  if (isGameOver) return;
  clickedLetter = event.target;
  const sound = new Audio('assets/click.wav')
  
  if (!clickedLetter.matches('span')) return;
  if (getGuessAmount() === getWordAmount()) return;
  if (clickedLetter.innerHTML === '') return;
  
  sound.play();
  vibrate(28)
  
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
  
  if (getGuessAmount() === getWordAmount()) {
  setTimeout(() => {
    testGuess();
  }, 100) }
  
});

guessContainer.addEventListener('click', (event) => {
  if (isGameOver) return;
  const clickedLetter = event.target;
  const sound = new Audio('assets/undo.wav');
  
  if (!clickedLetter.matches('span')) return;
  if (clickedLetter.innerHTML === '') return;
  
  sound.play();
  vibrate(28)
  
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
  if (isGameOver) return;
  if (shuffleCooldown) return;
  
  const sound = new Audio('assets/shuffle.wav');
  sound.play();
  shuffle(letters);
  shuffleCooldown = true;
  letterContainer.classList.add('animation--shake')
  setTimeout(() => {
    shuffleCooldown = false
    letterContainer.classList.remove('animation--shake')
  }, 600);
  
  vibrate(28)
  
})

hintBtn.addEventListener('click', () => {
  if (isGameOver) return;
  const sound = new Audio('assets/click.wav')
  
  const _word = word.replaceAll(' ', '')
  
  emptyGuess = () => {
    let index = [];
    for (var i = 0; i < guess.length; i++) {
      if (guess[i] === '') index.push(i)
    }
    return index;
  }
  
  randomEmptyGuess = emptyGuess()[Math.floor(Math.random() * emptyGuess().length)];
  
  const guessElem = document.getElementById(`guess-${randomEmptyGuess}`);
  guess[randomEmptyGuess] = _word[randomEmptyGuess];
  guessElem.innerHTML = guess[randomEmptyGuess];
  
  for (var i = 0; i < letters.length; i++) {
    if (letters[i] === _word[randomEmptyGuess]) {
      letters[i] = '';
      break;
    }
  }
  
  hintcount++;
  sound.play();
  vibrate(28)
    
  updateLetterContainer()
  if (getGuessAmount() === getWordAmount()) {
    setTimeout(() => {
    testGuess();
  }, 100) }
})

clueBtn.addEventListener('click', () => {
  if (isGameOver) return;
  if (hintContainer.style.display === "block") return;
  if (pauseContainer.style.display === "block") return;
  
  fetch('hint.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    hintContainer.style.display = "block";
    hintContainer.innerHTML = data[word].toUpperCase();
    hintcount += Math.round(getWordAmount() * 0.25);
  })
  
  // hintContainer.style.display = "block";
  // hintContainer.innerHTML = hint[word].toUpperCase();
  // hintcount += Math.round(getWordAmount() * 0.25);
  
  vibrate(28)
})

async function showPauseContainer() {
  if (isGameOver) return;
  if (pauseContainer.style.display === "block") return;
  if (hintContainer.style.display === "block") return;

  await new Promise(resolve => setTimeout(resolve, 0));

  pauseContainer.style.display = "block";
  
  vibrate(28)
  
}
pauseBtn.addEventListener('click', showPauseContainer);

pauseBtn.addEventListener('click', () => {
  pauseTimer();
});

shareBtn.addEventListener('click', async () => {
  if (isGameOver) return;
  //navigator.clipboard.writeText(50)
  const shareData = {
    title: "Help me solve this puzzle in 4pic1cell!",
    text: `Help me solve this puzzle in 4pic1cell`,
    url: 'https://luisrafaeldeluvio.github.io/4pic1cell/home/'
  };
  
  vibrate(28)
  
  try {
    await navigator.share(shareData);
  } catch (err) {
    console.log(err);
  }
})

const resumeBtn = document.getElementById('resume');

resumeBtn.addEventListener('click', () => {
  pauseContainer.style.display = "none";
  resumeTimer()
  vibrate(28)
})

const exitBtn = document.getElementById('exit')
exitBtn.addEventListener('click', () => {
  window.location.href = '../home/index.html'
  vibrate(28)
})

window.onclick = function(event) {
  if (isGameOver) window.location.href = '../home/index.html'
  
  
  if (hintContainer.style.display === "block") {
    if (event.target === hintContainer) return;
    hintContainer.style.display = "none";
  }
  
  if (pauseContainer.style.display === "block") {
    if (event.target === pauseContainer || event.target.classList.contains('modal__pause--btn')) return;
    pauseContainer.style.display = "none";
    if (isTimerPaused) resumeTimer()
  }
  
  
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('terms.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      terms = data;
      if (!localStorage.getItem('score')) localStorage.setItem('score', 0)
      newRound()
    })
    
    
  fetch('terms-secret.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (localStorage.getItem('easterEggUnlocked')) terms.push(...data);
    })
  
  fetch('pic-description.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        picDesc = data;
      })
});