const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const width = 28;
const height = 28;
let score = 0;
let levelNumber = 1; // Start at level 1
let currentLevel = levelNumber; // Track the current level
levelDisplay.innerHTML = currentLevel;
const grid = document.querySelector(".grid");

const PACMAN_START = 490;
let isInvulnerable = false;

// lives (single source of truth)
const livesDisplay = document.getElementById("lives");
let lives = 3;
livesDisplay.textContent = lives;

function getLevel(levelNumber) {
  if (levelNumber === 1) {
    return layout1;
  } else if (levelNumber === 2) {
    return layout2;
  } else if (levelNumber === 3) {
    return layout3;
  } else {
    // Default to level 1 if invalid level number
    return layout1;
  }
}

let layout = getLevel(levelNumber); // Sets the map layout based on the current level number

// The levels.js file stores all the levels as arrays. Here we choose which level to load.
// Each element in 'squares' corresponds to one entry in the 'layout' array.

const DIR_CLASSES = ["dir-left", "dir-right", "dir-up", "dir-down"];
let currentDirection = "right"; // default facing

const squares = [];
// create board by looping over the layout array and creating a div for each item in the array. Depending on the value of the item, we add the corresponding class to the div. Notice the termination of the loop with 'i < layout.length' to ensure we cover all items in the array.

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    //square.id = i; // Assign an ID to each square for easier reference later
    grid.appendChild(square);

    // Store a reference to the square in our 'squares' array
    // This allows us to later manipulate or update the square (e.g., add classes for pac-dots, walls, etc.)
    squares.push(square);

    // Add layout to the board
    if (layout[i] === 0) {
      squares[i].classList.add("pac-dot");
    }

    if (layout[i] === 1) {
      squares[i].classList.add("wall");
    }

    if (layout[i] === 2) {
      squares[i].classList.add("ghost-lair");
    }

    if (layout[i] === 3) {
      squares[i].classList.add("power-pellet");
    }
  }
}
createBoard();

function placePacmanIfAlive() {
  if (lives > 0) {
    squares[pacmanCurrentIndex].classList.remove(...DIR_CLASSES);
    squares[pacmanCurrentIndex].classList.add(
      "pac-man",
      `dir-${currentDirection}`
    );
  }
}

function addPacmanWithDirection(dir) {
  currentDirection = dir;
  squares[pacmanCurrentIndex].classList.remove(...DIR_CLASSES);
  squares[pacmanCurrentIndex].classList.add("pac-man", `dir-${dir}`);
}

function gameOver() {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.removeEventListener("keyup", movePacman);
  setTimeout(function () {
    alert("Game Over!");
  }, 200);
}

function handleLifeLoss() {
  // decrement + update UI
  lives--;
  livesDisplay.textContent = lives;

  if (lives <= 0) {
    squares[pacmanCurrentIndex].classList.remove("pac-man", ...DIR_CLASSES);
    gameOver();
    return;
  }

  // brief invulnerability
  isInvulnerable = true;
  setTimeout(() => {
    isInvulnerable = false;
  }, 1000);

  // reset Pac-Man position
  squares[pacmanCurrentIndex].classList.remove("pac-man", ...DIR_CLASSES);
  pacmanCurrentIndex = PACMAN_START;
  addPacmanWithDirection("right"); // respawn facing right

  // OPTIONAL: also reset ghosts to starts (uncomment if you want this)
  /*
  ghosts.forEach(g => {
    squares[g.currentIndex].classList.remove(g.className, 'ghost', 'scared-ghost');
    g.currentIndex = g.startIndex;
    squares[g.currentIndex].classList.add(g.className, 'ghost');
  });
*/
}

function movePacman(e) {
  e.preventDefault();
  let direction = "";

  // Determine direction from keyboard or touch
  if (e.key) {
    // Keyboard input
    switch (e.key) {
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowUp":
        direction = "up";
        break;
      default:
        return; // Exit if not an arrow key
    }
  } else {
    // Touch input - direction passed to the function directly, extra directly. I will not tolerate doubts on my directionality
    direction = e;
  }

  movePacmanInDirection(direction);
}

