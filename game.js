// creating sound variables using DOM
const errorNoise = document.getElementById(`error`)
const levelUp = document.getElementById(`levelsound`) 
const blueNoise = document.querySelector(`.bluesound`)
const redNoise = document.querySelector(`.redsound`) // these css classes should be camel case OR with hyphen delimiters ( red-sound)
const yellowNoise = document.querySelector(`.yellowsound`)
const greenNoise = document.querySelector(`.greensound`)
const noises = [blueNoise, redNoise, yellowNoise, greenNoise]

// creating button variables using DOM
const startButton = document.getElementById(`startButton`)
const blue = document.getElementById(`blue`)
const red = document.getElementById(`red`)
const yellow = document.getElementById(`yellow`)
const green = document.getElementById(`green`)
const colors = [blue, red, yellow, green]

// changing color theme
const checkbox = document.querySelector(`input`) // bad naming convention here - be more specific

const earthMode = () => {
    // if checkbox is checked, change colors to earth
    if (checkbox.checked === true) {
        document.body.setAttribute(`class`, `earth`)
        red.classList.replace(`inactive`, `earth`)
        blue.classList.replace(`inactive`, `earth`)
        green.classList.replace(`inactive`, `earth`)
        yellow.classList.replace(`inactive`, `earth`)
    }

    else {
    // changing colors back to classic theme if box is unchecked
        document.body.removeAttribute(`class`, `earth`)
        red.classList.replace(`earth`, `inactive`)
        blue.classList.replace(`earth`, `inactive`)
        green.classList.replace(`earth`, `inactive`)
        yellow.classList.replace(`earth`, `inactive`)
    }
}

checkbox.addEventListener(`change`, earthMode) // event listeners should be grouped together at the end of the file ( since they need access to the previously defined functions typically)

// activating individual buttons (respective colors change & sounds play)
const flashButton = (color, colorNoise) => {

    // determining if color theme is selected to remove appropriate class
    if (document.body.classList == `earth`) {
        color.removeAttribute(`class`, `earth`)
    }
    else if (color.classList == `inactive`) {
        color.removeAttribute(`class`, `inactive`)
    }

    // playing audio for respective color
    colorNoise.play()
    colorNoise.currentTime=0

    // setting the correct color attribute (depending on theme) back after .5 seconds
    if (document.body.classList == `earth`) {
        setTimeout(() => {color.setAttribute(`class`,`earth`)}, 500)
    }
    else {
        setTimeout(() => {color.setAttribute(`class`,`inactive`)}, 500)
    }
}

// activating all buttons (for start & win sequences)
const flashAll = () => {
    // iterating through colors to flash all buttons at once using respective sounds and colors
    for (let i = 0; i < colors.length; i++) {
        if (document.body.classList == `earth`) {
            colors[i].removeAttribute(`class`, `earth`)
        }
        else {
            colors[i].removeAttribute(`class`, `inactive`)
        }

        // using colors array for noise iteration, same array length for both)
        noises[i].play()
        noises[i].currentTime=0

        // setting the correct color attribute (depending on theme) back after .5 seconds
        if (document.body.classList == `earth`) {
            setTimeout(() => {colors[i].setAttribute(`class`,`earth`)}, 500)
        }
        else {
            setTimeout(() => {colors[i].setAttribute(`class`,`inactive`)}, 500)
        }
    }
}

// enabling button functionality using click event listener
const enableButtons = () => {
    blue.addEventListener('click', () => {flashButton(blue, blueNoise)})
    blue.disabled = false
    red.addEventListener('click', () => {flashButton(red, redNoise)})
    red.disabled = false
    yellow.addEventListener('click', () => {flashButton(yellow, yellowNoise)})
    yellow.disabled = false
    green.addEventListener('click', () => {flashButton(green, greenNoise)})
    green.disabled = false
    document.querySelector(`#buttons`).addEventListener('click', playerTurn)
}

// disabling button functionality using event listeners
const disableButtons = () => {
    blue.disabled = true
    blue.removeEventListener('click', () => {flashButton(blue, blueNoise)})
    red.disabled = true
    red.removeEventListener('click', () => {flashButton(red, redNoise)})
    yellow.disabled = true
    yellow.removeEventListener('click', () => {flashButton(yellow, yellowNoise)})
    green.disabled = true
    green.removeEventListener('click', () => {flashButton(green, greenNoise)})
    document.querySelector(`#buttons`).disabled = true
    document.querySelector(`#buttons`).removeEventListener('click', playerTurn)
}

// using DOM to create level counter, appending to start button
let levelNumber = 1 // all global level variables should be at the top of the file
const level = document.createElement(`p`) // the rest of this block should be in an initialize function
level.setAttribute(`class`,`level`)
level.innerText = `level ${levelNumber}`
level.style.visibility = `hidden`
document.getElementById(`start`).appendChild(level)

// starting sequence when "new game" button is clicked
const startSequence = () => {
    setTimeout(() => {flashButton(red, redNoise)}, 100)
    setTimeout(() => {flashButton(blue, blueNoise)}, 250)
    setTimeout(() => {flashButton(green, greenNoise)}, 425)
    setTimeout(() => {flashButton(yellow, yellowNoise)}, 600)
    setTimeout(flashAll, 1500)
}

