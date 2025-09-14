package com.fishing_king.service;

import com.fishing_king.core.domain.User;
import com.fishing_king.core.dto.user.SignupRequest;
import com.fishing_king.core.model.AuthUser;
import com.fishing_king.repository.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailService implements UserDetailsService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(user -> new AuthUser(
                        user.getEmail(),
                        passwordEncoder.encode(user.getPassword()),
                        user.getNickname(),
                        List.of(() -> "ROLE_USER")
                ))
                .orElseThrow(() -> new UsernameNotFoundException(email + "에 해당하는 유저를 찾을 수 없습니다."));
    }

    public void saveUser(SignupRequest request) {
        User user = User.builder()
                .email(request.email())
                .nickname(request.nickname())
                .password(passwordEncoder.encode(request.password()))
                .build();

        // 이미 회원가입이 되어있는지 확인

        userRepository.save(user);
    }

}
