package com.fishing_king.core.dto;

import java.time.LocalDateTime;

public record MarkerResponse(
        Long id,
        Long userId,
        Long fishInfoId,
        String title,
        Double longitude,
        Double latitude,
        Boolean isPrivate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
