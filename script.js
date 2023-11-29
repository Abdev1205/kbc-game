
//* this is question array and in producation we can also any api 
const questions = [
  {
    text: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    correctAnswer: "Paris"
  },
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    text: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  },
  {
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Leo Tolstoy"],
    correctAnswer: "William Shakespeare"
  },
  {
    text: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Ringgit"],
    correctAnswer: "Yen"
  },
  {
    text: "Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Iron", "Silver"],
    correctAnswer: "Oxygen"
  },
  {
    text: "In which year did World War II end?",
    options: ["1943", "1945", "1950", "1960"],
    correctAnswer: "1945"
  },
  {
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    text: "Which country is known as the 'Land of the Rising Sun'?",
    options: ["China", "South Korea", "Japan", "Vietnam"],
    correctAnswer: "Japan"
  },
  {
    text: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Ernest Hemingway"],
    correctAnswer: "Harper Lee"
  },
  {
    text: "What is the largest desert in the world?",
    options: ["Sahara Desert", "Arctic Desert", "Gobi Desert", "Antarctic Desert"],
    correctAnswer: "Antarctic Desert"
  },
  {
    text: "Which gas makes up the majority of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Nitrogen"
  },
  {
    text: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Stephen Hawking"],
    correctAnswer: "Albert Einstein"
  },
  {
    text: "Which planet is known as the 'Blue Planet'?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Earth"
  },
  {
    text: "Who is the author of '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: "George Orwell"
  }
];

//* this is prize array and in producation we can also any api 
const prizes = [
  "1,000", "2,000", "3,000", "5,000", "10,000", "20,000", "40,000", "80,000",
  "1,60,000", "3,20,000", "6,40,000", "12,50,000", "25,00,000", "50,00,000",
  "1 Crore", "7 Crore"
];


//^ this is going to global variable accross the script file
let currentQuestionIndex = 0;

//& this function will {currentQuestionIndex} as argument and give difficulty Level 
// this will used when we are setting music and timer accorindg to difficulty level 
function getDifficultyLevel(currentQuestionIndex) {
  if (currentQuestionIndex < 4) {
    return "easy";
  } else if (currentQuestionIndex < 10) {
    return "medium";
  } else {
    return "hard";
  }
}

//& this funcation will be used for diplaying question with their respective option  

function displayQuestion() {
  if (currentQuestionIndex > 15) {
    displayFinalResult()
  }
  playMusic("play");
  setTimeout(() => {
    displayPrizes(currentQuestionIndex, prizeIterator)
    const initialDifficulty = getDifficultyLevel(currentQuestionIndex);
    playMusic(initialDifficulty);
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.text;

    const optionsList = document.getElementById("option-container");
    optionsList.style.visibility = "visible";
    optionsList.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
      const optionHTML = `
      <div id="option" class="option common-option" data-option="${option}">
        ${String.fromCharCode(65 + index)}: <span id="option-span"class="option-span" >${option}</span>
        <span id="audience-percenatage" ></span>
      </div>
    `;
      optionsList.innerHTML += optionHTML;
    });

    startTimer(); // Start the timer

    optionsList.addEventListener("click", (event) => {
      const clickedOption = event.target.closest(".common-option");
      if (clickedOption && !clickedOption.classList.contains("option-selected")) {
        const selectedOption = clickedOption.dataset.option;

        // Add class to highlight selected option
        clickedOption.classList.add("option-selected");

        // Play selected music
        playMusic("selected");

        // Delay for 3 seconds before moving to the next question
        clearInterval(timer);
        setTimeout(() => {
          checkAnswer(selectedOption);

        }, 3000);
      }
    });
  }, 3000);

}

//& this funcation is loaded when quiz.html loaded so that user can see play quiz
function quizLoaded() {
  startQuiz()
}

//& this function is handling form submission in index.html
function userForm(event) {
  event.preventDefault();   //* Preventing the form to refresh on submit

  // Getting the user name from the input field
  const userNameInput = document.getElementById('user-name');
  const userName = userNameInput.value.trim(); // If any whitespace is there so it will trim all those

  // Checking if the user name is not empty
  // this is not required here but extra safety i added here { Nahi to meri marzi }
  if (userName !== '') {
    // Storing the user name in local storage so that i can use in any page without any state management library or framework
    localStorage.setItem('userName', userName)
    // Redirecting to quiz.html so that user can play game 
    window.location.href = 'quiz.html';
  } else {
    // Displaying an alert if the user name is empty
    alert('Please enter your name.');
  }
}

