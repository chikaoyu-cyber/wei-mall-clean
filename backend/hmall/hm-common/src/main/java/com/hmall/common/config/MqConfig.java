package com.hmall.common.config;

import ch.qos.logback.classic.pattern.MessageConverter;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(RabbitTemplate.class)
public class MqConfig {
    @Bean
    public MessageConverter messageConverter() {
        return new MessageConverter();
    }
}
