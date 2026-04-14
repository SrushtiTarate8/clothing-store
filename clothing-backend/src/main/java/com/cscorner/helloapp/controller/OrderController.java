package com.cscorner.helloapp.controller;

import com.cscorner.helloapp.model.Order;
import com.cscorner.helloapp.model.OrderItem;
import com.cscorner.helloapp.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody Order order) {
        Map<String, Object> response = new HashMap<>();

        if (order.getItems() == null || order.getItems().isEmpty()) {
            response.put("success", false);
            response.put("message", "Order items cannot be empty");
            return ResponseEntity.badRequest().body(response);
        }

        if (order.getTotalAmount() == null || order.getTotalAmount() <= 0) {
            response.put("success", false);
            response.put("message", "Invalid total amount");
            return ResponseEntity.badRequest().body(response);
        }

        Order saved = orderRepository.save(order);
        response.put("success", true);
        response.put("message", "Order placed successfully");
        response.put("orderId", saved.getId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public List<Map<String, Object>> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return orders.stream().map(order -> {
            Map<String, Object> orderMap = new HashMap<>();
            orderMap.put("orderId", order.getId());
            orderMap.put("date", order.getCreatedAt());
            orderMap.put("status", order.getStatus());
            orderMap.put("totalAmount", order.getTotalAmount());
            orderMap.put("paymentMethod", order.getPaymentMethod());

            List<Map<String, Object>> items = order.getItems().stream().map(item -> mapItem(item)).toList();
            orderMap.put("items", items);

            return orderMap;
        }).toList();
    }

    private Map<String, Object> mapItem(OrderItem item) {
        Map<String, Object> itemMap = new HashMap<>();
        itemMap.put("name", item.getName());
        itemMap.put("size", item.getSize());
        itemMap.put("price", item.getPrice());
        itemMap.put("quantity", item.getQuantity());
        itemMap.put("image", item.getImageUrl());
        return itemMap;
    }
}
