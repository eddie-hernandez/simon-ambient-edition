# Simon (Ambient Version)

"Simon" has long been a fan favorite game to play and learn.  
A fantastic memory game itself, but quite frankly...a little chaotic to me.  
  
The game's lights and sounds are so loud and so noisy, that it honestly trips me up a little bit while trying to play. Can't it be fun and a little more meditative at the same time?!  
  
This is where the ambient version of Simon comes in.
Not that anyone asked for it, but I'm choosing sanity while working on strengthening my memory versus losing my marbles pressing some color buttons for fun.


## Wireframe (Main Game Board)

![Main Game Board](/images/wireframe-gameboard.png)


## User Stories


### MVP:
- As a user, I want four different colored button options to press.
- As a user, I want to start a new game.
- As a user, I want the game to generate and show me a sequence of buttons to press.
- As a user, I want to be able to respond to the computer's sequence to try and match it.
- As a user, I want to check if the button I pressed matches that of the game's sequence.
- As a user, I want each consecutive level to add another button onto the game's sequence.
- As a user, I want to know if I pushed the wrong button.
- As a user, I want to win after successfully matching game's sequence for 10 consecutive levels.
- As a user, I want the game to reset after winning or losing.



### Version 2:
- As a user, I want a button to activate when I press on it in its correct sequence order.
- As a user, I want the game board to have multiple color themes to choose from.
- As a user, I want the game to end after 5 seconds of inactivity.
- As a user, I want the game to play a special shutoff sound bite that only plays if the game ends due to inactivity.
- As a user, I want the game to have a color-sensitivity mode.




### Version 3:
- As a user, I want the game to have a start up sequence that initializes once I press the start button.
- As a user, I want the game to be able to track how many times I've won or lost.
- As a user, I want the game to have a hard mode where the buttons flash 0.5 seconds faster than in normal mode.
- As a user, I want to be able to choose how many levels I want to play (up to 32 levels).
- As a user, I want a win sequence that initializes only after I've won the game.
- As a user, I want a fail sequence that initializes only after I've lost a game.




## Pseudocode Breakdown

- As a user, I want four different colored button options to press: red, blue, green, yellow

```

use DOM to get each colored button element by id
    four in total: blue, yellow, green, red

assign each color button to their respective sound

assign each color button to their respective flash color

create a function called "enableButtons" that
enables buttons as a mouse click event

create another function called "disableButtons" that
disables buttons when computer is demonstrating sequence required
to pass level

```

- As a user, I want to start a new game.

```

use DOM to get start button from html file
add a mouse click listener event to startButton

create a function called "startGame"
    hide startButton
    call "nextLevel"
    show level number that increments as each level passes
call "startGame" in startButton mouse click event

```

- As a user, I want the game to generate and show me a sequence of buttons to press.

```

create a function called "flashDemo"
    for each button in the game's sequence array,
        flash each button in order

create a function "getRandomButton"
    select a random color button from green, red, blue, or yellow
        add selected button to the game's sequence array
    call "flashDemo" function
    call "playerTurn" function

```

- As a user, I want to be able to respond to the computer's sequence to try and match it.

```

create a function called "playerTurn" 
    enable all buttons
    add each button a player clicks to playerSequence array
    call "checkSequence" function each time player clicks button


```

- As a user, I want to check if the button I pressed matches that of the game's sequence.

```
create a function called "checkSequence"
    for each button a player has pressed,
        IF the button the player pressed matches that of the game's sequence, but there are more buttons to check for,
            continue checking
        ELSE IF all buttons in playerSequence array matches that of the gameSequence array,
            call "nextLevel" function
        ELSE IF player presses a button that does not match that of the game's sequence,
            call "loseGame"
        ELSE IF player passes 10 rounds of matching the game's sequence successfully,
            call "winGame"
        ELSE
            return

```



- As a user, I want each consecutive level to add another button onto the game's sequence.

```

create a function called "nextLevel"
    increment level number by 1
    call "getRandomButton" function
    disable buttons
    call "flashDemo" function


create a mouse click listener event for "nextLevel"


```

- As a user, I want to know if I pushed the wrong button.

```

create a variable called "errorNoise"
set value of "errorNoise" as "error" sound bite

create a new function called "loseGame"
    play "errorNoise" sound
    display "you lose!" message

```

- As a user, I want to win after successfully matching game's sequence for 10 consecutive levels.

```

create a new function called "winGame"
    play "winNoise" sound
    display "you win!" message

```

- As a user, I want the game to reset after winning or losing.

```

create a "resetGame" function
    reset level number to 1
    reset playerSequence array to empty
    reset gameSequence array to empty
    display startButton again


```
