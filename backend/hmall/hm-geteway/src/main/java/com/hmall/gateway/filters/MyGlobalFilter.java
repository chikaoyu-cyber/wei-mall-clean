package com.hmall.gateway.filters;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class MyGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 1.获取请求
        ServerHttpRequest request = exchange.getRequest();
        // 2.过滤器业务处理（前置逻辑 pre阶段）
        System.out.println("GlobalFilter pre阶段 执行了。");
        // 3.放行，后续路由、其他过滤器执行
        return chain.filter(exchange);
    }
    @Override
    public int getOrder() {
        return 0;
    }
}
