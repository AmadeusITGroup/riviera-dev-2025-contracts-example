import {PathObject} from '@ama-sdk/core';

/* eslint-disable max-len */
export const OPERATION_ADAPTER: PathObject[] = [{
      path: "/tout-doux",regexp: new RegExp('^/tout-doux(?:/(?=$))?$'),operations: [{"method":"post","operationId":"createTodo"},{"method":"get","operationId":"getTodos"}]
    },{
      path: "/tout-doux/{todoId}",regexp: new RegExp('^/tout-doux/((?:[^/]+?))(?:/(?=$))?$'),operations: [{"method":"put","operationId":"updateTodo"},{"method":"delete","operationId":"deleteTodo"}]
    },{
      path: "/users",regexp: new RegExp('^/users(?:/(?=$))?$'),operations: [{"method":"post","operationId":"createUser"},{"method":"get","operationId":"getUsers"}]
    },{
      path: "/users/{userId}",regexp: new RegExp('^/users/((?:[^/]+?))(?:/(?=$))?$'),operations: [{"method":"put","operationId":"updateUser"},{"method":"delete","operationId":"deleteUser"}]
    }];
/* eslint-enable max-len */
