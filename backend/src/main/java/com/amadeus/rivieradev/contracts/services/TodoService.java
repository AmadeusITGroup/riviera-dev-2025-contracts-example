package com.amadeus.rivieradev.contracts.services;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.amadeus.rivieradev.contracts.ErrorResponseBuilder;
import com.amadeus.rivieradev.contracts.api.beans.BaseTodo;
import com.amadeus.rivieradev.contracts.api.beans.Todo;
import com.amadeus.rivieradev.contracts.api.beans.TodoStatus;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class TodoService {
    private static final String DATE_FORMAT = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$";

    private static final Map<String, Todo> TODOS;
    /**
     * For demo purpose
     */
    static {
        TODOS = new HashMap<>();
        List<String> defaultTodoTitles = Arrays.asList(
            "Prepare the RivieraDev demo...",
            "Go to RivieraDev!",
            "Celebrate the end of RivieraDev with a beer!",
            "Start a new project with contracts"
        );
        int index = 0;
        Date now = new Date();
        for(Iterator<String> it = defaultTodoTitles.iterator(); it.hasNext(); index++) {
            String todoTitle = it.next();
            Todo todo = new Todo();
            todo.setId(UUID.randomUUID().toString());
            todo.setCreatedAt(now);
            todo.setTitle(todoTitle);
            todo.setStatus(TodoStatus.on_hold);
            if (index == 0) {
                todo.setStatus(TodoStatus.done);
                todo.setCompletedAt(now);
            }
            if (index == 1) {
                /** Start of the RivieraDev conference */
                todo.setDueDate("2025-07-07");
            }
            if (index == 2) {
                /** End of the RivieraDev conference */
                todo.setDueDate("2025-07-09");
            }
            TODOS.put(todo.getId(), todo);
        };
    }

    public Todo createTodo(@NotNull BaseTodo data) {
        if (TODOS.values().stream().anyMatch(todo -> todo.getTitle().equals(data.getTitle()))) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.CONFLICT,
                "There is already a Todo with the title: " + data.getTitle()
            );
            throw new WebApplicationException(response);
        }
        Date now = new Date();
        Todo todo = new Todo();
        todo.setId(UUID.randomUUID().toString());
        todo.setCreatedAt(now);
        todo.setTitle(data.getTitle());
        todo.setUser(data.getUser());
        if (data.getDueDate() != null && !data.getDueDate().matches(DATE_FORMAT)) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.BAD_REQUEST,
                "The format of dueDate does not respect yyyy-mm-dd"
            );
            throw new WebApplicationException(response);
        }
        todo.setDueDate(data.getDueDate());
        if (data.getStatus() == TodoStatus.done) {
            todo.setCompletedAt(now);
        }
        todo.setStatus(data.getStatus() != null ? data.getStatus() : TodoStatus.on_hold);
        TODOS.put(todo.getId(), todo);
        return todo;
    }

    public Todo updateTodo(String todoId, com.amadeus.rivieradev.contracts.api.beans.@NotNull BaseTodo data) {
        if (TODOS.values().stream().anyMatch(todo -> !todo.getId().equals(todoId) && todo.getTitle().equals(data.getTitle()))) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.CONFLICT,
                "There is already a Todo with the title: " + data.getTitle()
            );
            throw new WebApplicationException(response);
        }
        Todo todo = TODOS.get(todoId);
        if (todo == null) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.NOT_FOUND,
                "Todo with ID " + todoId + " not found"
            );
            throw new WebApplicationException(response);
        }
        if (todo.getStatus() == TodoStatus.done && data.getStatus() != TodoStatus.done) {
            todo.setCompletedAt(null);
        }
        if (data.getStatus() == TodoStatus.done) {
            todo.setCompletedAt(new Date());
        }
        todo.setTitle(data.getTitle());
        todo.setUser(data.getUser());
        if (data.getDueDate() != null && !data.getDueDate().matches(DATE_FORMAT)) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.BAD_REQUEST,
                "The format of dueDate does not respect yyyy-mm-dd"
            );
            throw new WebApplicationException(response);
        }
        todo.setDueDate(data.getDueDate());
        todo.setStatus(data.getStatus() != null ? data.getStatus() : TodoStatus.on_hold);
        TODOS.put(todoId, todo);
        return todo;
    }

    public void deleteTodo(String todoId) {
        Todo todo = TODOS.get(todoId);
        if (todo == null) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.NOT_FOUND,
                "Todo with ID " + todoId + " not found"
            );
            throw new WebApplicationException(response);
        }
        TODOS.remove(todoId);
    }

    public List<Todo> getTodos(String user, TodoStatus status) {
        return TODOS.values().stream()
            .filter(todo ->
                (status == null || todo.getStatus().equals(status))
                && (user == null || todo.getUser().equals(user))
            )
            .sorted((a, b) -> {
                if (a.getDueDate() == null) return 1;
                if (b.getDueDate() == null) return -1;
                return a.getDueDate().compareTo(b.getDueDate());
            })
            .toList();
    }
}