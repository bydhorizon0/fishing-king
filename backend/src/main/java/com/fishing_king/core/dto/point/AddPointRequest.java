package com.fishing_king.core.dto.point;

import jakarta.validation.constraints.NotBlank;

public record AddPointRequest(

        String title,
        @NotBlank(message = "내용은 필수입니다.")
        String content,
        Double longitude,
        Double latitude,
        boolean isPrivate,
        Double length,
        Double weight
        // Long userId,
        // Long fishInfoId,
) {
}
