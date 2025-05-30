import { Todo } from '../../models/base/todo/index';

import { TodoApi, TodoApiCreateTodoRequestData, TodoApiDeleteTodoRequestData, TodoApiGetTodosRequestData, TodoApiUpdateTodoRequestData } from './todo-api';

export class TodoApiFixture implements Partial<Readonly<TodoApi>> {

  /** @inheritDoc */
  public readonly apiName = 'TodoApi';

    /**
   * Fixture associated to function createTodo
   */
  public createTodo: jest.Mock<Promise<Todo>, [TodoApiCreateTodoRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteTodo
   */
  public deleteTodo: jest.Mock<Promise<void>, [TodoApiDeleteTodoRequestData]> = jest.fn();
  /**
   * Fixture associated to function getTodos
   */
  public getTodos: jest.Mock<Promise<Todo[]>, [TodoApiGetTodosRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateTodo
   */
  public updateTodo: jest.Mock<Promise<Todo>, [TodoApiUpdateTodoRequestData]> = jest.fn();
}

