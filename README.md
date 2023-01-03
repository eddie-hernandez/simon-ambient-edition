# Simon (Ambient Version)

"Simon" has long been a fan favorite game to play. A fantastic memory game, and quite frankly a little chaotic to me. The game's lights and sounds are so loud and so noisy, that it honestly trips me up a little bit. Can't it be fun and meditative at the same time??? This is where the ambient version of Simon comes in.
Not that anyone asked for it, but I'm choosing sanity while working on strengthening my memory versus losing my marbles.


## Wireframe (Main Game Board)

![Main Game Board](gameboard.png)


## User Stories


### MVP:
- As a user, I want four different colored button options to press.
- As a user, I want to start a new game.
- As a user, I want the game to have a random sequence of buttons to press.
- As a user, I want to know which button to press indicated by a unique color and sound.
- As a user, I want each consecutive level to add another button onto the game's sequence.
- As a user, I want to know if I pushed the wrong button.
- As a user, I want to win only after pressing all 10 level's sequences successfully.
- As a user, I want to know if I've won or lost.



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
- As a user, I want the win sequence to have the buttons flash in a specific order.
- As a user, I want the win sequence to include a special jingle sound bite that only plays if the sequence is initialized.
- As a user, I want a fail sequence that initializes only after I've lost a game.
- As a user, I want the fail sequence to have the four buttons flash in a specific order.
- As a user, I want the fail sequence to include a special fail sound bite that only plays if the sequence is initialized.





## Pseudocode Breakdown

- As a user, I want four different colored button options to press: red, blue, green, yellow

```

create a class called ==Buttons==
    build a "constructor" and run "color one", "color two" and "sound" as parameters
    assign property "color one" as the default color
    assign property "color two" as the color that the button changes to in the colorChange method
    "sound" to class using "constructor" method and "this" keyword
    create method "colorChange" to change color when button activates
    create method "soundOn" that turns sound on when button activates

use ==Buttons== class to create red, blue, green, yellow buttons
run colors and sounds through the parameters of the ==Buttons== constructor when making each button

iterating over every button,
    add a mouse click listener event

create a new function called ==runButton==
    calls methods colorChange and soundOn from ==Buttons== class


```

- As a user, I want to start a new game.

```

create a new button called ==startButton==
add a mouse click listener event to ==startButton==

create a function called ==startGame==
    hides ==startButton==
    hides ==nextLevel==
    hides ==endGame==
    call ==levelSequence==
call ==startGame== in startButton mouse click event

```

- As a user, I want the game to have a random sequence of buttons to press.

```

create a function ==orderSequence==
    randomly select a button
    while a button is selected
        call ==runButton==


```

- As a user, I want to know which button to press indicated by a unique color and sound.

```

for every button clicked,
    call ==runButton==

```

- As a user, I want each consecutive level to add another button onto the game's sequence.

```

create an empty array called ==gameSequence== to store new additions to the game order sequence

create a function called ==levelSequence==
    for each level (with level ten as the minimum and level ten as the max),
        hides ==nextLevel== button
        call ==orderSequence==
        multiply the number of times ==orderSequence== is called by the current level number
        store each newly formed, incremented order sequence in gameSequence
        
create an empty array called ==buttonsPressed== to store new additions to the user's order sequence

create a hidden button called ==nextLevel==
create a mouse click listener event for ==nextLevel==

create a function called ==levelUp==
    increments the displayed level number on the screen
    calls ==levelSequence==

if ==nextLevel== button is clicked,
    call ==levelUp==

create a new function called ==checkSequence==
    if the value from the buttonsPressed array is equal to the value of the buttonsPressed array,
        return an increment of the index number in both arrays
    else if all values of the buttonsPressed array equals all values of the gameSequence array,
        display ==nextLevel== button
    if else,
        call ==error==

when a button is clicked,
    add the button pressed to the ==buttonsPressed== array
    call ==checkSequence==

```

- As a user, I want to know if I pushed the wrong button.

```

create a variable called ==errorNoise==
set value of ==errorNoise== as "error noise" sound bite

create a new function called ==error==
    if user presses a button that is not in ==orderSequence==
        call ==youLose==
    return ==errorNoise==

```

- As a user, I want the game to end after level 10 or pressing the wrong button.

```

create a hidden button called ==endGame==
create a mouse click listener event for ==endGame==

create a function called ==reset==
    set ==buttonsPressed== array to empty array
    set ==gameSequence== array to empty array
    set the level number to one

```

- As a user, I want to know if I've won or lost.

```

create a function called ==youWin==
    display prompt that reads "You win!"

create a new function called ==winning==
    if user presses every button in ==orderSequence==
        call ==youWin==

create a function called ==youLose==
    display prompt that reads "You Lost!"

```