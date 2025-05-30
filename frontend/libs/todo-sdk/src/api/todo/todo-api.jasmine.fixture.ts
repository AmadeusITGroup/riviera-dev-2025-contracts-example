import { TodoApi } from './todo-api';

export class TodoApiFixture implements Partial<Readonly<TodoApi>> {

  /** @inheritDoc */
  public readonly apiName = 'TodoApi';

    /**
   * Fixture associated to function createTodo
   */
  public createTodo: jasmine.Spy = jasmine.createSpy('createTodo');
  /**
   * Fixture associated to function deleteTodo
   */
  public deleteTodo: jasmine.Spy = jasmine.createSpy('deleteTodo');
  /**
   * Fixture associated to function getTodos
   */
  public getTodos: jasmine.Spy = jasmine.createSpy('getTodos');
  /**
   * Fixture associated to function updateTodo
   */
  public updateTodo: jasmine.Spy = jasmine.createSpy('updateTodo');
}
