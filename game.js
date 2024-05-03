const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

let isStarted = false;
var level = 0;

$("html").on("keypress", () => {
  isStarted = !isStarted;
  if (isStarted) {
    nextSequence();

    $("h1").text("Level 1");
  }
});

const playSound = (sound) => {
  var audio = new Audio(`./sounds/${sound}.mp3`);
  audio.play();
};

const playAnimation = (animate) => {
  $(`#${animate}`).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
};

const animatePress = (currentColour) => {
  $(`.${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`.${currentColour}`).removeClass("pressed");
  }, 100);
};

nextSequence = () => {
  level += 1;
  $("h1").text(`Level ${level}`);
  randomNumber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  gamePattern.forEach((pattern, index) => {
    setTimeout(function () {
      playAnimation(pattern);

      playSound(pattern);

      animatePress(pattern);
    }, 500 * index);
  });
};

const checkAnswer = (lastAnswer) => {
  if (userClickedPattern[lastAnswer] === gamePattern[lastAnswer]) {
    console.log("success");
  } else {
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if (isStarted) {
    if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)) {
      setTimeout(() => {
        userClickedPattern.length = 0;
        nextSequence();
      }, 1000);
    }
  }
};

const startOver = () => {
  isStarted = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
};

$(".btn").on("click", (e) => {
  const selectedColor = e.target;
  const userChosenColour = $(selectedColor).attr("id");
  userClickedPattern.push(userChosenColour);

  let index = userClickedPattern.length - 1;
  checkAnswer(index);

  console.log(index);

  playAnimation(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
});
