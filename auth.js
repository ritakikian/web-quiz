const predefinedUsers = [
    { email: "admin@quiz.com", password: "admin123", role: "admin", scores: [] },
    { email: "user1@quiz.com", password: "user123", role: "user", scores: [] },
    { email: "user2@quiz.com", password: "user123", role: "user", scores: [] },
    { email: "user3@quiz.com", password: "user123", role: "user", scores: [] }
  ];
  
  function initUsers() {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(predefinedUsers));
    }
  }
  initUsers();

  const loginCard = document.getElementById("loginCard");
  const signupCard = document.getElementById("signupCard");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");
  
  if (showRegister) {
    showRegister.onclick = () => {
      loginCard.classList.add("hidden");
      signupCard.classList.remove("hidden");
    };
  }
  
  if (showLogin) {
    showLogin.onclick = () => {
      signupCard.classList.add("hidden");
      loginCard.classList.remove("hidden");
    };
  }
  
  const registerBtn = document.getElementById("registerBtn");
  if (registerBtn) {
    registerBtn.onclick = () => {
      const email = document.getElementById("registerEmail").value.trim();
      const password = document.getElementById("registerPassword").value.trim();
      const confirm = document.getElementById("confirmPassword").value.trim();
  
      if (!email || !password || !confirm) {
        alert("Please fill all fields.");
        return;
      }
  
      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.find(u => u.email === email);
  
      if (exists) {
        alert("User already exists.");
        return;
      }
  
      users.push({ email, password, role: "user", scores: [] });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully. You can now log in.");
      signupCard.classList.add("hidden");
      loginCard.classList.remove("hidden");
    };
  }

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.onclick = () => {
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);
  
      if (!user) {
        alert("Invalid credentials.");
        return;
      }
  
      localStorage.setItem("loggedInUser", JSON.stringify(user));
  
      if (user.email === "admin@quiz.com" && user.password === "admin123") {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "home.html";
      }
    };
  }
  