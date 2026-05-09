package com.aufgabe.backend.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTodoRequest {
    private String title;
    private String description;
    private String priority;
    private LocalDate dueDate;
}
