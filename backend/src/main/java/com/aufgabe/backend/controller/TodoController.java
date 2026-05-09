package com.aufgabe.backend.controller;

import com.aufgabe.backend.dto.CreateTodoRequest;
import com.aufgabe.backend.dto.TodoResponse;
import com.aufgabe.backend.model.CustomUserDetails;
import com.aufgabe.backend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin("*")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    //CREATE
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@RequestBody CreateTodoRequest request, Authentication auth) {

        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        TodoResponse res=  todoService.createTodo(request,customUser.getId());
         return ResponseEntity.ok(res);
    }


    //GET all todos of logged-in user
    @GetMapping
    public List<TodoResponse> getTodos(Authentication auth) {

        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        return todoService.getTodosByUserId(customUser.getId());
    }

    //UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<TodoResponse> updateTodo(@PathVariable Long id,
                                   @RequestBody CreateTodoRequest request,
    Authentication auth) {

        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        TodoResponse res=todoService.updateTodo(id, request, customUser.getId());
        return ResponseEntity.ok(res);

    }

    //TOGGLE COMPLETE
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TodoResponse> toggleComplete(@PathVariable Long id,Authentication auth) {

        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        TodoResponse res= todoService.toggleComplete(id, customUser.getId());
        return ResponseEntity.ok(res);

    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id,Authentication auth) {

        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        todoService.deleteTodo(id, customUser.getId());
        return ResponseEntity.ok("Todo deleted successfully");
    }

}