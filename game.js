// sounds

const blueNoise = document.querySelector(`.bluesound`)
const redNoise = document.querySelector(`.redsound`)
const yellowNoise = document.querySelector(`.yellowsound`)
const greenNoise = document.querySelector(`.greensound`)
const errorNoise = document.getElementById(`error`)
const levelUp = document.getElementById(`levelsound`)

function errorSound() {
    errorNoise.play()
}

function levelSound() {
    levelUp.play()
}

// creating button variables using DOM

const startButton = document.getElementById(`startButton`)
const blue = document.getElementById(`blue`)
const red = document.getElementById(`red`)
const yellow = document.getElementById(`yellow`)
const green = document.getElementById(`green`)

const colors = [blue, red, yellow, green]
const noises = [blueNoise, redNoise, yellowNoise, greenNoise]

let levelNumber = 1 // level number (iterates each level), tried defining as undefined but displays "undefined" lol

// use DOM to create level counter
// for each level, increase the number of levels by 1 
// (starting at 1 and ending at 10)

const levelCounter = document.createElement(`p`)
levelCounter.innerText = `level ${levelNumber}`
levelCounter.style.visibility = `hidden`
start.appendChild(levelCounter)

function displayLevel() {
    levelCounter.style.visibility = `visible`
}

// function activates all buttons in loop

function activateAll() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].removeAttribute(`class`, `inactive`)
        noises[i].play()
        noises[i].currentTime=0
        setTimeout(() => {colors[i].setAttribute(`class`, `inactive`)}, 600)
    }
}

// activate buttons

function activateButton(color, colorNoise) {
    color.removeAttribute(`class`, `inactive`)
    colorNoise.play()
    colorNoise.currentTime=0
    setTimeout(() => {color.setAttribute(`class`, `inactive`)}, 500)
}

function activateButtons() {
    blue.addEventListener('click', () => {activateButton(blue, blueNoise)})
    red.addEventListener('click', () => {activateButton(red, redNoise)})
    yellow.addEventListener('click', () => {activateButton(yellow, yellowNoise)})
    green.addEventListener('click', () => {activateButton(green, greenNoise)})
    document.querySelector(`#buttons`).addEventListener('click', userTurn)
}

function deactivateButtons() {
    blue.removeEventListener('click', () => {activateButton(blue, blueNoise)})
    red.removeEventListener('click', () => {activateButton(red, redNoise)})
    yellow.removeEventListener('click', () => {activateButton(yellow, yellowNoise)})
    green.removeEventListener('click', () => {activateButton(green, greenNoise)})
    document.querySelector(`#buttons`).removeEventListener('click', userTurn)
}

/*
startGame Function (keep in mind that to get the startButton to 
show up again, the display has to go from "none" to "block" 
('visible' is not a keyword for .display))
*/

function startSequence () {
    setTimeout(() => {activateButton(red, redNoise)}, 100)
    setTimeout(() => {activateButton(blue, blueNoise)}, 250)
    setTimeout(() => {activateButton(green, greenNoise)}, 425)
    setTimeout(() => {activateButton(yellow, yellowNoise)}, 600)
    setTimeout(activateAll, 1500)
}

function startGame() {
    startButton.style.visibility = `hidden`
    startSequence()
    setTimeout(displayLevel, 2500)
    setTimeout(levelSound, 2500)
    setTimeout(nextLevel, 4000)
}

startButton.addEventListener('click', startGame)


// Random Order Sequencing

let gameSequence = [] // add each new level sequence addition to the current game's array, (full game sequence)
let userSequence = [] // adds player choice to array

function getRandom() {
    const randomButton = colors[(Math.floor(Math.random() * colors.length))]
    if (gameSequence.length < 10) {
        gameSequence.push(randomButton)
        }
    else {
        return
    }
}

function nextLevel() {
    deactivateButtons()
    getRandom()
    setTimeout (sequenceDemo(gameSequence), 1000)
}

function sequenceDemo(gameSequence) {
    gameSequence.forEach((color, index) => {
        setTimeout(() => {demoActivation(color)}, index * 1000)
    })
    activateButtons()
}

// demo activation

function demoActivation(color) {
    color.removeAttribute(`class`, `inactive`)
    if (color === blue) {
        blueNoise.play()
        blueNoise.currentTime=0
    }
    else if (color === yellow) {
        yellowNoise.play()
        yellowNoise.currentTime=0
    }
    else if (color === green) {
        greenNoise.play()
        greenNoise.currentTime=0
    }
    else if (color === red) {
        redNoise.play()
        redNoise.currentTime=0
    }
    else {
        return
    }
    setTimeout(() => {color.setAttribute(`class`, `inactive`)}, 500)
}

function userTurn(e) {
    if (userSequence.length < 10) {
        if (e.target.className !== `clickDiv`) {
            userSequence.push(e.target)
            checkSequence()
        }
    }
    else {
        return
    }
}

// creating playerStatus for win / lose situations

const playerStatus = document.createElement(`p`)
playerStatus.setAttribute(`id`, `status`)
document.body.append(playerStatus)

function youLose() {
    playerStatus.innerText = `you lose!`
    setTimeout(() => {playerStatus.innerText = ``}, 1000)
}

function youWin() {
    playerStatus.innerText = `you win!`
    setTimeout(() => {playerStatus.innerText = ``}, 1000)
}

function resetGame() {
    deactivateButtons()
    gameSequence = []
    userSequence = []
    levelNumber = 1
    levelCounter.innerText = `level ${levelNumber}`
    startButton.style.visibility = `visible`
    return levelCounter.style.visibility = `hidden`
}

function checkSequence() {
    // iterate thru user sequence
    for (let i = 0; i < userSequence.length; i++) {
        // check each element in both game & user sequences every time
        if (userSequence[i] == gameSequence[i]) {
            continue
        }
        else {
            // as we're iterating, if an element in user array does not
            // match element in game sequence array, user loses game
            errorSound()
            youLose()
            resetGame()
            return
        }
    }
    if (userSequence.length === 2) {
        youWin()
        winGame()
        return
    }
    // if both arrays are same length, then next level
    if (userSequence.length === gameSequence.length) {   
            levelNumber = levelNumber + 1
            levelCounter.innerText = `level ${levelNumber}`
            setTimeout(nextLevel, 1000)
            userSequence = []
    }
}

function winSequence() {
    setTimeout(() => {activateButton(green, greenNoise)}, 500)
    setTimeout(() => {activateButton(yellow, yellowNoise)}, 650)
    setTimeout(() => {activateButton(green, greenNoise)}, 800)
    setTimeout(() => {activateButton(red, redNoise)}, 950)
    setTimeout(() => {activateButton(blue, blueNoise)}, 1100)
    setTimeout(() => {activateButton(red, redNoise)}, 1500)
    setTimeout(() => {activateButton(blue, blueNoise)}, 1600)
    setTimeout(() => {activateButton(green, greenNoise)}, 1700)
    setTimeout(() => {activateButton(yellow, yellowNoise)}, 1800)
    setTimeout(activateAll, 2300)
}

function winGame() {
    winSequence()
    setTimeout(resetGame, 3500)
}