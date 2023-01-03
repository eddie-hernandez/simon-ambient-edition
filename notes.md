# SIMON (SAYS)

*revisit 1994 - 1998 simon? chaotic simon?*

"Simon's a computer, Simon has a brain, you either do what Simon says or else go down the drain (1994-1998)"


Breakdown:

In Simon, there are four color buttons (four identical caved in trapezoids) [in clockwise order from top left]:
    - Green
    - Red
    - Blue
    - Yellow

(getting the right trapezoid shapes may be a version 2 or 3 thing)



the logo "SIMON" is in the center of the game board
a power on/start button is placed above the logo

when the power button is pressed, a startup sequence
is initiated where a startup sound starts playing as well as the buttons flash in a specific clockwise order as follows:

# STARTUP SEQUENCE (VERSION 2/3):

- red -> blue -> yellow -> green
- red -> blue -> yellow -> green
(this sequence runs a total of TWO times, one second flash per button)

AFTER the individual button sequence repeats,
- all buttons flash simultaneously THREE TIMES
(one second per button flash)

# GAME ON (AFTER STARTUP SEQUENCE) (VERSION 1):

after initiating the startup sequence, if the player does not physically click/push a button, the following sequence happens:

the green button will blink NO MORE THAN TEN times (one button blink representing one second).


# SPECIAL TUTORIAL SEQUENCE (VERSION 3):

when SIMON is on, and as the green button is blinking its 10 times, the user can hold the button for three seconds and have a special tutorial sequence initiate!

as sequence initiates:

*SPECIAL TUTORIAL SEQUENCE SOUND BITE PLAYS*


a special tutorial initiate happens (very similar to the startup sequence, but much faster, maybe 0.25 seconds for each button):

red -> blue -> yellow -> green 
*BUTTONS FLASH (NO SOUND)*

*ALL BUTTONS FLASH SIMULTANEOUSLY TWICE*
*SOUND BITE PLAYS AS BUTTONS FLASH SIMULTANEOUSLY*

*GREEN BUTTON FLASHES QUICKLY 5 TIMES*
*GREEN BUTTON START INDICATOR SOUND BITE PLAYS QUICKLY(ALONG WITH THE FLASHING)*


# PLAYING THE GAME

the user presses the flashing green button to start playing the game.

the flashing green start button IS NOT the initial sequence starter in the actual game.
the initial sequence start button can be any of the four buttons!

e.g. press green button to play, then yellow (example button) flashes/sounds as the first button needed to be pressed (level 1)

before becoming a fair play button, the green button in the beginning is simply there to indicate
where the user needs to press in order to begin the game sequence.



# FAILING THE GAME / FAIL SEQUENCE:

pressing the wrong button activates the brief FAIL SEQUENCE:

all three buttons simulatenously QUICK FLASH as a special ERROR sound plays along with it

about 1-2 seconds pass before all buttons individually QUICK FLASH and sound in order from:

green -> red -> blue -> yellow


# GAME RESTART:

the game automatically restarts on its own after a user fails to press the right button on a given sequence.

similar to the special tutorial sequence, the green button does the following to indicate where to initiate the game again:

*GREEN BUTTON FLASHES QUICKLY 5 TIMES*
*GREEN BUTTON START INDICATOR SOUND BITE PLAYS QUICKLY(ALONG WITH FLASHING)*


# WINNING THE GAME:

to win the game of Simon, the user must successfully memorize and pass a total 32 sequences by pressing the correct buttons in order as requested.

winning unlocks a win jingle sequence (which is way longer than needs to be and will be a version 3 idea for sure)


# AUTOMATIC SHUTOFF (VERSION 2/3):

if SIMON is left idle, after ten green button blinks/seconds, a special automatic shutoff AUDIO sound sets off and the ENTIRE GAME powers down.



YOU CANNOT TURN OFF THE GAME BY PRESSING THE TURN ON BUTTON. YOU CAN ONLY TURN THE GAME ON. THE GAME ONLY SHUTS OFF AUTOMATICALLY AFTER THE PARAMETERS FOR STARTING THE AUTOMATIC SHUTOFF SEQUENCE ARE MET (LEAVING THE GAME ALONE FOR TEN SECONDS)





ASSETS SO FAR:

# Sounds:
STARTUP SEQUENCE SOUND BITE
AUTOMATIC SHUTOFF FALLBACK SOUND BITE
ERROR NOISE
RED BUTTON NOISE
BLUE BUTTON NOISE
YELLOW BUTTON NOISE
GREEN BUTTON NOISE

# Buttons:
RED
GREEN
YELLOW
BLUE

# FLASH TYPES (PER SECOND):
NORMAL FLASH - 1 SECOND
QUICK FLASH - 0.25 SECONDS




version 2 ideas:




version 3 ideas:
- color-blind mode for color-blind users
- tracks wins and losses
- enable hard mode (0.5 seconds faster)
- being able to choose how many rounds the player wants to do (up to 32 like the original)










user stories:


MVP:
- As a user, I want four different colored button options to press.
- As a user, I want to start a new game.
- As a user, I want the game to have a random sequence of buttons to press.
- As a user, I want to know which button to press indicated by a unique color and sound.
- As a user, I want each consecutive level to add another button onto the game's sequence.
- As a user, I want to know if I pushed the wrong button.
- As a user, I want to win only after pressing all 10 level's sequences successfully.
- As a user, I want to know if I've won or lost.



Version 2:

- As a user, I want a button to activate when I press on it in its correct sequence order.
- As a user, I want the game board to have multiple color themes to choose from.
- As a user, I want the game to end after 5 seconds of inactivity.
- As a user, I want the game to play a special shutoff sound bite that only plays if the game ends due to inactivity.
- As a user, I want the game to have a color-sensitivity mode.




Version 3:
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








Pseudocode Breakdown

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