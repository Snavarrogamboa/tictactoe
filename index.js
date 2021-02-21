const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const board = document.getElementById('board')
const WINNING_NUMBERS = [
    [0, 1, 2],//messed up a lot here, forgot arrays are ZERO BASED :(
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]') //unsure why this need brackets didn't work without it, maybe because its an array?
let circleTurn
const currentPlayer = document.getElementById('currentPlayer')
const winningPageElement = document.getElementById('winningPage')
const winningPageText = document.querySelector('[data-winning-page-text]')
const restartButton = document.getElementById('restartButton')



startGame()

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)

        cell.addEventListener("click", handleClick, {once : true}) //only does click event once
        
    });
    setBoardHoverClass()
    winningPageElement.classList.remove('show')
};

function handleClick(e) {
    const cell = e.target //whatever cell we clicked on
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //if circle turn return circle otherwise return x
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
       endGame(false)
    } else if (aDraw()) {
        endGame(true)
    }else {
    switchTurns()
    setBoardHoverClass()
}};

//ending game funtion
function endGame(draw) {
    if (draw) {
        winningPageText.innerText = "DRAW"

    }else {
        winningPageText.innerText = `${circleTurn ? 'O' : 'X'} WINS`//adding winning messege page
    }
    winningPageElement.classList.add('show')
}
//Checking for a draw
function aDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  };

//fuction to place the mark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
};

//function to switch turns 
function switchTurns() {
    circleTurn =! circleTurn
    currentPlayer.innerText = ` PLAYER ${circleTurn ? 'O' : 'X'} TURN`
    
};

//funtion to set hover
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

}
//funtion to check if the winning array matches any array made
function checkWin(currentClass) {
   return WINNING_NUMBERS.some(combination => {
       return combination.every(index => {
           return cellElements[index].classList.contains(currentClass)
       })
   })
}

//overall i found this kinda difficult, it gets a bit crazy when you're trying to incorporate js, html, css, boostrap all cohesively
//thankful i had lots of help to start this off 
//still having trouble incorporating css and bootstrap
//JS code is still messy but at least its working