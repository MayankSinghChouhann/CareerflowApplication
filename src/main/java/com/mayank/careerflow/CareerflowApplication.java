package com.mayank.careerflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.mayank.careerflow.repository")
@EntityScan(basePackages = "com.mayank.careerflow.entity")
public class CareerflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(CareerflowApplication.class, args);
    }
}
