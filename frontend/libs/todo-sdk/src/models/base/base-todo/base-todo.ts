/**
 * Model: BaseTodo
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


import { TodoStatus } from '../todo-status';

export interface BaseTodo {
  /** ID of the user who owns the todo */
  user?: string;
  /** Due date of the todo */
  dueDate?: number;
  /** Title of the todo */
  title: string;
  /** @see TodoStatus */
  status?: TodoStatus;
}


