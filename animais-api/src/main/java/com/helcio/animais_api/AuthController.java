package com.helcio.animais_api;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        // Por agora aceita qualquer email/password
        // Depois adicionamos validação real
        return jwtUtil.gerarToken(request.getEmail());
    }
}