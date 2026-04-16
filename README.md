## CareerFlow

CareerFlow is a Spring Boot app for tracking job applications (company, role, location, applied date, and status such as APPLIED / INTERVIEW / OFFERED / REJECTED).

### Tech stack

- **Backend**: Spring Boot 3 (Java 17), Maven
- **API style**: REST (`/api/jobs`)
- **UI**: Static HTML/CSS/JS served from `src/main/resources/static/`
- **Planned persistence**: JPA/Hibernate + MySQL dependencies exist, but DB is currently disabled via config

### Project structure (high level)

- `src/main/java/com/mayank/careerflow/`
  - `careerflowApplication.java`: Spring Boot entrypoint
  - `controller/JobController.java`: REST endpoints under `/api/jobs`
  - `service/JobService.java`: service layer (currently stubbed)
  - `entity/Job.java`: JPA entity definition for a job application
- `src/main/resources/static/`
  - `login.html`: login UI (client-side validation + redirect)
  - `index.html`: dashboard UI (stats + table)
  - `form.html`: add-job UI
  - `js/dashboard.js`, `js/form.js`: UI logic (currently in mock mode)
  - `css/style.css`: styling

### Current behavior (important)

- **The UI runs in mock mode**: `src/main/resources/static/js/dashboard.js` and `src/main/resources/static/js/form.js` have `MOCK_MODE = true`, so the pages use sample data and don’t call the backend.
- **The backend API exists but is not fully implemented**: `JobService` currently returns placeholder values (no DB / repository yet).
- **Database is disabled** right now in `src/main/resources/application.yaml` by excluding datasource + JPA autoconfiguration.

### Prerequisites

- Java **17**
- Maven **3.9+** (or use the Maven wrapper if you add one later)

Check:

```bash
java -version
mvn -version
```

### Run the application

From the project root:

```bash
mvn spring-boot:run
```

Then open:

- **Login**: `http://localhost:8080/login.html`
- **Dashboard**: `http://localhost:8080/index.html`
- **Add job form**: `http://localhost:8080/form.html`

### API endpoints

Base path: `/api/jobs`

- `GET /api/jobs` - list jobs
- `GET /api/jobs/{id}` - get a single job
- `POST /api/jobs` - create a job
- `PUT /api/jobs/{id}` - update a job
- `DELETE /api/jobs/{id}` - delete a job

Example create request:

```bash
curl -X POST "http://localhost:8080/api/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Backend Developer",
    "company": "Example Inc",
    "location": "Remote",
    "status": "APPLIED",
    "appliedDate": "2026-04-14"
  }'
```

### Notes / next steps (if you want real persistence)

To make the API return real data (instead of stubs), you’ll typically add:

- a Spring Data JPA repository (e.g. `JobRepository`)
- service methods that call the repository
- database configuration (remove the excludes in `application.yaml` and add `spring.datasource.*` + `spring.jpa.*`)

Also, to have the UI use the backend, set:

- `MOCK_MODE = false` in:
  - `src/main/resources/static/js/dashboard.js`
  - `src/main/resources/static/js/form.js`

