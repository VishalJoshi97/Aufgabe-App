package com.aufgabe.backend.service;

import com.aufgabe.backend.dto.CreateTodoRequest;
import com.aufgabe.backend.dto.TodoResponse;
import com.aufgabe.backend.exception.UserNotFoundException;
import com.aufgabe.backend.model.Todo;
import com.aufgabe.backend.model.User;
import com.aufgabe.backend.repository.TodoRepository;
import com.aufgabe.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;


    //CREATE wrt user_id
    public TodoResponse createTodo(CreateTodoRequest request, Long userId) {


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Id not found!"));

        Todo todo = Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .completed(false)
                .user(user)
                .build();

        return mapToResponse(todoRepository.save(todo));
    }

    //GET TODOS wrt user_id
    public List<TodoResponse> getTodosByUserId(Long userId) {

        return todoRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }



    //UPDATE
    public TodoResponse updateTodo(Long id, CreateTodoRequest request, Long userId) {

        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setDueDate(request.getDueDate());

        return mapToResponse(todoRepository.save(todo));
    }

    //TOGGLE
    public TodoResponse toggleComplete(Long id, Long userId) {

        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setCompleted(!todo.isCompleted());
        return mapToResponse(todoRepository.save(todo));
    }

    //DELETE
    public void deleteTodo(Long id, Long userId) {

        Todo todo = todoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todoRepository.delete(todo);
    }

    //MAPPER
    private TodoResponse mapToResponse(Todo todo) {
        return TodoResponse.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .priority(todo.getPriority())
                .dueDate(todo.getDueDate())
                .build();
    }
}