// Sample questions per topic
const quizData = {
    HTML: [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
      },
      {
        question: "Which tag creates a hyperlink?",
        options: ["<a>", "<link>", "<href>"],
        answer: "<a>"
      },
      {
        question: "Which tag is used to define a paragraph?",
        options: ["<p>", "<para>", "<text>"],
        answer: "<p>"
      }
    ],
    CSS: [
      {
        question: "Which property controls text color?",
        options: ["font", "color", "text-style"],
        answer: "color"
      },
      {
        question: "What does CSS stand for?",
        options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
      },
      {
        question: "Which symbol is used for IDs?",
        options: [".", "#", "*"],
        answer: "#"
      }
    ],
    JavaScript: [
      {
        question: "Which keyword declares a variable?",
        options: ["var", "set", "int"],
        answer: "var"
      },
      {
        question: "What is '===’ in JS?",
        options: ["Assignment", "Equal value", "Strict equality"],
        answer: "Strict equality"
      },
      {
        question: "Which method adds an element to the end of an array?",
        options: ["add()", "push()", "append()"],
        answer: "push()"
      }
    ],
    PHP: [
      {
        question: "What does PHP stand for?",
        options: ["Personal Hypertext Processor", "PHP: Hypertext Preprocessor", "Private Hosting Platform"],
        answer: "PHP: Hypertext Preprocessor"
      },
      {
        question: "Which symbol starts a variable in PHP?",
        options: ["@", "#", "$"],
        answer: "$"
      },
      {
        question: "Which function outputs data?",
        options: ["say()", "write()", "echo"],
        answer: "echo"
      }
    ],
    SQL: [
      {
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Strong Question Language", "Simple Query List"],
        answer: "Structured Query Language"
      },
      {
        question: "Which keyword is used to retrieve data?",
        options: ["GET", "SELECT", "PULL"],
        answer: "SELECT"
      },
      {
        question: "Which SQL statement updates data?",
        options: ["MODIFY", "UPDATE", "CHANGE"],
        answer: "UPDATE"
      }
    ]
  };
  
  // Load topic
  const topic = localStorage.getItem("selectedQuiz");
  const title = document.getElementById("quizTitle");
  const container = document.getElementById("questionsContainer");
  const form = document.getElementById("quizForm");
  const resultBox = document.getElementById("resultBox");
  const scoreDisplay = document.getElementById("scoreDisplay");
  
  if (!topic || !quizData[topic]) {
    title.textContent = "Quiz Not Found";
    form.remove();
  } else {
    title.textContent = `Quiz: ${topic}`;
  
    quizData[topic].forEach((q, index) => {
      const block = document.createElement("div");
      block.classList.add("question-block");
  
      const questionText = document.createElement("p");
      questionText.textContent = `${index + 1}. ${q.question}`;
      block.appendChild(questionText);
  
      q.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q${index}`;
        input.value = option;
        label.appendChild(input);
        label.append(" " + option);
        block.appendChild(label);
      });
  
      container.appendChild(block);
    });
  }
  
  // Handle submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userAnswers = [];
  
    quizData[topic].forEach((q, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      userAnswers.push(selected ? selected.value : null);
    });
  
    let score = 0;
    userAnswers.forEach((answer, i) => {
      if (answer === quizData[topic][i].answer) score++;
    });
  
    // Show score
    scoreDisplay.textContent = score;
    resultBox.classList.remove("hidden");
  
    // Save score to user
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const updatedUsers = users.map(u => {
      if (u.email === loggedInUser.email) {
        u.scores.push({ topic, score });
        localStorage.setItem("loggedInUser", JSON.stringify(u));
      }
      return u;
    });
  
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  });
  