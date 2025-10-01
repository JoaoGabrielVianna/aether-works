package com.aether_works.project;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // libera todos os endpoints
                .allowedOrigins("*") // permite qualquer origem (ajuste para segurança depois)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
