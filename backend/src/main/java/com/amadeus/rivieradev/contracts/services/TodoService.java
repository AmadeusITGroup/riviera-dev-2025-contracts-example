package com.amadeus.rivieradev.contracts.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.amadeus.rivieradev.contracts.api.models.BaseTodo;
import com.amadeus.rivieradev.contracts.api.models.Todo;
import com.amadeus.rivieradev.contracts.api.models.TodoStatus;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
public class TodoService {
    @Inject
    UserService userService;

    private static final Map<String, Todo> TODOS = new HashMap<>();

    /**
     * For demo purpose
     */
    @Inject
    void onInit() {
        List<String> defaultTodoTitles = Arrays.asList(
            "Prepare the RivieraDev demo...",
            "Go to RivieraDev!",
            "Celebrate the end of RivieraDev with a beer!",
            "Start a new project with contracts"
        );
        int index = 0;
        Instant now = Instant.now();
        for(Iterator<String> it = defaultTodoTitles.iterator(); it.hasNext(); index++) {
            String todoTitle = it.next();
            Todo todo = new Todo();
            todo.setId(UUID.randomUUID().toString());
            todo.setCreatedAt(now);
            todo.setTitle(todoTitle);
            todo.setStatus(TodoStatus.ON_HOLD);
            if (index == 0) {
                todo.setStatus(TodoStatus.DONE);
                todo.setCompletedAt(now);
            }
            if (index == 1) {
                /** Start of the RivieraDev conference */
                todo.setDueDate(LocalDate.of(2025, Month.JULY, 7));
            }
            if (index == 2) {
                /** End of the RivieraDev conference */
                todo.setDueDate(LocalDate.of(2025, Month.JULY, 9));
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
        Instant now = Instant.now();
        Todo todo = new Todo();
        todo.setId(UUID.randomUUID().toString());
        todo.setCreatedAt(now);
        todo.setTitle(data.getTitle());
        String userId = data.getUser();
        if (userId != null) {
            if (userService.getUserById(userId) != null) {
                todo.setUser(userId);
            } else {
                Response response = ErrorResponseBuilder.build(
                    Response.Status.BAD_REQUEST,
                    "The user (" + userId + ") does not exist"

                );
                throw new WebApplicationException(response);
            }
        }
        todo.setDueDate(data.getDueDate());
        if (data.getStatus() == TodoStatus.DONE) {
            todo.setCompletedAt(now);
        }
        todo.setStatus(data.getStatus() != null ? data.getStatus() : TodoStatus.ON_HOLD);
        TODOS.put(todo.getId(), todo);
        return todo;
    }

    public Todo updateTodo(String todoId, @NotNull BaseTodo data) {
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
        if (todo.getStatus() == TodoStatus.DONE && data.getStatus() != TodoStatus.DONE) {
            todo.setCompletedAt(null);
        }
        if (data.getStatus() == TodoStatus.DONE) {
            todo.setCompletedAt(Instant.now());
        }
        todo.setTitle(data.getTitle());
        
        String userId = data.getUser();
        if (userId != null) {
            if (userService.getUserById(userId) != null) {
                todo.setUser(userId);
            } else {
                Response response = ErrorResponseBuilder.build(
                    Response.Status.BAD_REQUEST,
                    "The user (" + userId + ") does not exist"

                );
                throw new WebApplicationException(response);
            }
        }
        todo.setDueDate(data.getDueDate());
        todo.setStatus(data.getStatus() != null ? data.getStatus() : TodoStatus.ON_HOLD);
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