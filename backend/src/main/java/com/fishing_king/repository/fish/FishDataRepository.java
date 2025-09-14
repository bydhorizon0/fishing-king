package com.fishing_king.repository.fish;


import com.fishing_king.core.domain.FishData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishDataRepository extends JpaRepository<FishData, Long> {
}
