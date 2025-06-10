import { UserApi } from './user-api';

export class UserApiFixture implements Partial<Readonly<UserApi>> {

  /** @inheritDoc */
  public readonly apiName = 'UserApi';

    /**
   * Fixture associated to function createUser
   */
  public createUser: jasmine.Spy = jasmine.createSpy('createUser');
  /**
   * Fixture associated to function deleteUser
   */
  public deleteUser: jasmine.Spy = jasmine.createSpy('deleteUser');
  /**
   * Fixture associated to function getUsers
   */
  public getUsers: jasmine.Spy = jasmine.createSpy('getUsers');
  /**
   * Fixture associated to function updateUser
   */
  public updateUser: jasmine.Spy = jasmine.createSpy('updateUser');
}
