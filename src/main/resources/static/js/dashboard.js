const MOCK_MODE = false; // ← set true only for offline testing

const MOCK_JOBS = [
  { id: 1, title: "Frontend Developer", company: "Google",    location: "Bengaluru", status: "APPLIED",   appliedDate: "2026-04-01" },
  { id: 2, title: "Backend Developer",  company: "Amazon",    location: "Hyderabad", status: "INTERVIEW", appliedDate: "2026-03-25" },
  { id: 3, title: "Full Stack Dev",     company: "Microsoft", location: "Pune",      status: "OFFERED",   appliedDate: "2026-03-18" },
  { id: 4, title: "SDE-II",            company: "Flipkart",  location: "Remote",    status: "REJECTED",  appliedDate: "2026-03-10" }
];

document.addEventListener("DOMContentLoaded", async () => {
  const jobs = await loadJobs();
  renderStats(jobs);
  renderTable(jobs);
});

// ── LOAD DATA ────────────────────────────────────────────────────────────────
async function loadJobs() {
  if (MOCK_MODE) return MOCK_JOBS;

  try {
    const res = await fetch("/api/jobs");
    if (!res.ok) throw new Error("Failed to load jobs");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// ── STATS ────────────────────────────────────────────────────────────────────
function renderStats(jobs) {
  document.getElementById("totalCount").textContent     = jobs.length;
  document.getElementById("interviewCount").textContent = jobs.filter(j => j.status === "INTERVIEW").length;
  document.getElementById("offeredCount").textContent   = jobs.filter(j => j.status === "OFFERED").length;
  document.getElementById("rejectedCount").textContent  = jobs.filter(j => j.status === "REJECTED").length;
}

// ── TABLE ────────────────────────────────────────────────────────────────────
function renderTable(jobs) {
  const tbody = document.getElementById("jobTableBody");
  const empty = document.getElementById("emptyState");

  if (jobs.length === 0) {
    tbody.innerHTML = "";
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  tbody.innerHTML = jobs.map(job => `
    <tr id="row-${job.id}">
      <td class="td-company">${job.company}</td>
      <td class="td-role">${job.title}</td>
      <td class="td-meta">${job.location || "—"}</td>
      <td class="td-meta">${formatDate(job.appliedDate)}</td>
      <td>${badge(job.status)}</td>
      <td>
        <button class="action-btn edit"   onclick="editJob(${job.id})">Edit</button>
        <button class="action-btn delete" onclick="deleteJob(${job.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

// ── DATE FORMAT ──────────────────────────────────────────────────────────────
function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
}

// ── STATUS BADGE ─────────────────────────────────────────────────────────────
// BUG 2 FIX: was class="status applied" — CSS defines .badge.applied
function badge(status) {
  const map = {
    APPLIED:   "applied",
    INTERVIEW: "interview",
    OFFERED:   "offered",
    REJECTED:  "rejected"
  };
  return `<span class="badge ${map[status] || ''}">${status}</span>`;
}

// ── DELETE ───────────────────────────────────────────────────────────────────
// BUG 3 FIX: was only removing DOM row, never calling DELETE /api/jobs/{id}
async function deleteJob(id) {
  if (!confirm("Delete this job application?")) return;

  if (MOCK_MODE) {
    document.getElementById("row-" + id)?.remove();
    updateStatsFromDOM();
    return;
  }

  try {
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      document.getElementById("row-" + id)?.remove();
      updateStatsFromDOM();
    } else {
      alert("Failed to delete job. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error. Please try again.");
  }
}

// ── EDIT ─────────────────────────────────────────────────────────────────────
function editJob(id) {
  window.location.href = `/form.html?id=${id}`;
}

// ── HELPER: re-count stats from what's left in DOM ───────────────────────────
function updateStatsFromDOM() {
  const rows     = document.querySelectorAll("#jobTableBody tr");
  const statuses = Array.from(rows).map(r => r.querySelector(".badge")?.textContent?.trim());
  document.getElementById("totalCount").textContent     = rows.length;
  document.getElementById("interviewCount").textContent = statuses.filter(s => s === "INTERVIEW").length;
  document.getElementById("offeredCount").textContent   = statuses.filter(s => s === "OFFERED").length;
  document.getElementById("rejectedCount").textContent  = statuses.filter(s => s === "REJECTED").length;

  if (rows.length === 0) {
    document.getElementById("emptyState").style.display = "block";
  }
}