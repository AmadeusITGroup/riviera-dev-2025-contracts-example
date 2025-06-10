package com.amadeus.rivieradev.contracts;

import java.util.List;
import com.amadeus.rivieradev.contracts.services.UserService;
import com.amadeus.rivieradev.contracts.api.UsersResource;
import com.amadeus.rivieradev.contracts.api.beans.BaseUser;
import com.amadeus.rivieradev.contracts.api.beans.User;

import jakarta.inject.Inject;
import jakarta.validation.constraints.NotNull;

public class UsersResourceImpl implements UsersResource {
    @Inject
    UserService userService;

    @Override
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @Override
    public User createUser(@NotNull BaseUser data) {
        return userService.createUser(data);
    }

    @Override
    public User updateUser(String userId, @NotNull BaseUser data) {
        return userService.updateUser(userId, data);
    }

    @Override
    public void deleteUser(String userId) {
        userService.deleteUser(userId);
    }
}
