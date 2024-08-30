class Player {
  atp = 0;
  level = 1;

  energy = 100;
  health = 100;
  happiness = 1;
  level = 1;
}

const player = new Player;

const rooms = document.querySelector('.rooms')
const nucleusIcon = document.querySelector('.nucleus-icon')
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
      console.log('chnaged display');
    }
  }
  
  displayIcon(room[currentRoom], "block");
  displayIcon(room[(currentRoom + room.length - 1) % room.length], "none");
  
  document.querySelector('.room-name').innerHTML = `${room[currentRoom].id[0].toUpperCase() + room[currentRoom].id.slice(1)}`
  room[currentRoom].scrollIntoView();
}