# 🌱 Spring Boot — OOP Class Project

> A complete Spring Boot REST API project demonstrating layered architecture, dependency injection, and unit testing.

---

## 📌 Table of Contents

- [What is Spring Boot?](#what-is-spring-boot)
- [Project Architecture](#project-architecture)
- [Dependencies Used](#dependencies-used)
- [Project Structure](#project-structure)
- [Layer-by-Layer Explanation](#layer-by-layer-explanation)
  - [Entity (Model)](#1-entity--model)
  - [Repository](#2-repository-layer)
  - [Service](#3-service-layer)
  - [Controller](#4-controller-layer)
- [API Endpoints](#api-endpoints)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [OOP Concepts Used](#oop-concepts-used)

---

## What is Spring Boot?

**Spring Boot** is a Java-based framework that makes it easy to build production-ready REST APIs without complex configuration. It follows a **layered architecture** where each layer has a single responsibility.

```
Client (Browser/Postman)
        ↓
  Controller Layer      ← Receives HTTP requests, routes them
        ↓
  Service Layer         ← Business logic lives here
        ↓
  Repository Layer      ← Talks to the database
        ↓
  Database (MySQL/H2)
```

---

## Project Architecture

```
src/
 └── main/
      └── java/
           └── com.example.demo/
                ├── controller/
                │    └── StudentController.java
                ├── service/
                │    └── StudentService.java
                ├── repository/
                │    └── StudentRepository.java
                ├── model/
                │    └── Student.java
                └── DemoApplication.java
 └── resources/
      └── application.properties
pom.xml
```

---

## Dependencies Used

All dependencies are defined in `pom.xml`. These are the key ones used in this project:

---

### 1. 🟢 `spring-boot-starter-web`
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
**Kya karta hai:** REST API banane ke liye. Iske andar Apache Tomcat server embedded hota hai — alag se server install nahi karna padta. `@RestController`, `@GetMapping`, `@PostMapping` is pe depend karte hain.

---

### 2. 🗄️ `spring-boot-starter-data-jpa`
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
**Kya karta hai:** Database ke saath kaam karne ke liye. JPA (Java Persistence API) use karke Java objects ko database tables se map karta hai. `@Entity`, `@Id`, `JpaRepository` is pe depend karte hain. SQL manually likhna nahi padta.

---

### 3. 🐬 `mysql-connector-j`
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```
**Kya karta hai:** MySQL database se Java application ko connect karta hai. Production environment mein use hota hai.

---

### 4. 🧪 `h2` (In-Memory Database — Testing)
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```
**Kya karta hai:** Testing ke liye lightweight in-memory database. MySQL install kiye bina tests run ho jaate hain. Scope `test` hai, yaani sirf testing mein use hoga, production mein nahi.

---

### 5. 🧪 `spring-boot-starter-test`
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```
**Kya karta hai:** Testing ke liye complete toolkit. Iske andar yeh sab included hain:
- **JUnit 5** — test cases likhne ke liye
- **Mockito** — fake (mock) objects banane ke liye
- **AssertJ** — assertions likhne ke liye

---

### 6. 🔧 `lombok` (Optional but Recommended)
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```
**Kya karta hai:** Boilerplate code hatata hai. `@Getter`, `@Setter`, `@AllArgsConstructor` annotations use karke automatically getters/setters generate hote hain — manually nahi likhne padte.

---

### 7. ✅ `spring-boot-starter-validation`
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
**Kya karta hai:** Input validation ke liye. `@NotNull`, `@NotBlank`, `@Min`, `@Max` jaise annotations use kar sakte hain Entity mein.

---

## Complete `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>Spring Boot OOP Demo</name>
    <description>OOP Class Project — Spring Boot REST API</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>

        <!-- Web (REST API + Embedded Tomcat) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- JPA (Database ORM) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- H2 In-Memory DB (Testing only) -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Lombok (Reduce boilerplate) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing (JUnit 5 + Mockito) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

---

## Layer-by-Layer Explanation

### 1. Entity / Model

Database table ka Java representation. `@Entity` annotation se Spring samajhta hai ki ye ek DB table hai.

```java
// model/Student.java
@Entity
@Table(name = "students")
@Data                    // Lombok: generates getters, setters, toString
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 1, message = "Age must be positive")
    private int age;

    @NotBlank(message = "Email is required")
    private String email;
}
```

---

### 2. Repository Layer

Database operations. `JpaRepository` extend karne se `findAll()`, `save()`, `deleteById()`, `findById()` automatically milte hain.

```java
// repository/StudentRepository.java
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Spring Data JPA method naming convention se SQL auto-generate hoti hai
    List<Student> findByName(String name);
    List<Student> findByAgeGreaterThan(int age);
    Optional<Student> findByEmail(String email);
}
```

---

### 3. Service Layer

Business logic yahan hoti hai. Controller aur Repository ke beech ka bridge.

```java
// service/StudentService.java
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get by ID (with error handling)
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    // Save new student
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    // Update existing student
    public Student updateStudent(Long id, Student updated) {
        Student existing = getStudentById(id);
        existing.setName(updated.getName());
        existing.setAge(updated.getAge());
        existing.setEmail(updated.getEmail());
        return studentRepository.save(existing);
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
```

---

### 4. Controller Layer

HTTP requests receive karta hai aur Service ko delegate karta hai.

```java
// controller/StudentController.java
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // GET /api/students         → Sab students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // GET /api/students/1       → ID se ek student
    @GetMapping("/{id}")
    public ResponseEntity<Student> getById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    // POST /api/students        → Naya student add karo
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        Student saved = studentService.saveStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT /api/students/1       → Student update karo
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id,
                                                  @Valid @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    // DELETE /api/students/1    → Student delete karo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## API Endpoints

| Method   | URL                    | Description           | Request Body       |
|----------|------------------------|-----------------------|--------------------|
| `GET`    | `/api/students`        | Sab students laao     | —                  |
| `GET`    | `/api/students/{id}`   | ID se ek student      | —                  |
| `POST`   | `/api/students`        | Naya student add karo | `{ Student JSON }` |
| `PUT`    | `/api/students/{id}`   | Student update karo   | `{ Student JSON }` |
| `DELETE` | `/api/students/{id}`   | Student delete karo   | —                  |

---

## `application.properties`

```properties
# Server
server.port=8080

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## How to Run

**Prerequisites:** Java 17+, Maven, MySQL

```bash
# 1. Clone the repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. MySQL mein database banao
mysql -u root -p
CREATE DATABASE student_db;

# 3. application.properties mein apna password daalo

# 4. Run karo
./mvnw spring-boot:run

# 5. Test karo (Postman ya browser)
# http://localhost:8080/api/students
```

---

## Testing

Mockito se Service layer test karte hain bina real database ke:

```java
// test/StudentServiceTest.java
@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;   // Fake DB

    @InjectMocks
    private StudentService studentService;         // Real Service

    @Test
    void testGetAllStudents_returnsList() {
        // ARRANGE — fake data setup
        List<Student> fakeData = List.of(
            new Student(1L, "Ali", 20, "ali@test.com"),
            new Student(2L, "Sara", 22, "sara@test.com")
        );
        Mockito.when(studentRepository.findAll()).thenReturn(fakeData);

        // ACT — actual method call
        List<Student> result = studentService.getAllStudents();

        // ASSERT — expected result check
        assertEquals(2, result.size());
        assertEquals("Ali", result.get(0).getName());
    }

    @Test
    void testGetById_notFound_throwsException() {
        Mockito.when(studentRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            studentService.getStudentById(99L);
        });
    }

    @Test
    void testSaveStudent() {
        Student s = new Student(null, "Zara", 21, "zara@test.com");
        Student saved = new Student(1L, "Zara", 21, "zara@test.com");
        Mockito.when(studentRepository.save(s)).thenReturn(saved);

        Student result = studentService.saveStudent(s);

        assertNotNull(result.getId());
        assertEquals("Zara", result.getName());
    }
}
```

**Tests run karne ke liye:**
```bash
./mvnw test
```

---

## OOP Concepts Used

| OOP Concept              | Spring Mein Kahan Use Hua                                                |
|--------------------------|--------------------------------------------------------------------------|
| **Encapsulation**        | Entity class mein private fields + getters/setters                       |
| **Abstraction**          | `JpaRepository` interface — implementation hide hai, sirf methods dikhte hain |
| **Inheritance**          | `StudentRepository extends JpaRepository` — sab methods inherit ho jaate hain |
| **Polymorphism**         | `@Service`, `@Repository` — same interface, alag implementations         |
| **Dependency Injection** | `@Autowired` — Spring khud objects banata aur inject karta hai           |
| **Single Responsibility**| Har layer ka ek hi kaam — Controller routes, Service logic, Repo DB     |

---

## Key Annotations Summary

| Annotation            | Layer       | Kaam                                              |
|-----------------------|-------------|---------------------------------------------------|
| `@SpringBootApplication` | Main     | Application start point                           |
| `@RestController`     | Controller  | HTTP request receive karo, JSON return karo       |
| `@RequestMapping`     | Controller  | Base URL define karo                              |
| `@GetMapping`         | Controller  | GET request handle karo                           |
| `@PostMapping`        | Controller  | POST request handle karo                          |
| `@Service`            | Service     | Business logic class mark karo                    |
| `@Autowired`          | Any         | Dependency inject karo                            |
| `@Repository`         | Repository  | DB access class mark karo                         |
| `@Entity`             | Model       | Java class = DB table                             |
| `@Id`                 | Model       | Primary key                                       |
| `@Mock`               | Test        | Fake object banao (Mockito)                       |
| `@InjectMocks`        | Test        | Real object mein mocks inject karo                |

---

*Made with Spring Boot 3.2 | Java 17 | OOP Class Project*
