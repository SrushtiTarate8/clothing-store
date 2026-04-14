package com.cscorner.helloapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cscorner.helloapp.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}