 const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris",
      },
      // ... other questions ...
    ];

    const userAnswers = [];

    function renderQuestions() {
      const questionsElement = document.getElementById("questions");
      questionsElement.innerHTML = ""; // Clear previous questions

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);

        for (let j = 0; j < question.choices.length; j++) {
          const choice = question.choices[j];
          const choiceElement = document.createElement("input");
          choiceElement.setAttribute("type", "radio");
          choiceElement.setAttribute("name", `question-${i}`);
          choiceElement.setAttribute("value", choice);

          if (userAnswers[i] === choice) {
            choiceElement.setAttribute("checked", true);
          }

          const choiceText = document.createTextNode(choice);
          questionElement.appendChild(choiceElement);
          questionElement.appendChild(choiceText);
        }

        questionsElement.appendChild(questionElement);   

      }
    }

    function saveProgress() {
      sessionStorage.setItem("quizProgress", JSON.stringify(userAnswers));
    }

    function loadProgress() {
      const savedProgress = sessionStorage.getItem("quizProgress");
      if (savedProgress) {
        userAnswers = JSON.parse(savedProgress);
        renderQuestions();
      }
    }

    function submitQuiz() {
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
          score++;
        }
      }

      alert(`Your score is ${score} out of ${questions.length}`);

      // Store score in local storage
      localStorage.setItem("quizScore", score);
    }

    // Load saved progress on page load
    loadProgress();

    // Save progress on input change
    document.addEventListener("input", () => {
      saveProgress();
    });

    // Submit quiz on button click
    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", submitQuiz);