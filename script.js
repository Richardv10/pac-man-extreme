    const scoreDisplay = document.getElementById('score');
    // const levelDisplay = document.getElementById('level');
    const width = 28;
    let score = 0;
    const grid = document.querySelector('.grid');

/* The array below represents the layout of the grid, where each number corresponds to a different type of square (the legend is below). This approach of using a static array simplifies the project, if we have time we can mutate it for other levels.*/

     const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

// This array will store references to all the <div> elements that make up the grid.
// Each element in 'squares' corresponds to one entry in the 'layout' array.

     const squares = []
    // create board by looping over the layout array and creating a div for each item in the array. Depending on the value of the item, we add the corresponding class to the div. Notice the termination of the loop with 'i < layout.length' to ensure we cover all items in the array. 

function createBoard() {
for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);

        // Store a reference to the square in our 'squares' array
        // This allows us to later manipulate or update the square (e.g., add classes for pac-dots, walls, etc.)
    squares.push(square);

    // Add layout to the board
    if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
    }
}

}















































































// what happens when you eat a power pellet
function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score += 10;
        scoreDisplay.innerHTML = score;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000)
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
}

// make the ghosts chill the fuck out
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
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

// all my Ghosts
ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

// draw my Ghosts onto the grid (the method "forEach" executes a provided function once for each array element, take note of the closing brackets after the codeblock)

ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost');
});

// move the Ghosts randomly (We achieve this by using the Math.random() function to select a random direction from the directions array using Math floor and the length of the array.)
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function() {
        // if the next square your ghost is going to go to does NOT contain a wall and does NOT contain a ghost, you can go there
        if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
             !squares[ghost.currentIndex + direction].classList.contains('wall')){
        
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost');
        ghost.currentIndex += direction;
        squares[ghost.currentIndex].classList.add('ghost', ghost.className, 'ghost');
        // else find a new direction to try
        } else direction = directions[Math.floor(Math.random() * directions.length)];
        // if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }
        // if the ghost is scared and pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            score +=100;
            scoreDisplay.innerHTML = score;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
        }
        checkForGameOver();
    }, ghost.speed);
}

// check for a game over
function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        // stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacman);
        //replace this with fancy react modal later 
        setTimeout(function(){alert("Game Over!");}, 500)
    }

    // check for a win - more to be added later
    if (score === 274) {
        // stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup', movePacman);
        //replace this with fancy react modal later 
        setTimeout(function(){alert("You Have Won!");}, 500)
    }


        

    
}
// Call the function to build the entire board when the game starts
createBoard()

