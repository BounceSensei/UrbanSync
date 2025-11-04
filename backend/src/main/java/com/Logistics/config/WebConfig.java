package com.Logistics.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class WebConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Allow credentials (cookies, authorization headers, etc.)
        config.setAllowCredentials(true);

        // Allow specific origins - include frontend and the production Railway domain used for API calls
        config.setAllowedOrigins(Arrays.asList(
                "https://urban-sync.vercel.app",
                "https://urbansync-production-59e1.up.railway.app"
        ));

        // Allow any header and method for flexibility (can be tightened later)
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        // Expose Authorization header so frontend can read it when present
        config.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}