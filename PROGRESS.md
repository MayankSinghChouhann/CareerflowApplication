# CareerFlow — Job Application Tracker

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-green)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 1. Project Title

**CareerFlow** — A REST API based Job Application Tracking System built with Spring Boot, MySQL, Docker, and GitHub Actions CI/CD.

---

## 2. Problem Statement

Job seekers apply to multiple companies simultaneously but struggle to track application statuses, interview rounds, and follow-ups. There is no centralized system to manage this workflow efficiently.

**CareerFlow** solves this by providing a clean REST API backend that allows users to:
- Add and manage job applications
- Track application status (APPLIED, INTERVIEW, REJECTED, OFFERED)
- Update or delete applications
- Retrieve all applications or a single one by ID

---

## 3. Architecture Diagram

```
                        CareerFlow — System Architecture

  Client (Postman / Browser)
           │
           │  HTTP Request
           ▼
  ┌─────────────────────┐
  │    JobController    │  ← REST Layer (@RestController)
  │   /api/jobs (CRUD)  │
  └────────┬────────────┘
           │
           ▼
  ┌─────────────────────┐
  │     JobService      │  ← Business Logic (@Service)
  └────────┬────────────┘
           │
           ▼
  ┌─────────────────────┐
  │   JobRepository     │  ← Database Layer (JpaRepository)
  └────────┬────────────┘
           │
           ▼
  ┌─────────────────────┐
  │   MySQL Database    │  ← Persistent Storage
  │   (jobs table)      │
  └─────────────────────┘

  CI/CD Flow:
  GitHub Push → GitHub Actions → Build → Test (H2) → Docker Build → Docker Hub
```

> 📸 **Architecture Diagram Image:** Add `docs/architecture.png` here
> ![Architecture](docs/architecture.png)

---

## 4. CI/CD Pipeline Explanation

The pipeline has **3 stages** triggered on every push/PR to `main`:

```
Push to main branch
        │
        ▼
┌──────────────┐
│   BUILD      │  mvn clean package -DskipTests
│              │  Uploads JAR as artifact
└──────┬───────┘
       │ needs: build
       ▼
┌──────────────┐
│    TEST      │  mvn test (H2 in-memory DB)
│              │  No MySQL needed in CI
└──────┬───────┘
       │ needs: test
       ▼
┌──────────────┐
│   DEPLOY     │  Docker build + push to Docker Hub
│              │  Only runs on main branch
└──────────────┘
```

### Pipeline Features:
- **Maven Cache** — Speeds up build by caching `.m2` dependencies (`cache: maven`)
- **Artifact Upload** — JAR saved as downloadable artifact after build
- **H2 In-Memory DB** — Tests run without needing MySQL
- **Conditional Deploy** — Deploy only triggers on `main` branch (`if: github.ref == 'refs/heads/main'`)
- **GitHub Secrets** — No hardcoded credentials anywhere

### Enhancement Features (Optimizations):
| Feature | Benefit |
|---|---|
| `cache: maven` | Faster builds — skips re-downloading dependencies |
| `if: github.ref == 'refs/heads/main'` | Deploy only on stable branch |
| `upload-artifact` | JAR available for download after build |
| H2 override via CLI flags | Tests independent of MySQL |
| Multi-stage Dockerfile | Smaller final image (builder separated from runtime) |

---

## 5. Git Workflow Used

```
main (production)
  │
  ├── feature/devops-enhancement   ← CI/CD, Docker, GitHub Actions
  ├── feature/frontend             ← Login UI (HTML, CSS, JS)
  └── feature/testing              ← Tests and documentation
```

**Workflow followed:**
1. Create feature branch from `main`
2. Develop and commit changes
3. Open Pull Request to `main`
4. Review and merge PR
5. CI/CD pipeline auto-triggers on merge

**Branches Used:** 3 feature branches + main  
**PRs Merged:** PR #1 (login UI), PR #2 (script.js update), PR #4 (dummy feature)  
**Commits:** 10+ meaningful commits across team

---

## 6. APIs

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/jobs` | Get all job applications |
| GET | `/api/jobs/{id}` | Get single job by ID |
| POST | `/api/jobs` | Add new job application |
| PUT | `/api/jobs/{id}` | Update existing job |
| DELETE | `/api/jobs/{id}` | Delete a job application |

**Job Status Values:** `APPLIED` · `INTERVIEW` · `REJECTED` · `OFFERED`

---

## 7. Tools Used

| Tool | Purpose |
|------|---------|
| Spring Boot 3.3.5 | Backend REST API framework |
| MySQL 8 | Production database |
| H2 (in-memory) | Testing database (CI/CD) |
| JPA / Hibernate | ORM — Java to SQL mapping |
| Lombok | Reduces boilerplate (getters/setters) |
| Docker | Containerization |
| GitHub Actions | CI/CD automation |
| Maven | Build and dependency management |
| Postman | API testing |

---

## 8. GitHub Secrets Used

| Secret Name | Purpose |
|---|---|
| `DOCKER_USERNAME` | Docker Hub login |
| `DOCKER_PASSWORD` | Docker Hub password / access token |

> ⚠️ No credentials are hardcoded in any file. All secrets managed via GitHub → Settings → Secrets → Actions.

---

## 9. Deployment

**Platform:** Docker Hub  
**Image:** `docker.io/<your-dockerhub-username>/careerflow:latest`

### Run Locally with Docker:
```bash
# Pull the image
docker pull <your-dockerhub-username>/careerflow:latest

# Run the container
docker run -p 8080:8080 <your-dockerhub-username>/careerflow:latest

# Access API
curl http://localhost:8080/api/jobs
```

---

## 10. Screenshots

### Pipeline Success
> 📸 Add GitHub Actions pipeline success screenshot here

<!-- SCREENSHOT: GitHub → Actions tab → CareerFlow CI/CD Pipeline → green checkmarks -->

### Docker Hub Deployment
> 📸 Add Docker Hub image screenshot here

<!-- SCREENSHOT: hub.docker.com → repositories → careerflow:latest -->

---

## 11. Challenges Faced

| Challenge | How We Solved It |
|---|---|
| MySQL not available in GitHub Actions CI | Used H2 in-memory DB with CLI flag overrides in `mvn test` |
| Dockerfile in wrong directory (`target/`) | Moved Dockerfile to project root |
| H2 dependency was outside `<dependencies>` block in pom.xml | Fixed XML structure — moved H2 inside `<dependencies>` |
| Git push failing due to `.gitignore` ignoring Dockerfile | Moved Dockerfile out of `target/` folder |
| Secrets management | Used GitHub Secrets instead of hardcoding credentials |

---

## 12. Project Structure

```
careerflow/
├── .github/
│   └── workflows/
│       └── ci.yaml              ← CI/CD Pipeline
├── src/
│   ├── main/java/com/mayank/careerflow/
│   │   ├── controller/
│   │   │   └── JobController.java
│   │   ├── entity/
│   │   │   └── Job.java
│   │   ├── repository/
│   │   │   └── JobRepository.java
│   │   ├── service/
│   │   │   └── JobService.java
│   │   └── careerflowApplication.java
│   ├── main/resources/
│   │   ├── application.yaml
│   │   └── static/
│   │       ├── login.html
│   │       ├── css/style.css
│   │       └── js/script.js
│   └── test/java/
│       └── careerflowApplicationTests.java
├── Dockerfile
├── pom.xml
└── README.md
```

---

## Team

| Name | Role |
|------|------|
| Mayank Singh Chouhan | Backend + DevOps |
| Friend 1 | Frontend |
| Friend 2 | Testing + Docs |