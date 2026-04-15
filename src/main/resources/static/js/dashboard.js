const MOCK_MODE = true;

const MOCK_JOBS = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "Bengaluru", status: "APPLIED", appliedDate: "2026-04-01" },
  { id: 2, title: "Backend Developer", company: "Amazon", location: "Hyderabad", status: "INTERVIEW", appliedDate: "2026-03-25" },
  { id: 3, title: "Full Stack Dev", company: "Microsoft", location: "Pune", status: "OFFERED", appliedDate: "2026-03-18" },
  { id: 4, title: "SDE-II", company: "Flipkart", location: "Remote", status: "REJECTED", appliedDate: "2026-03-10" }
];

document.addEventListener("DOMContentLoaded", async () => {
  const jobs = await loadJobs();
  renderStats(jobs);
  renderTable(jobs);
});

// LOAD DATA
async function loadJobs() {
  if (MOCK_MODE) return MOCK_JOBS;

  try {
    const res = await fetch("/api/jobs");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// STATS
function renderStats(jobs) {
  document.getElementById("totalCount").textContent = jobs.length;
  document.getElementById("interviewCount").textContent = jobs.filter(j => j.status === "INTERVIEW").length;
  document.getElementById("offeredCount").textContent = jobs.filter(j => j.status === "OFFERED").length;
  document.getElementById("rejectedCount").textContent = jobs.filter(j => j.status === "REJECTED").length;
}

// TABLE
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
      <td>${job.company}</td>
      <td>${job.title}</td>
      <td>${job.location || "—"}</td>
      <td>${formatDate(job.appliedDate)}</td>
      <td>${badge(job.status)}</td>
      <td>
        <button class="btn btn-update" onclick="editJob(${job.id})">Edit</button>
        <button class="btn btn-delete" onclick="deleteJob(${job.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

// DATE FORMAT
function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
}

// STATUS BADGE
function badge(status) {
  const map = {
    APPLIED: "applied",
    INTERVIEW: "interview",
    OFFERED: "offered",
    REJECTED: "rejected"
  };
  return `<span class="status ${map[status]}">${status}</span>`;
}

// DELETE
function deleteJob(id) {
  if (!confirm("Delete this job?")) return;

  const row = document.getElementById("row-" + id);
  if (row) row.remove();
}

// EDIT
function editJob(id) {
  window.location.href = `/form.html?id=${id}`;
}