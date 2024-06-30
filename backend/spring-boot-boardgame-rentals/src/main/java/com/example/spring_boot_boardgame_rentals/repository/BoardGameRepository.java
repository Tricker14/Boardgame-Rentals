package com.example.spring_boot_boardgame_rentals.repository;

import com.example.spring_boot_boardgame_rentals.entity.BoardGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BoardGameRepository extends JpaRepository<BoardGame, Long> {
    Page<BoardGame> findByNameContaining(String name, Pageable pageable);
    Page<BoardGame> findByCategory(String category, Pageable pageable);
}
