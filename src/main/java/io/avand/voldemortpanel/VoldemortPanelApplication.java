package io.avand.voldemortpanel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class VoldemortPanelApplication {

	public static void main(String[] args) {
		SpringApplication.run(VoldemortPanelApplication.class, args);
	}
}