// starting new game when user clicks "new game" button
const startGame = () => {
    // hiding start button, starting start sequence
    startButton.style.visibility = `hidden`
    startSequence()

    // making level counter visible, setting text to be `level 1`, playing level up sound
    level.innerText = `level ${levelNumber}`
    setTimeout(() => {level.style.visibility = `visible`}, 2500)
    setTimeout(() => {levelUp.play()}, 2500)
    setTimeout(nextLevel, 4000)
}

startButton.addEventListener('click', startGame) // see event listener comment

// computer's sequence (adds a new random button each level if player is successful)
let gameSequence = [] // globals should go together !
// adding each button player presses to player sequence array
let playerSequence = [] // arrays should eb declared with const, unless we want to be able to change it to something else like null or {}( we almost always don't want that)

// getting new random button using colors array, pushing it onto game sequence array
const addRandom = () => { // add random what 
    const randomButton = colors[(Math.floor(Math.random() * colors.length))]
    if (gameSequence.length < 10) {
        gameSequence.push(randomButton)
        }
    else {
        return// return what ? undefined ? 
    }
}

// activating each button with their respective color changes and sounds 
// for each computer demonstration of sequence required to pass level
const demoFlash = (color) => {
    if (document.body.classList == `earth`) {
        color.removeAttribute(`class`, `earth`)
    }
    else if (color.classList == `inactive`) {
        color.removeAttribute(`class`, `inactive`)
    }
    
    // matching the colors being demoed to their appropriate sounds
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

// computer demonstrating button sequence required to pass level
    // adding one second for each item in sequence array
const sequenceDemo = (gameSequence) => {

    gameSequence.forEach((color, index) => {
        setTimeout(() => {demoFlash(color)}, index * 1000)
    })

    enableButtons()
}

// leveling up the game if player is successful, disabling buttons
// adding new random button to the gameSequence array, starting new level demo
const nextLevel = () => {
    disableButtons()
    addRandom()
    setTimeout (sequenceDemo(gameSequence), 1000)
}

// adding each button player clicks to player sequence array,
// checking if each value in array matches that of the computer's
const playerTurn = (e) => {
    if (playerSequence.length < 10) {

        if (e.target.id === `blue` || e.target.id === `red`
        || e.target.id === `yellow` || e.target.id === `green`) {
            playerSequence.push(e.target)
            checkSequence()
        }
    }

    else {
        return
    }
}

// disabling buttons, level counter reads `you lose` to player when loss scenario triggers
const youLose = () => {
    level.innerText = `oof! you lost =[`
    setTimeout(() => {level.innerText = ``}, 1000)
    setTimeout(() => {level.style.visibility = `hidden`}, 1000)
    disableButtons()
}

// changing level counter's text and unlocking music mode after player passes all 10 levels
    // music mode allowing player to click buttons for fun after winning game (softly encouraged to make a melody)
const youWin = () => {
    level.innerText = `you win!!`
    setTimeout(() => {level.innerText = `music mode unlocked!
    (make your own tune with the buttons!)`}, 1000)
    setTimeout(() => {level.style.visibility = `hidden`}, 3000)

    document.querySelector(`#buttons`).disabled = true
    document.querySelector(`#buttons`).removeEventListener('click', playerTurn)
}

// activating win sequence when player wins game
const winSequence = () => {
    setTimeout(() => {flashButton(green, greenNoise)}, 500)
    setTimeout(() => {flashButton(yellow, yellowNoise)}, 650)
    setTimeout(() => {flashButton(green, greenNoise)}, 800)
    setTimeout(() => {flashButton(red, redNoise)}, 950)
    setTimeout(() => {flashButton(blue, blueNoise)}, 1100)
    setTimeout(() => {flashButton(red, redNoise)}, 1500)
    setTimeout(() => {flashButton(blue, blueNoise)}, 1600)
    setTimeout(() => {flashButton(green, greenNoise)}, 1700)
    setTimeout(() => {flashButton(yellow, yellowNoise)}, 1800)
    setTimeout(flashAll, 2400)
}

const checkSequence = () => {
    // iterating through player sequence
    for (let i = 0; i < playerSequence.length; i++) {
        // checking each element in both game & player sequences for a match
        if (playerSequence[i] == gameSequence[i]) {
            continue
        }
        else {
            // lose game scenario
            errorNoise.play()
            youLose()
            setTimeout(resetGame, 500)
            return
        }
    }
    // win game scenario
    if (playerSequence.length === 10) {
        youWin()
        winSequence()
        setTimeout(resetGame, 2500)
        return
    }
    // proceed to next level if player and game sequence arrays reach same length 
    else if (playerSequence.length === gameSequence.length) {   
            levelNumber = levelNumber + 1
            level.innerText = `level ${levelNumber}`
            setTimeout(nextLevel, 1000)
            playerSequence = []
    }
}

// level counter and sequence arrays reset, start button becomes visible again
const resetGame = () => {
    gameSequence = []
    playerSequence = []
    levelNumber = 1
    setTimeout(() => {startButton.style.visibility = `visible`}, 1000)
    return 
}