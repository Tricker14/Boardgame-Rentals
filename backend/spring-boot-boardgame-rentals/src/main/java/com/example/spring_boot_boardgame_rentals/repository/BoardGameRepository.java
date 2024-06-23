package com.example.spring_boot_boardgame_rentals.repository;

import com.example.spring_boot_boardgame_rentals.entity.BoardGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardGameRepository extends JpaRepository<BoardGame, Long> {
}
