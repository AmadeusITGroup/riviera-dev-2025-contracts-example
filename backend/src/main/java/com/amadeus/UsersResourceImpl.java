package com.amadeus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.amadeus.services.TodoService;
import com.amadeus.todo.UsersResource;
import com.amadeus.todo.beans.BaseUser;
import com.amadeus.todo.beans.User;

import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.NotFoundException;

public class UsersResourceImpl implements UsersResource {
    @Inject
    TodoService todoService;

    private static final Map<String, User> USERS = new HashMap<>();

    @Override
    public List<User> getUsers() {
        return USERS.values().stream().toList();
    }

    @Override
    public User createUser(@NotNull BaseUser data) {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setName(data.getName());
        USERS.put(user.getId(), user);
        return user;
    }

    @Override
    public User updateUser(String userId, @NotNull BaseUser data) {
        User user = USERS.get(userId);
        if (user == null) throw new NotFoundException("User with ID " + userId + " not found");
        user.setName(data.getName());
        USERS.put(userId, user);
        return user;
    }

    @Override
    public void deleteUser(String userId) {
        User user = USERS.get(userId);
        if (user == null) throw new NotFoundException("User with ID " + userId + " not found");
        todoService.getTodos(userId, null).forEach(todo -> todo.setUser(null));
        USERS.remove(userId);
    }
}
