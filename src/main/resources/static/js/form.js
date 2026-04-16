const MOCK_MODE = true;


document.addEventListener("DOMContentLoaded", () => {

  const jobForm   = document.getElementById("jobForm");
  const submitBtn = document.getElementById("submitBtn");

  // --- FORM SUBMIT ---
  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // grab values from the form fields
    const jobTitle   = document.getElementById("jobTitle").value.trim();
    const company    = document.getElementById("company").value.trim();
    const location   = document.getElementById("location").value.trim();
    const appliedDate = document.getElementById("appliedDate").value;
    const status     = document.getElementById("status").value;
    const notes      = document.getElementById("notes").value.trim();

    // basic validation — title, company, status are required
    if (!jobTitle || !company || !status) {
      if (!jobTitle) highlightEmpty("jobTitle");
      if (!company)  highlightEmpty("company");
      if (!status)   highlightEmpty("status");
      return;
    }

    // build the object that matches your Job entity exactly
    const jobData = {
      title:       jobTitle,
      company:     company,
      location:    location    || null,
      appliedDate: appliedDate || null,
      status:      status,
    };

    // loading state
    submitBtn.textContent = "Saving...";
    submitBtn.classList.add("loading");

    if (MOCK_MODE) {
      // === MOCK: just fake a 800ms delay then show success ===
      await delay(800);
      showToast();
      setTimeout(() => { window.location.href = "index.html"; }, 1500);

    } else {
      // === REAL: POST to your Spring Boot backend ===
      try {
        const res = await fetch("/api/jobs", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(jobData),
        });

        if (res.ok) {
          showToast();
          setTimeout(() => { window.location.href = "index.html"; }, 1500);
        } else {
          alert("Couldn't save job. Server said: " + res.status);
          resetButton();
        }

      } catch (err) {
        console.error("Submit failed:", err);
        alert("Something went wrong. Is the backend running?");
        resetButton();
      }
    }
  });


  // --- CLEAR ERROR GLOW WHEN USER TYPES ---
  // so the red border goes away as soon as they fix it
  ["jobTitle", "company", "status"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input",  () => el.classList.remove("input-error"));
      el.addEventListener("change", () => el.classList.remove("input-error"));
    }
  });

});


// --- HELPER: flash a red border on an empty required field ---
function highlightEmpty(fieldId) {
  const el = document.getElementById(fieldId);
  if (!el) return;
  el.classList.add("input-error");
  // shake animation — feels nice
  el.style.animation = "shake 0.3s ease";
  setTimeout(() => { el.style.animation = ""; }, 300);
}


// --- HELPER: show the green success toast at the bottom ---
function showToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "block";
}


// --- HELPER: reset the submit button to its original state ---
function resetButton() {
  const btn = document.getElementById("submitBtn");
  btn.textContent = "Save Application";
  btn.classList.remove("loading");
}


// --- HELPER: simple promise-based delay (for mock mode) ---
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/* inline style for the error shake + red border —
   added here so you don't need extra CSS */
const errorStyle = document.createElement("style");
errorStyle.textContent = `
  .input-error {
    border-color: rgba(220, 38, 38, 0.6) !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12) !important;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-5px); }
    75%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(errorStyle);