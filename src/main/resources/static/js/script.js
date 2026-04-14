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
    e.preventDefault(); // stop the default page reload

    let valid = true;

    // clear any old errors first
    clearError(emailGroup);
    clearError(passGroup);

    // check email — must exist and have "@"
    if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
      showError(emailGroup);
      valid = false;
    }

    // check password — must not be blank
    if (!passInput.value.trim()) {
      showError(passGroup);
      valid = false;
    }

    // if both fields are good, simulate a login
    if (valid) {
      setLoading(true);

      // === REPLACE THIS with a real fetch() to /api/login later ===
      setTimeout(() => {
        // redirect to the dashboard
        window.location.href = "index.html";
      }, 1200);
      // ============================================================
    }
  });


  // --- CLEAR ERROR WHEN USER STARTS TYPING ---
  // (so errors don't just sit there forever annoying the user)
  emailInput.addEventListener("input", () => clearError(emailGroup));
  passInput.addEventListener("input",  () => clearError(passGroup));


  // --- HELPER FUNCTIONS ---

  // adds the red error state to a field wrapper
  function showError(group) {
    group.classList.add("has-error");
  }

  // removes the red error state
  function clearError(group) {
    group.classList.remove("has-error");
  }

  // swaps the button to a loading state
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