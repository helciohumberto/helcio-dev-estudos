package com.helcio.animais_api;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "animais")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String raca;

    private Double peso;
}