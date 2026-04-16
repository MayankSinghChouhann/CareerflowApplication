package com.mayank.careerflow;

import com.mayank.careerflow.entity.Job;
import com.mayank.careerflow.repository.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = CareerflowApplication.class)
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class CareerflowApplicationTests {

    @Autowired
    private JobRepository jobRepository;

    @Test
    void contextLoads() {
        assertNotNull(jobRepository);
    }

    @Test
    void testCreateJob() {
        Job job = new Job();
        job.setTitle("Software Engineer");
        job.setCompany("Google");
        job.setLocation("Bangalore");
        job.setStatus("APPLIED");
        job.setAppliedDate(LocalDate.now());

        Job saved = jobRepository.save(job);

        assertNotNull(saved.getId());
        assertEquals("Software Engineer", saved.getTitle());
        assertEquals("Google", saved.getCompany());
    }

    @Test
    void testGetAllJobs() {
        Job job = new Job();
        job.setTitle("Backend Developer");
        job.setCompany("Amazon");
        job.setLocation("Hyderabad");
        job.setStatus("INTERVIEW");
        job.setAppliedDate(LocalDate.now());

        jobRepository.save(job);

        List<Job> jobs = jobRepository.findAll();
        assertFalse(jobs.isEmpty());
    }

    @Test
    void testDeleteJob() {
        Job job = new Job();
        job.setTitle("DevOps Engineer");
        job.setCompany("Microsoft");
        job.setLocation("Pune");
        job.setStatus("APPLIED");
        job.setAppliedDate(LocalDate.now());

        Job saved = jobRepository.save(job);
        Long id = saved.getId();

        jobRepository.deleteById(id);

        Optional<Job> deleted = jobRepository.findById(id);
        assertFalse(deleted.isPresent());
    }
}
