package com.amadeus.rivieradev.contracts;

import java.util.List;

import com.amadeus.rivieradev.contracts.services.TodoService;
import com.amadeus.rivieradev.contracts.api.TodosResource;
import com.amadeus.rivieradev.contracts.api.beans.BaseTodo;
import com.amadeus.rivieradev.contracts.api.beans.Todo;
import com.amadeus.rivieradev.contracts.api.beans.TodoStatus;

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
    public Todo updateTodo(String todoId, com.amadeus.rivieradev.contracts.api.beans.@NotNull BaseTodo data) {
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