class Player {
  atp = 0;
  level = 1;
  
  energy = 100;
  health = 100;
  happiness = 1;
  level = 1;
  
  organelle = 0;
  
  get getOrganelle() {
    return this.organelle;
  }
  
  set setOrganelle(i) {
    this.organelle = i;
  }
}

const player = new Player;

const organelles = document.querySelector('.organelles')
const nucleusIcon = document.querySelector('.nucleus-icon')
const mitochondrionIcon = document.querySelector('.mitochondrion-icon')
const foodIcon = document.querySelector('.food-icon')

document.querySelector(".energy").innerHTML = player.energy;
document.querySelector(".health").innerHTML = player.health;
document.querySelector(".happiness").innerHTML = player.happiness;

document.querySelector(".goto--left-organelle").addEventListener("click", () => {
  changeOrganelle("left")
})

document.querySelector(".goto--right-organelle").addEventListener("click", () => {
  changeOrganelle("right")
})

function changeOrganelle(direction) {
  if (direction === "left") {
    player.setOrganelle = (player.getOrganelle === 0) ?
      organelles.children.length - 1 :
      player.getOrganelle - 1;
  } else if (direction === "right") {
    player.setOrganelle = (player.getOrganelle === organelles.children.length - 1) ?
      0 :
      player.getOrganelle + 1;
  }
  
  switch(player.getOrganelle) {
    case 0:
      mitochondrionIcon.style.display = 'inline';
      foodIcon.style.display = 'inline';
      nucleusIcon.style.display = 'none';
      break;
    default:
      mitochondrionIcon.style.display = 'none';
      foodIcon.style.display = 'none';
      nucleusIcon.style.display = 'inline';
  }
  
  document.querySelector(".organelle-name").innerHTML = organelles.children[player.getOrganelle].id
  organelles.children[player.getOrganelle].scrollIntoView();
}

foodIcon.addEventListener('touchmove', (e) => {
    let touchLocation = e.targetTouches[0];
    foodIcon.style.left = touchLocation.pageX + 'px';
    foodIcon.style.top = touchLocation.pageY + 'px';
  })
  
foodIcon.addEventListener('touchend', () => {
  foodIcon.style.left = '';
  foodIcon.style.top = '';
})