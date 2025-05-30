package com.amadeus.services;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.amadeus.todo.TodosResource;
import com.amadeus.todo.beans.BaseTodo;
import com.amadeus.todo.beans.Todo;
import com.amadeus.todo.beans.TodoStatus;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class TodoService {

    private static final Map<String, Todo> TODOS = new HashMap<>();

    public Todo createTodo(@NotNull BaseTodo data) {
        Date now = new Date();
        Todo todo = new Todo();
        todo.setId(UUID.randomUUID().toString());
        todo.setCreatedAt(now);
        todo.setTitle(data.getTitle());
        todo.setUser(data.getUser());
        todo.setDueDate(data.getDueDate());
        if (data.getStatus() == TodoStatus.done) {
            todo.setCompletedAt(now);
        }
        todo.setStatus(data.getStatus() != null ? data.getStatus() : TodoStatus.on_hold);
        TODOS.put(todo.getId(), todo);
        return todo;
    }

    public Todo updateTodo(String todoId, com.amadeus.todo.beans.@NotNull BaseTodo data) {
        Todo todo = TODOS.get(todoId);
        if (todo == null)  throw new NotFoundException("Todo with ID " + todoId + " not found");
        if (todo.getStatus() == TodoStatus.done && data.getStatus() != TodoStatus.done) {
            todo.setCompletedAt(null);
        }
        if (data.getStatus() == TodoStatus.done) {
            todo.setCompletedAt(new Date());
        }
        todo.setTitle(data.getTitle());
        todo.setUser(data.getUser());
        todo.setDueDate(data.getDueDate());
        todo.setStatus(data.getStatus() != null ? data.getStatus() : TodoStatus.on_hold);
        TODOS.put(todoId, todo);
        return todo;
    }

    public void deleteTodo(String todoId) {
        Todo todo = TODOS.get(todoId);
        if (todo == null)  throw new NotFoundException("Todo with ID " + todoId + " not found");
        TODOS.remove(todoId);
    }

    public List<Todo> getTodos(String user, TodoStatus status) {
        return TODOS.values().stream()
            .filter(todo ->
                (status == null || todo.getStatus().equals(status))
                && (user == null || todo.getUser().equals(user))
            ).toList();
    }
}