function movePacmanInDirection(direction) {
  squares[pacmanCurrentIndex].classList.remove("pac-man", ...DIR_CLASSES);

  switch (direction) {
    case "left":
      if (
        pacmanCurrentIndex % width !== 0 &&
        !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex -= 1;
      }

      if (squares[pacmanCurrentIndex - 1] === squares[363]) {
        pacmanCurrentIndex = 391;
      }
      break;

    case "right":
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex += 1;
      }

      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex = 364;
      }
      break;

    case "down":
      if (
        pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex += width;
      }
      break;

    case "up":
      if (
        pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex -= width;
      }
      break;
  }

  addPacmanWithDirection(direction);

  pacDotEaten();
  powerPelletEaten();
  checkForGameOver();
  checkForWin();
}

document.addEventListener("keyup", movePacman);

// Mobile Touch Controls
document.addEventListener("DOMContentLoaded", function () {
  const upBtn = document.getElementById("up-btn");
  const downBtn = document.getElementById("down-btn");
  const leftBtn = document.getElementById("left-btn");
  const rightBtn = document.getElementById("right-btn");

  if (upBtn)
    upBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      movePacmanInDirection("up");
    });
  if (downBtn)
    downBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      movePacmanInDirection("down");
    });
  if (leftBtn)
    leftBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      movePacmanInDirection("left");
    });
  if (rightBtn)
    rightBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      movePacmanInDirection("right");
    });
});

// What happens when you eat a pac-dot
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    score++;
    scoreDisplay.innerHTML = score;
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
  }
}

// what happens when you eat a power pellet
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    scoreDisplay.innerHTML = score;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 10000);
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
  }
}

// make the ghosts chill the fuck out
function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

// Ghost Constructor (remember classes start with a capital letter) This special kind of function is used to create multiple objects with the same properties and methods.
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

// all my ghosts
ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];

// draw ghosts on the grid

ghosts.forEach((ghost) => {
  squares[ghost.currentIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

// Move ghosts randomly

ghosts.forEach((ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  const directions = [-1, +1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    // if the next square your ghost is going to go to does NOT contain a wall and does NOT contain a ghost, you can go there
    if (
      !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
      !squares[ghost.currentIndex + direction].classList.contains("wall")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );

      ghost.currentIndex += direction;

      squares[ghost.currentIndex].classList.add(
        "ghost",
        ghost.className,
        "ghost"
      );

      // else find a new direction to try
    } else direction = directions[Math.floor(Math.random() * directions.length)];

    // if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }
    // if the ghost is scared and pacman is on it
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pac-man")
    ) {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      scoreDisplay.innerHTML = score;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    }
    checkForGameOver();
  }, ghost.speed);
}
// check for a game over
function checkForGameOver() {
  const onGhost = squares[pacmanCurrentIndex].classList.contains("ghost");
  const onScared =
    squares[pacmanCurrentIndex].classList.contains("scared-ghost");

  if (onGhost && !onScared && !isInvulnerable) {
    handleLifeLoss();
  }

}
// check for a win

function checkForWin() {
  if (score === 274 && levelNumber === 3) {
    // stop each ghost
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    document.removeEventListener("keyup", movePacman);
    //replace this with fancy react modal later
    setTimeout(function () {
      alert(
        "You Have Completed Pacman Extreme! Increase the difficulty on newgame+ by following this link https://store.steampowered.com/app/374320/DARK_SOULS_III/ "
      );
    }, 500);
  } else if (score === 274 && levelNumber < 3) {
    // stop each ghost
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    setTimeout(function () {
      alert(
        "You Have ruthlessly dominated Level " +
          levelNumber +
          "! Get ready for the next nailbiting adventure!"
      );
    }, 500);
    levelNumber += 1; // Increase the level number
    score = 0; // Reset score for the new level
    scoreDisplay.innerHTML = score; // Update the score display
    levelDisplay.innerHTML = levelNumber; // Update the level display
    layout = getLevel(levelNumber); // Load the new level layout
    squares.forEach((square) => (square.className = "")); // Clear the board
    createBoard(); // Recreate the board with the new layout
    pacmanCurrentIndex = PACMAN_START; // use the constant, not a magic number
    addPacmanWithDirection("right"); // spawn facing right

    ghosts.forEach((ghost) => {
      ghost.currentIndex = ghost.startIndex;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      moveGhost(ghost);
    });

    // Re-enable pacman movement
    document.addEventListener("keyup", movePacman);
  }
}

//create Characters
//draw pac-man onto the board
let pacmanCurrentIndex = PACMAN_START;
addPacmanWithDirection('right'); // spawn facing right on load
