package com.fishing_king.core.validation;

import com.fishing_king.core.dto.user.SignupRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, SignupRequest> {
    @Override
    public boolean isValid(SignupRequest request, ConstraintValidatorContext context) {
        return request.password().equals(request.confirmPassword());
    }
}