//&  this function will start the quiz
function startQuiz() {

  //* Manipulating some styles when user want to play quiz again 
  const finalResultContainer = document.getElementById("final-result-container");
  finalResultContainer.style.display = "none";
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "none";
  const optionsList = document.getElementById("option-container");
  optionsList.style.visibility = "visible";
  optionsList.innerHTML = "";
  currentQuestionIndex = 0;

  // Displaying the first question of quiz
  displayQuestion()
}

//& This function will take {userAnswer} as argument and check that option selected  by user is correct or not 
function checkAnswer(userAnswer) {
  // getting current question refrence and correct answer reference
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  // getting optionSelcted and optionCorrect refrence so that we can compare selected and correct options
  const selectedOptionElement = document.querySelector('.common-option.option-selected');
  const correctOptionElement = document.querySelector(`.common-option[data-option="${correctAnswer}"]`);

  // Adding classes to highlight correct and wrong options
  if (selectedOptionElement) {
    if (userAnswer === correctAnswer) {
      selectedOptionElement.classList.add('option-correct');
      // Playing correct answer music
      playMusic("correct");
      // Displaying results and prize
      displayResult(true, currentQuestionIndex + 1);
    } else {
      selectedOptionElement.classList.add('option-wrong');
      // Play wrong answer music
      playMusic("wrong");
      // Displaying result and correct answer
      displayResult(false, currentQuestionIndex);
      //after 6 sec will be display final result and we will ask user to play again or not
      setTimeout(() => {
        displayFinalResult()
      }, 6000)
    }
  }

  // If user answer is wrong then we also ahve to show correct answer
  if (correctOptionElement) {
    correctOptionElement.classList.add('option-correct');
  }

}

// getting result container reference to show results
const resultContainer = document.getElementById("result-container");
resultContainer.style.display = "none";



//& this funcation will take {isCorrect, questionNumber} as argument and it will display result 
function displayResult(isCorrect, questionNumber) {
  // getting result text refrence to manipulate value 
  const resultText = document.getElementById("result-text");
  // adjusting style according to isCorrect argument 
  resultText.textContent = isCorrect
    ? "Congratulations! You won " + getPrize(questionNumber)
    : "Wrong Answer!"
  resultContainer.style.display = "flex"
  resultContainer.style.background = `${isCorrect ? "#1CC700" : "#BF2200"}`
  resultContainer.style.color = `${isCorrect ? "rgba(3, 3, 3, 0.71)" : "#FFF"}`

  // If the answer is correct, then we have to move to the next question
  if (isCorrect) {
    // after 8 sec we will manipulate some styles and values to show new question 
    setTimeout(() => {
      resultContainer.style.display = "none";
      const optionsList = document.getElementById("option-container");
      optionsList.style.visibility = "hidden";
      document.getElementById("question").textContent = "Question goes here";
      const countdown = document.getElementById("timer").textContent = "0:00";
      currentQuestionIndex++;
      prizeIterator++;

      // calling display Question to show next question unitl question array is completed
      if (currentQuestionIndex < questions.length) {
        displayQuestion();

      } else {
        // Showing final result
        displayFinalResult();
      }
    }, 8000);
  }
}

//& this function will display the final result
function displayFinalResult() {
  playMusic("correct")
  const finalResultContainer = document.getElementById("final-result-container");
  finalResultContainer.style.display = "flex";

  // Displaying the user's name and final prize won by fetching local storage
  const userName = localStorage.getItem('userName');
  const finalPrize = getPrize(currentQuestionIndex);
  // manipulating user name and prizes by getting their respocetive user id
  document.getElementById("final-username").textContent = `Congratulation ${userName}`;
  document.getElementById("final-prize").textContent = `You Won ${finalPrize}`;
}

//& this function is used to get the prize based on the question number
function getPrize(questionNumber) {
  return prizes[questionNumber - 1];
}

