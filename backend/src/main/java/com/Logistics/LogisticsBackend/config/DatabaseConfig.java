package com.Logistics.LogisticsBackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.Logistics.LogisticsBackend.repository")
@EnableTransactionManagement
public class DatabaseConfig {
    // Configuration is mainly done through application.properties
    // This class enables JPA repositories and transaction management
}