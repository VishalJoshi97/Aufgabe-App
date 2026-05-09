package com.aufgabe.backend.dto;

import com.aufgabe.backend.enums.Role;
import lombok.*;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    Long userId;
    String jwtToken;
    String username;
    private Role role;
    private LocalTime time;
}
