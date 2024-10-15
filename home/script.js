const modalHelp = document.querySelector('.modal__help');
const btnHelp = document.querySelector('.btn__help');
const title = document.querySelector('.title');

let titleClickCounter = 0;

function vibrate(ms) {
  if ('vibrate' in navigator) navigator.vibrate(ms)
}

if (!localStorage.getItem('score')) localStorage.setItem('score', 0)

document.querySelector('.highscore').innerHTML = `Highscore: ${localStorage.getItem('score')}`

btnHelp.addEventListener('click', () => {
  if (modalHelp.style.display === 'block') return modalHelp.style.display = 'none';
  modalHelp.style.display = 'block';
})

title.addEventListener('pointerdown', () => {
  titleClickCounter++;
  
  if (titleClickCounter > 3 && titleClickCounter <= 10) {
    vibrate(50+(titleClickCounter*2))
  }
  
  if (titleClickCounter === 10) {
    localStorage.setItem('easterEggUnlocked', true)
    alert('You discovered an easter egg!\n\nMore levels are unlocked')
  }
})

window.onclick = function(event) {
  if (modalHelp.style.display === 'block' && event.target !== btnHelp) {
    if (event.target === modalHelp) return;
    modalHelp.style.display = 'none';
  }
}