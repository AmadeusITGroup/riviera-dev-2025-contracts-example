package com.amadeus.rivieradev.contracts;

import java.util.List;

import com.amadeus.rivieradev.contracts.services.TodoService;
import com.amadeus.rivieradev.contracts.api.api.TodosApi;
import com.amadeus.rivieradev.contracts.api.models.BaseTodo;
import com.amadeus.rivieradev.contracts.api.models.Todo;
import com.amadeus.rivieradev.contracts.api.models.TodoStatus;

import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;

public class TodosResourceImpl implements TodosApi {
    @Inject
    TodoService todoService;

    @Override
    public Todo createTodo(@NotNull BaseTodo data) {
        return todoService.createTodo(data);
    }

    @Override
    public Todo updateTodo(String todoId, @NotNull BaseTodo data) {
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