# CareerFlow Spring Backend + Live Frontend (Hindi Guide)

Yeh guide aapko project ka backend samajhne, run karne, aur frontend ko browser me live dikhane ke liye banayi gayi hai.

## 1) Backend me kaunsi libraries use hui hain?

`pom.xml` ke hisaab se major dependencies:

- `spring-boot-starter-web`
  - REST API banane ke liye (`@RestController`, JSON request/response, embedded Tomcat).
- `spring-boot-starter-data-jpa`
  - Database ORM layer (JPA/Hibernate) ke liye.
- `mysql-connector-j` (runtime)
  - MySQL database se connect karne ke liye.
- `lombok`
  - Boilerplate code (getter/setter, constructors) kam karne ke liye.
- `h2` (test scope)
  - In-memory DB, mostly tests ke liye.
- `spring-boot-starter-test`
  - Testing stack (JUnit, Spring Test).

## 2) Backend structure ka quick overview

- Entry point: `src/main/java/com/mayank/careerflow/CareerflowApplication.java`
- Controller: `src/main/java/com/mayank/careerflow/controller/JobController.java`
- Service layer: `src/main/java/com/mayank/careerflow/service/JobService.java`
- Entity: `src/main/java/com/mayank/careerflow/entity/Job.java`
- Repository: `src/main/java/com/mayank/careerflow/repository/JobRepository.java`
- Static frontend pages:
  - `src/main/resources/static/login.html`
  - `src/main/resources/static/index.html`
  - `src/main/resources/static/form.html`

## 3) Project run kaise karein (local machine)

### Prerequisites

- Java 17
- Maven 3.9+ (ya project ka wrapper: `./mvnw`)

Check commands:

```bash
java -version
mvn -version
```

### Run command

Project root se:

```bash
./mvnw spring-boot:run
```

Agar wrapper executable na ho to:

```bash
chmod +x mvnw
./mvnw spring-boot:run
```

Alternative:

```bash
mvn spring-boot:run
```

## 4) Frontend live kaise dekhein?

Spring Boot static files ko `/src/main/resources/static` se serve karta hai.
App start hone ke baad browser me open karein:

- Login: `http://localhost:8080/login.html`
- Dashboard: `http://localhost:8080/index.html`
- Add Job Form: `http://localhost:8080/form.html`

## 5) Important: Real backend integration vs mock mode

Abhi JS files me mock mode enabled hai, isliye frontend sample/mock data dikhata hai:

- `src/main/resources/static/js/dashboard.js`
- `src/main/resources/static/js/form.js`

Agar aapko frontend se real backend API hit karni hai, to in files me `MOCK_MODE = false` set karein.

> Note: Current service implementation me kuch methods placeholder/stub behavior de sakte hain; full DB persistence ke liye service/repository wiring aur datasource config complete honi chahiye.

## 6) API endpoints test karna

Base path: `/api/jobs`

- `GET /api/jobs`
- `GET /api/jobs/{id}`
- `POST /api/jobs`
- `PUT /api/jobs/{id}`
- `DELETE /api/jobs/{id}`

Sample POST:

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

## 7) Agar live demo dena hai (quick checklist)

1. `./mvnw spring-boot:run` se app start karo.
2. Browser me `login.html` open karo.
3. `index.html` aur `form.html` flow demo karo.
4. Agar backend live data dikhana ho to `MOCK_MODE = false` + DB config complete karo.
5. API response dikhane ke liye Postman/curl se `/api/jobs` hit karo.

