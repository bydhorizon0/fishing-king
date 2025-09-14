package com.fishing_king.controller;

import com.fishing_king.core.dto.user.LoginRequest;
import com.fishing_king.core.dto.user.SignupRequest;
import com.fishing_king.core.model.AuthUser;
import com.fishing_king.service.UserDetailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// @Validated
@RequestMapping("/api/auth")
@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailService userDetailService;

    public AuthController(AuthenticationManager authenticationManager, UserDetailService userDetailService) {
        this.authenticationManager = authenticationManager;
        this.userDetailService = userDetailService;
    }

    /*
     * 유효성 검즈 실패 시 MethodArgumentNotValidException 발생
     * Spring Boot 기본 설정에서는 400 Bad Request와 함께 에러 메시지 JSON을 반환
     */
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signup(@RequestBody @Valid SignupRequest request) {
        userDetailService.saveUser(request);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        try {
            // 1. 인증 시도
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );

            // 2. 인증 성공 시 SecurityContext에 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 3. 인증 성공 메시지 반환
            AuthUser authUser = (AuthUser) authentication.getPrincipal();
            return ResponseEntity.ok(Map.of(
                    "email", authUser.email(),
                    "nickname", authUser.nickname(),
                    "roles", authUser.getAuthorities()
            ));
        } catch (BadCredentialsException e) {
            // 인증 실패 시 401 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(null);
    }

}
