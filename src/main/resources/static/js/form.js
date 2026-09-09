const MOCK_MODE = false; // ← set true only for offline testing

document.addEventListener("DOMContentLoaded", async () => {

  // ── BUG 4 FIX: detect edit mode from URL ?id= param ──────────────────────
  const params  = new URLSearchParams(window.location.search);
  const editId  = params.get("id");
  const isEdit  = !!editId;

  if (isEdit) {
    document.querySelector(".form-title").textContent = "Edit Application";
    document.querySelector(".form-sub").textContent   = "Update the details for this job application";
    document.getElementById("submitBtn").textContent  = "Update Application";
    await loadJobForEdit(editId);
  }

  // ── FORM SUBMIT ───────────────────────────────────────────────────────────
  const jobForm   = document.getElementById("jobForm");
  const submitBtn = document.getElementById("submitBtn");

  jobForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const jobTitle    = document.getElementById("jobTitle").value.trim();
    const company     = document.getElementById("company").value.trim();
    const location    = document.getElementById("location").value.trim();
    const appliedDate = document.getElementById("appliedDate").value;
    const status      = document.getElementById("status").value;

    if (!jobTitle) highlightEmpty("jobTitle");
    if (!company)  highlightEmpty("company");
    if (!status)   highlightEmpty("status");
    if (!jobTitle || !company || !status) return;

    // BUG 5 FIX: notes field removed — Job entity has no notes column.
    // Add 'notes' to Job.java if you want to persist it.
    const jobData = {
      title:       jobTitle,
      company:     company,
      location:    location || null,
      appliedDate: appliedDate || null,
      status:      status,
    };

    submitBtn.textContent = isEdit ? "Updating..." : "Saving...";
    submitBtn.classList.add("loading");

    if (MOCK_MODE) {
      await delay(800);
      showToast(isEdit ? "✅ Job updated!" : "✅ Job added successfully!");
      setTimeout(() => { window.location.href = "/index.html"; }, 1500);
      return;
    }

    try {
      // BUG 4 FIX: use PUT for edits, POST for new entries
      const url    = isEdit ? `/api/jobs/${editId}` : "/api/jobs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(jobData),
      });

      if (res.ok) {
        showToast(isEdit ? "✅ Job updated!" : "✅ Job added successfully!");
        setTimeout(() => { window.location.href = "/index.html"; }, 1500);
      } else {
        alert("Couldn't save job. Please try again.");
        resetButton();
      }

    } catch (err) {
      console.error(err);
      alert("Network error. Is the backend running?");
      resetButton();
    }
  });

  // ── Clear error highlighting on input ─────────────────────────────────────
  ["jobTitle", "company", "status"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input",  () => el.classList.remove("input-error"));
      el.addEventListener("change", () => el.classList.remove("input-error"));
    }
  });
});

// ── BUG 4 FIX: load existing job data into form fields ───────────────────────
async function loadJobForEdit(id) {
  if (MOCK_MODE) return; // mock data not prefilled in edit mode

  try {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) throw new Error("Job not found");

    const job = await res.json();

    document.getElementById("jobTitle").value    = job.title       || "";
    document.getElementById("company").value     = job.company     || "";
    document.getElementById("location").value    = job.location    || "";
    document.getElementById("appliedDate").value = job.appliedDate || "";
    document.getElementById("status").value      = job.status      || "";

  } catch (err) {
    console.error(err);
    alert("Could not load job data. Redirecting to dashboard.");
    window.location.href = "/index.html";
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function highlightEmpty(id) {
  const el = document.getElementById(id);
  el.classList.add("input-error");
  el.style.animation = "shake 0.3s ease";
  setTimeout(() => el.style.animation = "", 300);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
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

const style = document.createElement("style");
style.textContent = `
  .input-error {
    border-color: rgba(220,38,38,0.6) !important;
    box-shadow: 0 0 0 3px rgba(220,38,38,0.12) !important;
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    25%      { transform: translateX(-5px); }
    75%      { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);