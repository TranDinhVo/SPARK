package com.javaweb.controller;

import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PropertySource("classpath:application.properties")
public class TransactionApi {
	@GetMapping("/test")
	public String testApi() {
		return "success hehee]";
		}

}
