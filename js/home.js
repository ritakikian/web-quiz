const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  window.location.href = "index.html";
} else {
  document.getElementById("userEmail").textContent = loggedInUser.email;
}

const quizItems = document.querySelectorAll(".quiz-list li");

quizItems.forEach(item => {
  item.addEventListener("click", () => {
    const topic = item.getAttribute("data-topic");
    localStorage.setItem("selectedQuiz", topic);
    window.location.href = "quiz.html";
  });
});
