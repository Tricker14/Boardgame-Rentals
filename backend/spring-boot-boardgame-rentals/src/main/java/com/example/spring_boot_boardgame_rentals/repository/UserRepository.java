package com.example.spring_boot_boardgame_rentals.repository;

import com.example.spring_boot_boardgame_rentals.entity.BoardGameUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<BoardGameUser, Long> {
    Optional<BoardGameUser> findByUsername(String username);
}
