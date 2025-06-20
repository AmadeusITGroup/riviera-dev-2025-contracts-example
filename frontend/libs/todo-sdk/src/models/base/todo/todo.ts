/**
 * Model: Todo
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


import { TodoStatus } from '../todo-status';

export interface Todo {
  /** ID of the user who owns the todo */
  user?: string;
  /** Due date of the todo */
  dueDate?: number;
  /** Title of the todo */
  title: string;
  /** @see TodoStatus */
  status?: TodoStatus;
  /** Unique identifier */
  id: string;
  /** Creation timestamp of the todo */
  createdAt: string;
  /** Completion timestamp of the todo */
  completedAt?: string;
}


