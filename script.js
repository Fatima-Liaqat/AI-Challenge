document.addEventListener('DOMContentLoaded', () => 
{
  // Questions
  const questions = 
  [
    {
        question: "What does AI stand for?",
        options: ["Automated Interface", "Artificial Intelligence", "Advanced Integration", "Analog Input"],
        answer: 1
    },
    {
        question: "Which of the following is an example of AI?",
        options: ["A calculator", "Google Maps", "A bicycle", "A text editor"],
        answer: 1
    },
    {
        question: "What is training data used for in machine learning?",
        options: ["To fix bugs", "To decorate charts", "To teach the model", "To clean the code"],
        answer: 2
    },
    {
        question: "Which one is a type of Machine Learning?",
        options: ["Supervised Learning", "Directed Drawing", "Database Sorting", "Input Tuning"],
        answer: 0
    },
    {
        question: "In supervised learning, what is provided to the model?",
        options: ["Only inputs", "No data", "Inputs and correct outputs", "Random numbers"],
        answer: 2
    },
    {
        question: "Which programming language is most popular for AI?",
        options: ["HTML", "Python", "CSS", "SQL"],
        answer: 1
    },
    {
        question: "What is a neural network inspired by?",
        options: ["Computer chips", "Human brain", "Airplanes", "Libraries"],
        answer: 1
    },
    {
        question: "What does the term 'model' mean in AI?",
        options: ["A fashion design", "A finished website", "A mathematical representation of learning", "An input file"],
        answer: 2
    },
    {
        question: "Which of these tasks can AI perform?",
        options: ["Image recognition", "Washing dishes", "Breathing", "Melting plastic"],
        answer: 0
    },
    {
        question: "What is the goal of machine learning?",
        options: ["To memorize data", "To predict or classify using patterns in data", "To write essays", "To delete information"],
        answer: 1
    }
  ];
  //Shuffle
  function shuffleArray(arr) 
  {
    for (let i = arr.length - 1; i > 0; i--) 
    {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // DOM Elements
  const startPage = document.getElementById("start_page");
  const quizInterface = document.getElementById("quiz_interface");
  const resultPage = document.getElementById("result_page");

  const startBtn = document.querySelector(".start");
  const questionBox = document.getElementById("question_box");
  const optionsBox = document.getElementById("option_box");
  const submitBtn = document.getElementById("submit_button");
  const nextBtn = document.getElementById("next-button");
  const answerInfo = document.getElementById("answer_info");
  const scoreResult = document.getElementById("score_result");
  const tryAgainBtn = document.getElementById("try_again");
  const currentScoreEl = document.getElementById("current_score");
  const timerEl = document.getElementById("timer");
  const questionNumberEl = document.getElementById("question_number");


  let shuffledQuestions = [];
  let currentQuestion = 0;
  let selectedOption = null;
  let score = 0;
  let timer;
  let totalTime = 120; 
  let timeTaken = 0;

  // Start Quiz
  startBtn.addEventListener("click", () => 
  {
    startPage.style.display = "none";
    quizInterface.style.display = "block";
    resultPage.style.display = "none";
    shuffledQuestions = shuffleArray([...questions]);
    currentQuestion = 0;
    score = 0;
    timeTaken = 0;
    clearInterval(timer);
    updateScoreDisplay();
    startTimer();
    loadQuestion();
  }); 
  
  // Update Score
  function updateScoreDisplay() 
  {
    currentScoreEl.textContent = `Score: ${score}/${shuffledQuestions.length}`;
  }

  // Load question
  function loadQuestion() 
  {
    const q = shuffledQuestions[currentQuestion];
    questionNumberEl.textContent = `Question ${currentQuestion + 1} / ${shuffledQuestions.length}`;

    questionBox.textContent = q.question;
    optionsBox.innerHTML = "";
    answerInfo.textContent = "";
    selectedOption = null;

    q.options.forEach((option, index) => 
    {
      const div = document.createElement("div");
      div.classList.add("option");
      div.textContent = option;
      div.addEventListener("click", () => 
      {
        document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
        div.classList.add("selected");
        selectedOption = index;
      });
      optionsBox.appendChild(div);
    });

    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
  }

  // Submit answer
  submitBtn.addEventListener("click", () => 
  {
    if (selectedOption === null) 
    {
      alert("Please select an answer before submitting.");
      return;
    }

    const q = shuffledQuestions[currentQuestion];
    const optionDivs = document.querySelectorAll(".option");

    optionDivs.forEach((div, index) => 
    {
      div.classList.remove("selected");
      if (index === selectedOption) 
      {
        div.classList.add(index === q.answer ? "correct" : "incorrect");
      }
    });

    if (selectedOption === q.answer) 
    {
      score++;
      answerInfo.textContent = "Correct!";
      answerInfo.style.color = "green";
    } 
    else 
    {
      answerInfo.textContent = `Wrong! The correct answer was: ${q.options[q.answer]}`;
      answerInfo.style.color = "red";
    }

    updateScoreDisplay();
    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
  });

  // Next question
  nextBtn.addEventListener("click", () => 
  {
    currentQuestion++;
    if (currentQuestion < shuffledQuestions.length) 
    {
      loadQuestion();
    } 
    else 
    {
      endQuiz();
    }
  });

  // Timer
  function startTimer() 
  {
    timer = setInterval(() => 
    {
      totalTime--;
      timeTaken++;
      updateTimerDisplay();

      if (totalTime <= 0) 
      {
        clearInterval(timer);
        endQuiz(true);
      }
    }, 1000);
  }

  function updateTimerDisplay() 
  {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timerEl.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // End Quiz
  function endQuiz(timeUp = false) 
  {
    clearInterval(timer);
    quizInterface.style.display = "none";
    resultPage.style.display = "block";
    tryAgainBtn.style.display = 'inline-block';
    const percentage = ((score / shuffledQuestions.length) * 100).toFixed(2);
    const minutesTaken = Math.floor(timeTaken / 60);
    const secondsTaken = timeTaken % 60;

    scoreResult.innerHTML = `
    Total Correct Answers:  ${score}<br>
    Percentage: ${percentage}%<br>
    ${timeUp ? "Time ran out!" : "Time taken:"} ${minutesTaken}m ${secondsTaken}s`;
  }

  // Try again
  tryAgainBtn.addEventListener("click", () => 
  {
    resultPage.style.display = "none";
    startPage.style.display = "none"; 
    quizInterface.style.display = "block"; 

  
    shuffledQuestions = shuffleArray([...questions]); 
    currentQuestion = 0;
    score = 0;
    timeTaken = 0;
    totalTime = 120; 

    updateScoreDisplay();
    clearInterval(timer);
    startTimer();
    loadQuestion();

  });
});