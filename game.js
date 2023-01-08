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

function earthMode () {
    if (checkbox.checked === true) {
        document.body.setAttribute(`class`, `earth`)
        red.classList.replace(`inactive`, `earth`)
        blue.classList.replace(`inactive`, `earth`)
        green.classList.replace(`inactive`, `earth`)
        yellow.classList.replace(`inactive`, `earth`)
    }
    else {
        document.body.removeAttribute(`class`, `earth`)
        red.classList.replace(`earth`, `inactive`)
        blue.classList.replace(`earth`, `inactive`)
        green.classList.replace(`earth`, `inactive`)
        yellow.classList.replace(`earth`, `inactive`)
    }
}

// function earthModeOff () {
//     document.body.removeAttribute(`class`, `earth`)
//     red.classList.replace(`earth`, `inactive`)
//     blue.classList.replace(`earth`, `inactive`)
//     green.classList.replace(`earth`, `inactive`)
//     yellow.classList.replace(`earth`, `inactive`)
// }

const checkbox = document.querySelector(`input`)

// changing theme

checkbox.addEventListener(`change`, earthMode)

// checkbox.removeEventListener(`change`, earthModeOff)

// use DOM to create level counter
// for each level, increase the number of levels by 1 
// (starting at 1 and ending at 10)

let levelNumber = 1
const level = document.createElement(`p`)
level.setAttribute(`class`,`level`)
level.innerText = `level ${levelNumber}`
level.style.visibility = `hidden`
document.getElementById(`start`).appendChild(level)

// function activates all buttons in loop


// Changing the value of currentTime seeks the media to the new time

function activateAll() {
    for (let i = 0; i < colors.length; i++) {
        if (document.body.classList == `earth`) {
            colors[i].removeAttribute(`class`, `earth`)
        }
        else {
            colors[i].removeAttribute(`class`, `inactive`)
        }
        noises[i].play()
        noises[i].currentTime=0
        if (document.body.classList == `earth`) {
            setTimeout(() => {colors[i].setAttribute(`class`,`earth`)}, 500)
        }
        else {
            setTimeout(() => {colors[i].setAttribute(`class`,`inactive`)}, 500)
        }
    }
}

// activate buttons

function activateButton(color, colorNoise) {
    if (document.body.classList == `earth`) {
        color.removeAttribute(`class`, `earth`)
    }
    else if (color.classList == `inactive`) {
        color.removeAttribute(`class`, `inactive`)
    }
    colorNoise.play()
    colorNoise.currentTime=0
    if (document.body.classList == `earth`) {
        setTimeout(() => {color.setAttribute(`class`,`earth`)}, 500)
    }
    else {
        setTimeout(() => {color.setAttribute(`class`,`inactive`)}, 500)
    }
}

function activateButtons() {
    blue.addEventListener('click', () => {activateButton(blue, blueNoise)})
    blue.disabled = false
    red.addEventListener('click', () => {activateButton(red, redNoise)})
    red.disabled = false
    yellow.addEventListener('click', () => {activateButton(yellow, yellowNoise)})
    yellow.disabled = false
    green.addEventListener('click', () => {activateButton(green, greenNoise)})
    green.disabled = false
    document.querySelector(`#buttons`).addEventListener('click', userTurn)
}

function deactivateButtons() {
    blue.disabled = true
    blue.removeEventListener('click', () => {activateButton(blue, blueNoise)})
    red.disabled = true
    red.removeEventListener('click', () => {activateButton(red, redNoise)})
    yellow.disabled = true
    yellow.removeEventListener('click', () => {activateButton(yellow, yellowNoise)})
    green.disabled = true
    green.removeEventListener('click', () => {activateButton(green, greenNoise)})
    document.querySelector(`#buttons`).disabled = true
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
    level.innerText = `level ${levelNumber}`
    startButton.style.visibility = `hidden`
    startSequence()
    setTimeout(() => {level.style.visibility = `visible`}, 2500)
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
    if (document.body.classList == `earth`) {
        color.removeAttribute(`class`, `earth`)
    }
    else if (color.classList == `inactive`) {
        color.removeAttribute(`class`, `inactive`)
    }
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
    if (document.body.classList == `earth`) {
        setTimeout(() => {color.setAttribute(`class`,`earth`)}, 500)
    }
    else {
        setTimeout(() => {color.setAttribute(`class`, `inactive`)}, 500)
    }
}

function userTurn(e) {
    if (userSequence.length < 10) {
        if (e.target.id === `blue` || e.target.id === `red`
        || e.target.id === `yellow` || e.target.id === `green`) {
            userSequence.push(e.target)
            checkSequence()
        }
    }
    else {
        return
    }
}

// creating playerStatus for win / lose situations

function youLose() {
    level.innerText = `OOF! you lost =[`
    setTimeout(() => {level.innerText = ``}, 1000)
    setTimeout(() => {level.style.visibility = `hidden`}, 1000)
    deactivateButtons()
}

function youWin() {
    level.innerText = `you win!!`
    setTimeout(() => {level.innerText = `music mode unlocked!
    (make your own tune with the buttons!)`}, 1000)
    setTimeout(() => {level.style.visibility = `hidden`}, 3000)
    document.querySelector(`#buttons`).disabled = true
    document.querySelector(`#buttons`).removeEventListener('click', userTurn)
}

function resetGame() {
    gameSequence = []
    userSequence = []
    levelNumber = 1
    setTimeout(() => {startButton.style.visibility = `visible`}, 1000)
    return 
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
    if (userSequence.length === 3) {
        youWin()
        winSequence()
        setTimeout(resetGame, 2000)
        return
    }
    // if both arrays are same length, then next level
    else if (userSequence.length === gameSequence.length) {   
            levelNumber = levelNumber + 1
            level.innerText = `level ${levelNumber}`
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
    setTimeout(activateAll, 2400)
}