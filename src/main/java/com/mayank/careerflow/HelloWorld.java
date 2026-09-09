package com.mayank.careerflow;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {
    @GetMapping("/ping")
    public String hello() {
        return "Hello world from mayankkk";
    }
}
