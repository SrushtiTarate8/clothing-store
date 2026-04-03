package com.cscorner.helloapp;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HelloController{
    @GetMapping("/hello")
    public String sayHello(){
        return "Hello from CS Corner!!";
    }
}