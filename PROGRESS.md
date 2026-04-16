# JobTracker Project Progress

## 5 March 2026
- Spring Boot project initialized
- Basic project structure created
- Application running on localhost

## 6 March 2026
- Created User Entity
- Added JPA dependencies
- Connected with MySQL database

## 7 March 2026
- Created User Repository
- Implemented basic CRUD APIs

# CareerFlow — Job Application Tracker

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.5-green)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

## Problem Statement
Job seekers struggle to track multiple applications. CareerFlow provides 
a REST API to manage job applications with full CRUD operations.

## Architecture
HTTP Request → JobController → JobService → JobRepository → MySQL
## What We Built

### Backend (Spring Boot)
- Job.java — MySQL table
- JobRepository.java — database queries  
- JobService.java — business logic
- JobController.java — 5 REST APIs

### APIs
| Method | URL | Kya karta hai |
|--------|-----|--------------|
| GET | /api/jobs | Saari jobs laao |
| GET | /api/jobs/{id} | Ek job laao |
| POST | /api/jobs | Nayi job add karo |
| PUT | /api/jobs/{id} | Job update karo |
| DELETE | /api/jobs/{id} | Job delete karo |

## CI/CD Pipeline
3 stages — Build → Test → Deploy
- Build: mvn clean package
- Test: mvn test  
- Deploy: Docker image → Docker Hub

## Git Workflow
- main branch — production
- feature/devops-enhancement — DevOps setup
- feature/frontend — UI
- feature/testing — tests

## Tools Used
| Tool | Purpose |
|------|---------|
| Spring Boot 3 | Backend |
| MySQL 8 | Database |
| JPA/Hibernate | ORM |
| Lombok | Boilerplate |
| Docker | Container |
| GitHub Actions | CI/CD |
| Maven | Build tool |

## GitHub Secrets
- DOCKER_USERNAME
- DOCKER_PASSWORD

## Team
| Name | Role |
|------|------|
| Mayank Singh Chouhan | Backend + DevOps |
| Friend 1 | Frontend |
| Friend 2 | Testing + Docs |

## Screenshots
<!-- Pipeline success screenshot yahan add karo -->
<!-- Docker Hub image screenshot yahan add karo -->
