const MOCK_MODE = true;

document.addEventListener("DOMContentLoaded", () => {

  const jobForm   = document.getElementById("jobForm");
  const submitBtn = document.getElementById("submitBtn");

  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jobTitle   = document.getElementById("jobTitle").value.trim();
    const company    = document.getElementById("company").value.trim();
    const location   = document.getElementById("location").value.trim();
    const appliedDate = document.getElementById("appliedDate").value;
    const status     = document.getElementById("status").value;

    if (!jobTitle || !company || !status) {
      if (!jobTitle) highlightEmpty("jobTitle");
      if (!company)  highlightEmpty("company");
      if (!status)   highlightEmpty("status");
      return;
    }

    const jobData = {
      title:       jobTitle,
      company:     company,
      location:    location || null,
      appliedDate: appliedDate || null,
      status:      status,
    };

    submitBtn.textContent = "Saving...";
    submitBtn.classList.add("loading");

    if (MOCK_MODE) {
      await delay(800);
      showToast();
      setTimeout(() => { window.location.href = "/index.html"; }, 1500);

    } else {
      try {
        const res = await fetch("/api/jobs", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(jobData),
        });

        if (res.ok) {
          showToast();
          setTimeout(() => { window.location.href = "/index.html"; }, 1500);
        } else {
          alert("Couldn't save job");
          resetButton();
        }

      } catch (err) {
        console.error(err);
        alert("Backend not working");
        resetButton();
      }
    }
  });

  ["jobTitle", "company", "status"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input",  () => el.classList.remove("input-error"));
      el.addEventListener("change", () => el.classList.remove("input-error"));
    }
  });

});

function highlightEmpty(id) {
  const el = document.getElementById(id);
  el.classList.add("input-error");
  el.style.animation = "shake 0.3s ease";
  setTimeout(() => el.style.animation = "", 300);
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "block";
}

function resetButton() {
  const btn = document.getElementById("submitBtn");
  btn.textContent = "Save Application";
  btn.classList.remove("loading");
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* inline styles */
const style = document.createElement("style");
style.textContent = `
  .input-error {
    border-color: rgba(220,38,38,0.6) !important;
    box-shadow: 0 0 0 3px rgba(220,38,38,0.12) !important;
  }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);