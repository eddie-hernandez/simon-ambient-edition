/* 



*/


/*

--------------------------CODE TESTS GO UP HERE!!!----------------------------------

*/

const start = document.getElementById("start")

// sounds

const blueNoise = document.querySelector(".bluesound")
const redNoise = document.querySelector(".redsound")
const yellowNoise = document.querySelector(".yellowsound")
const greenNoise = document.querySelector(".greensound")
const errorNoise = document.getElementById("error")
const levelUp = document.getElementById("levelsound")

function errorSound() {
    errorNoise.play()
}

function levelSound() {
    levelUp.play()
}

// creating button variables using DOM

const startButton = document.getElementById("startButton")
const blue = document.getElementById("blue")
const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const green = document.getElementById("green")

const colors = [blue, red, yellow, green]
const noises = [blueNoise, redNoise, yellowNoise, greenNoise]

let levelNumber = 1 // level number (iterates each level), tried defining as undefined but displays "undefined" lol

// use DOM to create level counter
// for each level, increase the number of levels by 1 
// (starting at 1 and ending at 10)

const levelCounter = document.createElement("p")
levelCounter.innerText = `level ${levelNumber}`
levelCounter.style.visibility = "hidden"
start.appendChild(levelCounter)

function displayLevel() {
    levelCounter.style.visibility = "visible"
}

// function activates all buttons in loop

function activateAll() {
    for (let i = 0; i < colors.length; i++) {
        colors[i].classList.remove("inactive")
        setTimeout(() => {colors[i].classList.add("inactive")}, 600)
    }
    for (let i = 0; i < noises.length; i++) {
        noises[i].play()
        noises[i].currentTime=0
    }
}

// activate specific buttons (audio only really works in async await) (mainly for sequences)

function redActivate() {
    red.classList.remove("inactive")
    redNoise.play()
    redNoise.currentTime=0
    setTimeout(() => {red.classList.add("inactive")}, 500)
}

function blueActivate() {
    blue.classList.remove("inactive")
    blueNoise.play()
    blueNoise.currentTime=0
    setTimeout(() => {blue.classList.add("inactive")}, 500)
}

function yellowActivate() {
    yellow.classList.remove("inactive")
    yellowNoise.play()
    yellowNoise.currentTime=0
    setTimeout(() => {yellow.classList.add("inactive")}, 500)
}

function greenActivate() {
    green.classList.remove("inactive")
    greenNoise.play()
    greenNoise.currentTime=0
    setTimeout(() => {green.classList.add("inactive")}, 500)
}

blue.addEventListener('click', blueActivate)
red.addEventListener('click', redActivate)
yellow.addEventListener('click', yellowActivate)
green.addEventListener('click', greenActivate)

/*
startGame Function (keep in mind that to get the startButton to 
show up again, the display has to go from "none" to "block" 
('visible' is not a keyword for .display))
*/

function startGame() {
    startButton.style.visibility = "hidden"
    setTimeout(redActivate, 100)
    setTimeout(blueActivate, 250)
    setTimeout(greenActivate, 425)
    setTimeout(yellowActivate, 600)
    setTimeout(activateAll, 1500)
    setTimeout(displayLevel, 2500)
    setTimeout(levelSound, 2500)
    setTimeout(nextLevel, 4000)
}

startButton.addEventListener('click', startGame)


// Random Order Sequencing

let gameSequence = [] // add each new level sequence addition to the current game's array, (full game sequence)
let currentSequence = [] // we can use this to maybe act as the computer's array
let userSequence = [] // adds player choice to array

/*

spread operator can clone an array

what if we leveled up using spread operator each time to clone the full game sequence,
which can be used as a full sequence library. the current sequence will act as the computer's array
and the user sequence represents the players'. every time we move on to the next level, 
the current sequence & the user sequence will .shift() as a user clicks a button.
this will help when checking if the user and the computer have the same buttons pressed for each level,
without deleting the entire game's sequence because that will be stored in the gameSequence array.
then by the time a new level comes, assuming the player and the computer have the same buttons selected,
both current and user sequences will re-clone themselves as the game sequence and add another button
to the current level's sequence, all the way to level ten. let's try!!!!
(how the hell am i going to get the activations going for each random button though...)

*/

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
    getRandom()
    currentSequence = [...gameSequence]
    console.log(currentSequence)
    console.log(gameSequence)
    sequenceDemo(gameSequence)
    userDemo()
}

function sequenceDemo(gameSequence) {
    gameSequence.forEach((color, index) => {
        setTimeout(() => {buttonActivate(color)}, index * 1000)
    })
}

// activates a button (mainly for random selection)

function buttonActivate(color) {
    color.classList.remove("inactive")
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
    setTimeout(() => {color.classList.add("inactive")}, 500)
}

function userDemo() {
    document.querySelector("#buttons").onclick = function(e) {
        if (userSequence.length < 10) {
            if (e.target.className !== "clickDiv") {
                userSequence.push(e.target)
                console.log(userSequence)
                userSequence.forEach(() => {
                    runSequenceCheck()
                }) 
            }
        }
    }
}

let checkUser
let checkComputer

function runSequenceCheck() {
    if (checkUser == checkComputer && userSequence.length !== 0) {
        checkSequence()
    }
    else if (checkUser === checkComputer && userSequence.length === 0) {
        setTimeout(levelSound, 0)
        nextLevel()
        levelNumber = levelNumber + 1
        return levelCounter.innerText = `level ${levelNumber}`
    }
    else {
        return
    }
}

function checkSequence() {
    checkUser = userSequence.shift()
    checkComputer = currentSequence.shift()
    if (checkUser == checkComputer && gameSequence.length < 10) {
        console.log(userSequence)
        runSequenceCheck()
        console.log(currentSequence)
    }
    else if (gameSequence.length === 10) {
        winGame()
    }
    else if (checkUser === checkComputer && currentSequence.length === 1) {
        return currentSequence.unshift()
    }
    else {
        return
    }
}


// function newCheckSequence() {
//     for (let i = 0; i < currentSequence.length; i++) {
//         if (userSequence[i] == )
//     }
// }












function loseGame() {
    gameSequence = []
    setTimeout(errorSound, 0)
    levelCounter.style.visibility = "none"
    startButton.style.visibility = "visible"
}

function reset() {
    gameSequence = []
    currentSequence = []
    levelNumber = 1
    levelCounter.style.visibility = "none"
    startButton.style.visibility = "visible"
    return levelCounter.innerText = `level ${levelNumber}`
}

function winGame() {
    setTimeout(greenActivate, 500)
    setTimeout(yellowActivate, 650)
    setTimeout(greenActivate, 800)
    setTimeout(redActivate, 950)
    setTimeout(blueActivate, 1100)
    setTimeout(redActivate, 1500)
    setTimeout(blueActivate, 1600)
    setTimeout(greenActivate, 1700)
    setTimeout(yellowActivate, 1800)
    setTimeout(activateAll, 2300)
    setTimeout(reset, 3500)
}