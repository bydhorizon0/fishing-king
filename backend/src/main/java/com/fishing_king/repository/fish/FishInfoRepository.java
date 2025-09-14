package com.fishing_king.repository.fish;

import com.fishing_king.core.domain.FishInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishInfoRepository extends JpaRepository<FishInfo, Long> {
}
