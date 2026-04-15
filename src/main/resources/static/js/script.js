document.addEventListener("DOMContentLoaded", () => {

  const loginForm   = document.getElementById("loginForm");
  const emailInput  = document.getElementById("email");
  const passInput   = document.getElementById("password");
  const emailGroup  = document.getElementById("emailGroup");
  const passGroup   = document.getElementById("passGroup");
  const submitBtn   = document.getElementById("submitBtn");
  const btnText     = document.getElementById("btnText");

  // --- FORM SUBMIT ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    clearError(emailGroup);
    clearError(passGroup);

    // Email validation
    if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
      showError(emailGroup);
      valid = false;
    }

    // Password validation
    if (!passInput.value.trim()) {
      showError(passGroup);
      valid = false;
    }

    // If valid → simulate login
    if (valid) {
      setLoading(true);

      setTimeout(() => {
        // ✅ Correct path
        window.location.href = "/index.html";
      }, 1200);
    }
  });

  // Remove errors on typing
  emailInput.addEventListener("input", () => clearError(emailGroup));
  passInput.addEventListener("input",  () => clearError(passGroup));

  // --- FUNCTIONS ---
  function showError(group) {
    group.classList.add("has-error");
  }

  function clearError(group) {
    group.classList.remove("has-error");
  }

  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.classList.add("loading");
      btnText.textContent = "Signing in...";
    } else {
      submitBtn.classList.remove("loading");
      btnText.textContent = "Sign in";
    }
  }

});