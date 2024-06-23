package com.example.spring_boot_boardgame_rentals.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "boardGame")
@Data
public class BoardGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "designer")
    private String designer;

    @Column(name = "description")
    private String description;

    @Column(name = "copies")
    private int copies;

    @Column(name = "copiesAvailable")
    private int copiesAvailable;

    @Column(name = "category")
    private String category;

    @Column(name = "imageURL")
    private String imageURL;
}
