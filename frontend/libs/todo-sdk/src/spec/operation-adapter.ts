import {PathObject} from '@ama-sdk/core';

/* eslint-disable max-len */
export const OPERATION_ADAPTER: PathObject[] = [{
      path: "/todos",regexp: new RegExp('^/todos(?:/(?=$))?$'),operations: [{"method":"post","operationId":"createTodo"},{"method":"get","operationId":"getTodos"}]
    },{
      path: "/todos/{todoId}",regexp: new RegExp('^/todos/((?:[^/]+?))(?:/(?=$))?$'),operations: [{"method":"put","operationId":"updateTodo"},{"method":"delete","operationId":"deleteTodo"}]
    },{
      path: "/users",regexp: new RegExp('^/users(?:/(?=$))?$'),operations: [{"method":"post","operationId":"createUser"},{"method":"get","operationId":"getUsers"}]
    },{
      path: "/users/{userId}",regexp: new RegExp('^/users/((?:[^/]+?))(?:/(?=$))?$'),operations: [{"method":"put","operationId":"updateUser"},{"method":"delete","operationId":"deleteUser"}]
    }];
/* eslint-enable max-len */
