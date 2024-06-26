package com.example.spring_boot_boardgame_rentals.repository;

import com.example.spring_boot_boardgame_rentals.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
