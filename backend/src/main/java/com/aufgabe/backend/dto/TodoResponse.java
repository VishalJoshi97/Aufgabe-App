package com.aufgabe.backend.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoResponse {

    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private String priority;
    private LocalDate dueDate;
}
