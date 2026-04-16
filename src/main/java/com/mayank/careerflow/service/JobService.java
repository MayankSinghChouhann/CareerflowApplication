package com.mayank.careerflow.service;

import com.mayank.careerflow.entity.Job;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobService {

    public List<Job> getAllJobs() {
        return new ArrayList<>();
    }

    public Job getJobById(Long id) {
        return new Job();
    }

    public Job createJob(Job job) {
        return job;
    }

    public Job updateJob(Long id, Job updatedJob) {
        return updatedJob;
    }

    public void deleteJob(Long id) {
        // do nothing
    }
}