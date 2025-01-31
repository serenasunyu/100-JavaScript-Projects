const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

/**
 * Detect when a key is pressed to start the game.
*/
$(document).keypress(() => {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    };  
});

/**
 * Generate the next color in the sequence.
 * Update the level, reset user input, and plays the animation & sound.
*/
function nextSequence() {
    let randomIndex = Math.floor(Math.random() * 4); // index 0 - 3
    let randomChosenColour = buttonColours[randomIndex];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = []; // reset user pattern for the new level
};

/** 
 * Handle user clicks.
 * Stores user choices, play sound, triggers animation, and checks the answer.
 * Cannot use arrow function here, because arrow functions do not have
 * their own this
*/

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

/** 
 * Plays the corresponding sound for a given color.
 * @param {string} color -- the name of the color.
*/
function playSound(color) {
    let sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
    
};

/**
 * Triggers the button press animation.
 * @param {string} currentColour - The color of the button to animate.
 */

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

/**
 * Check if the user's sequence matches the game squence.
 * Ends game if wrong, otherwise proceeds to the next sequence if correct.
 * @param {number} currentLevel - The current step in the squence.
 */
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        handleGameOver();
    }
};

/**
 * Handles game over scenario: plays error sound, applies animation, and resets game.
 */
function handleGameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    restartGame();
};

/**
 * Resets game variables to restart from level 0.
 */
function restartGame() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
};