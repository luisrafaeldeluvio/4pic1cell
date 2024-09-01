const rooms = document.querySelector('.rooms')
const nucleusIcon = document.querySelector('.nucleus-icon')
const foodIcon = document.querySelector('.food-icon')

class Player {
  atp = 0;
  level = 1;

  energy = 83;
  health = 34;
  happiness = 15;
}

const player = new Player;  

function saveData() {
  for (var i in player) {
    localStorage.setItem(i, player[i])
  }
}

function loadData() {
  for (var i in player) {
    player[i] = localStorage.getItem(i)
    console.log(`Loaded data for ${i} (${player[i]})`);
  }
}

const stats = ['energy', 'health', 'happiness'];
for (var i = 0; i < stats.length; i++) {
  document.querySelector(`.${stats[i]}`).style.background = `linear-gradient(180deg, blue ${100 - player[stats[i]]}%, red 0)`;
}

document.querySelector(".goto--left-organelle").addEventListener("click", () => {
  changeOrganelle("left")
})
document.querySelector(".goto--right-organelle").addEventListener("click", () => {
  changeOrganelle("right")
})

let currentRoom = 0;
function changeOrganelle(direction) {
  const room = rooms.children;

  if (direction === "left") {
    --currentRoom;
    if (currentRoom < 0) {
      currentRoom = room.length - 1;
    }
  } else if (direction === "right") {
    ++currentRoom;
    if (currentRoom >= room.length) {
      currentRoom = 0;
    }
  }
  
  function displayIcon(_room, display) {
    const roomChildren = _room.children;
    
    for (var i = 0; i < roomChildren.length; i++) {
      if (!roomChildren[i].classList.contains('icon')) return;
      roomChildren[i].style.display = `${display}`
    }
  }
  
  displayIcon(room[currentRoom], "block");
  displayIcon(room[(currentRoom + room.length - 1) % room.length], "none");
  
  document.querySelector('.room-name').innerHTML = `${room[currentRoom].id[0].toUpperCase() + room[currentRoom].id.slice(1)}`
  room[currentRoom].scrollIntoView();
}