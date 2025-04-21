const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userList = document.getElementById("userList");

if (!loggedInUser || loggedInUser.email !== "admin@quiz.com") {
  window.location.href = "index.html";
} else {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");

    const name = document.createElement("h4");
    name.textContent = user.email;
    card.appendChild(name);

    const scoreList = document.createElement("ul");

    if (user.scores.length === 0) {
      const none = document.createElement("li");
      none.textContent = "No quizzes taken yet.";
      scoreList.appendChild(none);
    } else {
      user.scores.forEach(score => {
        const item = document.createElement("li");
        item.textContent = `${score.topic}: ${score.score}/3`;
        scoreList.appendChild(item);
      });
    }

    card.appendChild(scoreList);
    userList.appendChild(card);
  });
}
