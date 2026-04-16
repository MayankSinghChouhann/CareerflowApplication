const MOCK_MODE = true;

// fake data for testing the UI
const MOCK_JOBS = [
  { id: 1, title: "Frontend Developer",  company: "Google",    location: "Bengaluru",  status: "APPLIED",   appliedDate: "2026-04-01" },
  { id: 2, title: "Backend Developer",   company: "Amazon",    location: "Hyderabad",  status: "INTERVIEW", appliedDate: "2026-03-25" },
  { id: 3, title: "Full Stack Dev",      company: "Microsoft", location: "Pune",       status: "OFFERED",   appliedDate: "2026-03-18" },
  { id: 4, title: "SDE-II",             company: "Flipkart",  location: "Remote",     status: "REJECTED",  appliedDate: "2026-03-10" },
  { id: 5, title: "Backend Engineer",    company: "Razorpay",  location: "Bengaluru",  status: "APPLIED",   appliedDate: "2026-04-05" },
];


// --- MAIN INIT ---
// runs when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  const jobs = await loadJobs();
  renderStats(jobs);
  renderTable(jobs);
});


// --- LOAD JOBS ---
// either returns mock data OR calls the real API
async function loadJobs() {
  if (MOCK_MODE) {
    return MOCK_JOBS;
  }

  try {
    const response = await fetch("/api/jobs");

    if (!response.ok) {
      throw new Error("Server returned: " + response.status);
    }

    return await response.json();

  } catch (err) {
    console.error("Couldn't load jobs:", err);
    return []; // return empty so the page doesn't crash
  }
}


// --- RENDER STAT CARDS ---
// counts each status and puts the number in the right card
function renderStats(jobs) {
  document.getElementById("totalCount").textContent     = jobs.length;
  document.getElementById("interviewCount").textContent = jobs.filter(j => j.status === "INTERVIEW").length;
  document.getElementById("offeredCount").textContent   = jobs.filter(j => j.status === "OFFERED").length;
  document.getElementById("rejectedCount").textContent  = jobs.filter(j => j.status === "REJECTED").length;
}


// --- RENDER TABLE ROWS ---
// builds the HTML for each job and injects it into the table
function renderTable(jobs) {
  const tbody      = document.getElementById("jobTableBody");
  const emptyState = document.getElementById("emptyState");

  // if no jobs, show the empty state box instead
  if (jobs.length === 0) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  // build a row for each job
  tbody.innerHTML = jobs.map(job => `
    <tr id="row-${job.id}">
      <td><div class="td-company">${job.company}</div></td>
      <td><div class="td-role">${job.title}</div></td>
      <td class="td-meta">${job.location || "—"}</td>
      <td class="td-meta">${formatDate(job.appliedDate)}</td>
      <td>${buildBadge(job.status)}</td>
      <td>
        <button class="action-btn edit"   onclick="editJob(${job.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteJob(${job.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}


// --- FORMAT DATE ---
// turns "2026-04-01" into "Apr 1, 2026" — much friendlier
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}


// --- BUILD STATUS BADGE ---
// maps the ALLCAPS backend status to a pretty colored badge
function buildBadge(status) {
  const map = {
    "APPLIED":   { cls: "applied",   label: "Applied" },
    "INTERVIEW": { cls: "interview", label: "Interview" },
    "OFFERED":   { cls: "offered",   label: "Offered" },
    "REJECTED":  { cls: "rejected",  label: "Rejected" },
  };

  const info = map[status] || { cls: "applied", label: status };
  return `<span class="badge ${info.cls}">${info.label}</span>`;
}


// --- DELETE JOB ---
// called from the delete button in each row
async function deleteJob(id) {
  const confirmed = confirm("Remove this application?");
  if (!confirmed) return;

  if (MOCK_MODE) {
    // just remove the row visually in mock mode
    const row = document.getElementById("row-" + id);
    if (row) row.remove();
    return;
  }

  // real delete — calls your DELETE /api/jobs/{id} endpoint
  try {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      const row = document.getElementById("row-" + id);
      if (row) row.remove();
    } else {
      alert("Couldn't delete. Server said: " + res.status);
    }
  } catch (err) {
    console.error("Delete failed:", err);
  }
}


// --- EDIT JOB ---
// for now just redirects to form — you can add pre-fill logic later
function editJob(id) {
  window.location.href = `form.html?id=${id}`;
}