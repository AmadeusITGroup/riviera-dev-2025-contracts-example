package com.amadeus;

import jakarta.ws.rs.core.Response;

import com.amadeus.todo.beans.Error;

public final class ErrorResponseBuilder {
    public static Response build(Response.Status status, String message) {
        Error error = new Error();
        error.setCode(status.getStatusCode());
        error.setMessage(status.getReasonPhrase() + ": " + message);
        Response response = Response.status(status).entity(error).build();
        return response;
    }
}
