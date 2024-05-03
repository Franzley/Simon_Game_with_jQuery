const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

// State
var isStarted = false;
var level = 0;

////////////////////////////////////////
//                                    //
//            Start Game              //
//                                    //
////////////////////////////////////////
$(".play-btn").on("click", () => {
  // If the game has started remove the play button and start level 1
  if (!isStarted) {
    $(".play-btn").toggleClass("is-running");
    nextSequence();
    $("h1").text("Level 1");
    isStarted = !isStarted;
  }
});

////////////////////////////////////////
//                                    //
// FUNCTIONS FOR SOUNDS AND ANIMATION //
//                                    //
////////////////////////////////////////
const playSound = (sound) => {
  var audio = new Audio(`./sounds/${sound}.mp3`);
  audio.play();
};

const playAnimation = (animate) => {
  $(`#${animate}`).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
};

const animatePress = (currentColour) => {
  $(`.${currentColour}`).addClass("pressed");
  // remove class after 100ms
  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
};

////////////////////////////////////////
//                                    //
//         Player BTN Clicks          //
//                                    //
////////////////////////////////////////
$(".btn").on("click", (e) => {
  // current button user is interacting with
  const userChosenColour = $(e.target).attr("id");
  userClickedPattern.push(userChosenColour);

  // Check each input validity
  let index = userClickedPattern.length - 1;
  checkAnswer(index);

  playSound(userChosenColour);
  playAnimation(userChosenColour);
  animatePress(userChosenColour);
});

////////////////////////////////////////
//                                    //
//       Verify Correct Pattern       //
//                                    //
////////////////////////////////////////
const checkAnswer = (lastAnswer) => {
  if (isStarted) {
    // Only if each input is correct, move on
    if (userClickedPattern[lastAnswer] === gamePattern[lastAnswer]) {
      // If both arrays contain the same value, start the next level
      if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Start Over?");

      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }
};

////////////////////////////////////////
//                                    //
//             Next Level             //
//                                    //
////////////////////////////////////////
nextSequence = () => {
  // Each level clears the user pattern
  userClickedPattern.length = 0;
  level += 1;
  $(".follow-pattern").addClass('is-running')
  $("h1").text(`Level ${level}`);

  // Choose a random number out of 4 values ' 0 - 3 '
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Repeat the previous pattern on each new level

  gamePattern.forEach((pattern, index) => {
    setTimeout(function () {
      playAnimation(pattern);
      playSound(pattern);
      animatePress(pattern);

      // If pattern finishes, let player know it's their turn
      if (index === gamePattern.length - 1) {
        setTimeout(function () {
          $(".follow-pattern").removeClass('is-running')
        }, 500);
      }
    }, 500 * index);
  });
};

////////////////////////////////////////
//                                    //
//             Start Over             //
//                                    //
////////////////////////////////////////
const startOver = () => {
  // Reset all starting values
  $(".play-btn").toggleClass("is-running").text("Start Over");
  $(".follow-pattern").addClass('is-running')
  isStarted = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
};