//& this function will use global variable {currentQuestionIndex} to return duration accoring to difficulty level
function getTimerDuration() {

  if (getDifficultyLevel(currentQuestionIndex) === "easy") {
    return 30;
  }
  else if (getDifficultyLevel(currentQuestionIndex) === "medium") {
    return 60
  }
  else if (getDifficultyLevel(currentQuestionIndex) === "hard") {
    return 120
  }

  return 30; // returning deafult timer if mishaps happen
}

//&  this function will take {seconds} as argument and it will retun time in this format MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//& This function will handle all timeing related events
function startTimer() {
  const countdown = document.getElementById("timer");
  let timeRemaining = getTimerDuration();
  countdown.textContent = formatTime(timeRemaining);
  timer = setInterval(() => {
    timeRemaining--;
    countdown.textContent = formatTime(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timer);
      // Stop the timer
      const resultText = document.getElementById("result-text");
      resultText.textContent = "Timeout";
      // Play timeout music
      playMusic("wrong");
      // Display result and correct answer
      displayResult(false, currentQuestionIndex);
      setTimeout(() => {
        displayFinalResult()
      }, 6000)
    }
  }, 1000);
}




//& this function will take {type} as argument and then it will play background music and sound effects
function playMusic(type) {
  const musicContainer = document.getElementById("music-container");

  switch (type) {
    case "resign":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/resign.mp3"></audio>';
      break;
    case "play":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/lets_play.mp3"></audio>';
      break;
    case "theme":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/main_theme.mp3"></audio>';
      break;
    case "selected":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/final_answer.mp3"></audio>';
      break;
    case "hard":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/hard.mp3"></audio>';
      break;
    case "medium":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/medium.mp3"></audio>';
      break;
    case "easy":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/easy.mp3"></audio>';
      break;
    case "correct":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/correct_answer.mp3"></audio>';
      break;
    case "wrong":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/wrong_answer.mp3"></audio>';
      break;
    case "timeout":
      musicContainer.innerHTML = '<audio autoplay src="/sounds/timeout.mp3"></audio>';
      break;
  }
}



// Reversing the prizes array so that we can display from top to bottom order
const reversedPrizes = prizes.slice().reverse();

// Geting prize container refrencec
const prizesContainer = document.getElementById("prizes-container");

// using this prize iterator to finding active prizevalue
let prizeIterator = 1


//& this funcation will display prizes using for each loop 
//^ we can also use map function here 
function displayPrizes(prizeIterator) {
  // Clearing existing prizes so that we can render new updateed prizes in dom
  prizesContainer.innerHTML = '';
  reversedPrizes.forEach((prize, index) => {
    // defining special prize so giving level type styles to that element
    const isSpecialPrize = (prize === '5,000' || prize === '3,20,000' || prize === '7 Crore');
    const isActivePrize = index === prizes.length - prizeIterator - 1;
    // refrencing prize conatainer and creating h4 elelment and adding data accroding to prizes
    const prizeContainer = document.createElement('h4');
    prizeContainer.className = `prize ${isSpecialPrize ? 'special-prize' : 'normal-prize'} ${isActivePrize ? 'prize-active' : ''}`;
    if (prizeIterator >= 0) {
      prizeContainer.innerHTML = `
        <span class="prize-index">${prizes.length - index}</span>
        <span class="prize-value">${prize}</span>
      `;
      prizesContainer.appendChild(prizeContainer)
    }
  });
}

//& creating onClick eventListener on {quit-button} to ahow final result and ask user to play quiz again or not
document.getElementById('quit-button').addEventListener('click', function () {
  clearInterval(timer)
  currentQuestionIndex = 0;
  prizeIterator = 1;
  const finalResultContainer = document.getElementById("final-result-container");
  finalResultContainer.style.display = "flex";
});

//& creating onClick eventListener on {play-again} to ahow final result and ask user to play quiz again or not
document.getElementById('play-again').addEventListener('click', function () {
  playMusic("resign")
  setTimeout(() => {
    currentQuestionIndex = 0;
    prizeIterator = 1;
    const finalResultContainer = document.getElementById("final-result-container");
    finalResultContainer.style.display = "none";

    startQuiz();
  }, 6000)
});