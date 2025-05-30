package com.amadeus;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.amadeus.services.TodoService;
import com.amadeus.todo.TodosResource;
import com.amadeus.todo.beans.BaseTodo;
import com.amadeus.todo.beans.Todo;
import com.amadeus.todo.beans.TodoStatus;

import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;

public class TodosResourceImpl implements TodosResource {
    @Inject
    TodoService todoService;

    @Override
    public Todo createTodo(@NotNull BaseTodo data) {
        return todoService.createTodo(data);
    }

    @Override
    public Todo updateTodo(String todoId, com.amadeus.todo.beans.@NotNull BaseTodo data) {
        return todoService.updateTodo(todoId, data);
    }

    @Override
    public void deleteTodo(String todoId) {
        todoService.deleteTodo(todoId);
    }

    @Override
    public List<Todo> getTodos(String user, TodoStatus status) {
        return todoService.getTodos(user, status);
    }
}