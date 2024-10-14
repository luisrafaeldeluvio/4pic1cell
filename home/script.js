if (!localStorage.getItem('score')) localStorage.setItem('score', 0)

document.querySelector('.highscore').innerHTML = `Highscore: ${localStorage.getItem('score')}`