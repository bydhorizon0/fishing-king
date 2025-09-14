package com.fishing_king.controller;

import com.fishing_king.core.dto.point.AddPointRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Log4j2
@RequestMapping("/api/point")
@RestController
public class PointController {

    @PostMapping("/add")
    public ResponseEntity<?> addPoint(
            @ModelAttribute @Validated AddPointRequest request,
            @RequestParam(name = "images", required = false) List<MultipartFile> images
    ) {
        log.info("Request: {}, images: {}", request, images);

        return ResponseEntity.ok(true);
    }
}
