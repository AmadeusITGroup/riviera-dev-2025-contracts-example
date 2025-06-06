package com.amadeus.rivieradev.contracts;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.amadeus.rivieradev.contracts.services.TodoService;
import com.amadeus.rivieradev.contracts.api.UsersResource;
import com.amadeus.rivieradev.contracts.api.beans.BaseUser;
import com.amadeus.rivieradev.contracts.api.beans.User;

import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;

public class UsersResourceImpl implements UsersResource {
    @Inject
    TodoService todoService;

    private static final Map<String, User> USERS = new HashMap<>();

    /**
     * For demo purpose
     */
    @Inject
    void onInit() {
        Arrays.asList("Matthieu", "Kilian", "Corinne", "you").forEach(userName -> {
            User user = new User();
            user.setId(userName);
            user.setName(userName);
            USERS.put(user.getId(), user);
        });
    }

    @Override
    public List<User> getUsers() {
        return USERS.values().stream().toList();
    }

    @Override
    public User createUser(@NotNull BaseUser data) {
        if (USERS.values().stream().anyMatch(user -> user.getName().equals(data.getName()))) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.CONFLICT,
                "There is already a User with the name: " + data.getName()
            );
            throw new WebApplicationException(response);
        }
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(data.getName());
        USERS.put(user.getId(), user);
        return user;
    }

    @Override
    public User updateUser(String userId, @NotNull BaseUser data) {
        if (USERS.values().stream().anyMatch(user -> !user.getId().equals(userId) && user.getName().equals(data.getName()))) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.CONFLICT,
                "There is already a User with the name: " + data.getName()
            );
            throw new WebApplicationException(response);
        }
        User user = USERS.get(userId);
        if (user == null) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.NOT_FOUND,
                "User with ID " + userId + " not found"
            );
            throw new WebApplicationException(response);
        }
        user.setName(data.getName());
        USERS.put(userId, user);
        return user;
    }

    @Override
    public void deleteUser(String userId) {
        User user = USERS.get(userId);
        if (user == null) {
            Response response = ErrorResponseBuilder.build(
                Response.Status.NOT_FOUND,
                "User with ID " + userId + " not found"
            );
            throw new WebApplicationException(response);
        }
        todoService.getTodos(userId, null).forEach(todo -> todo.setUser(null));
        USERS.remove(userId);
    }
}
