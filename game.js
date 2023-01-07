/* 

// function runSequenceCheck() {
//     if (checkUser == checkComputer && userSequence.length !== 0) {
//         checkSequence()
//     }
//     else if (checkUser === checkComputer && userSequence.length === 0) {
//         setTimeout(levelSound, 0)
//         nextLevel()
//         levelNumber = levelNumber + 1
//         return levelCounter.innerText = `level ${levelNumber}`
//     }
//     else {
//         return
//     }
// }

// function checkSequence() {
//     checkUser = userSequence.shift()
//     checkComputer = currentSequence.shift()
//     if (checkUser == checkComputer && gameSequence.length < 10) {
//         console.log(userSequence)
//         runSequenceCheck()
//         console.log(currentSequence)
//     }
//     else if (gameSequence.length === 10) {
//         winGame()
//     }
//     else if (checkUser === checkComputer && currentSequence.length === 1) {
//         return currentSequence.unshift()
//     }
//     else {
//         return
//     }
// }

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
        colors[i].removeAttribute(`class`, `inactive`)
        setTimeout(() => {colors[i].setAttribute(`class`, `inactive`)}, 600)
    }
    for (let i = 0; i < noises.length; i++) {
        noises[i].play()
        noises[i].currentTime=0
    }
}

// activate specific buttons (audio only really works in async await) (mainly for sequences)

function redActivate() {
    red.removeAttribute(`class`, `inactive`)
    redNoise.play()
    redNoise.currentTime=0
    setTimeout(() => {red.setAttribute(`class`, `inactive`)}, 500)
}

function blueActivate() {
    blue.removeAttribute(`class`, `inactive`)
    blueNoise.play()
    blueNoise.currentTime=0
    setTimeout(() => {blue.setAttribute(`class`, `inactive`)}, 500)
}

function yellowActivate() {
    yellow.removeAttribute(`class`, `inactive`)
    yellowNoise.play()
    yellowNoise.currentTime=0
    setTimeout(() => {yellow.setAttribute(`class`, `inactive`)}, 500)
}

function greenActivate() {
    green.removeAttribute(`class`, `inactive`)
    greenNoise.play()
    greenNoise.currentTime=0
    setTimeout(() => {green.setAttribute(`class`, `inactive`)}, 500)
}

function activateButtons() {
    blue.addEventListener('click', blueActivate)
    red.addEventListener('click', redActivate)
    yellow.addEventListener('click', yellowActivate)
    green.addEventListener('click', greenActivate)
}

function deactivateButtons() {
    blue.removeEventListener('click', blueActivate)
    red.removeEventListener('click', redActivate)
    yellow.removeEventListener('click', yellowActivate)
    green.removeEventListener('click', greenActivate)
}

/*
startGame Function (keep in mind that to get the startButton to 
show up again, the display has to go from "none" to "block" 
('visible' is not a keyword for .display))
*/

function startSequence () {
    setTimeout(redActivate, 100)
    setTimeout(blueActivate, 250)
    setTimeout(greenActivate, 425)
    setTimeout(yellowActivate, 600)
    setTimeout(activateAll, 1500)
}

function startGame() {
    startButton.style.visibility = "hidden"
    startSequence()
    setTimeout(displayLevel, 2500)
    setTimeout(levelSound, 2500)
    setTimeout(nextLevel, 4000)
}

startButton.addEventListener('click', startGame)


// Random Order Sequencing

let gameSequence = [] // add each new level sequence addition to the current game's array, (full game sequence)
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
    deactivateButtons()
    getRandom()
    setTimeout (sequenceDemo(gameSequence), 1000)
    userDemo()
}

function sequenceDemo(gameSequence) {
    gameSequence.forEach((color, index) => {
        setTimeout(() => {buttonActivate(color)}, index * 1000)
    })
    console.log(gameSequence)
    activateButtons()
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
                console.log(gameSequence)
                userSequence.forEach(() => {
                    checkSequence()
                }) 
            }
        }
        else {
            return
        }
    }
}



// function newSequenceCheck() {
//     for (let i = 0; i < gameSequence.length; i++) {
//         if (checkUser !== checkComputer) {
//             setTimeout(errorSound, 0)
//             resetGame()
//         }
//         else {
//             checkUser = userSequence.shift()
//             checkComputer = levelSequence.shift()
//         }
//     }
//     if (userSequence.length === 10) {
//         winGame()
//     }
//     else {
//         nextLevel()
//         levelNumber = levelNumber + 1
//         return levelCounter.innerText = `level ${levelNumber}`
//     }
// }

const playerStatus = document.createElement("p")
playerStatus.setAttribute(`id`, `status`)
document.body.append(playerStatus)

function youLose() {
    playerStatus.innerText = `you lose!`
    setTimeout(playerStatus.innerText = ``, 2000)
}

function youWin() {
    playerStatus.innerText = `you win!`
    setTimeout(playerStatus.innerText = ``, 2000)
}

function resetGame() {
    deactivateButtons()
    youLose()
    gameSequence = []
    userSequence = []
    levelNumber = 1
    levelCounter.innerText = `level ${levelNumber}`
    startButton.style.visibility = "visible"
    return levelCounter.style.visibility = "none"
}

function checkSequence() {
    for (let i = 0; i < gameSequence.length; i++) {
        if (userSequence[i] === gameSequence[i]) {
            if (userSequence.length !== gameSequence.length) {
            return
            }
            else {         
                levelNumber = levelNumber + 1
                levelCounter.innerText = `level ${levelNumber}`
                setTimeout(nextLevel, 1000)
                userSequence = []
            }
        }
        else {
            setTimeout(errorSound, 0)
            setTimeout(resetGame, 0)
        }
    }
    if (userSequence.length === 10) {
        winGame()
    }
}

function winSequence() {
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
}


function winGame() {
    youWin()
    winSequence()
    setTimeout(resetGame, 3500)
}