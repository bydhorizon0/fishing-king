package com.fishing_king.core.dto.user;

import com.fishing_king.core.validation.PasswordMatches;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@PasswordMatches
public record SignupRequest(
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        @NotBlank(message = "이메일은 필수입니다.")
        String email,
        @NotBlank(message = "닉네임은 필수입니다.")
        String nickname,
        @Size(min = 6, message = "비밀번호는 6자 이상이어야 합니다.")
        String password,
        @NotBlank(message = "비밀번호 확인은 필수입니다.")
        String confirmPassword
) {

}
