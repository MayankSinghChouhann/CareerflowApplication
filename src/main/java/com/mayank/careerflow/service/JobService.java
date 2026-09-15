package com.mayank.careerflow.service;

import com.mayank.careerflow.entity.Job;
import com.mayank.careerflow.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job updatedJob) {
        Job existing = getJobById(id);
        existing.setTitle(updatedJob.getTitle());
        existing.setCompany(updatedJob.getCompany());
        existing.setLocation(updatedJob.getLocation());
        existing.setStatus(updatedJob.getStatus());
        existing.setAppliedDate(updatedJob.getAppliedDate());
        return jobRepository.save(existing);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
