import { User } from '../../models/base/user/index';

import { UserApi, UserApiCreateUserRequestData, UserApiDeleteUserRequestData, UserApiGetUsersRequestData, UserApiUpdateUserRequestData } from './user-api';

export class UserApiFixture implements Partial<Readonly<UserApi>> {

  /** @inheritDoc */
  public readonly apiName = 'UserApi';

    /**
   * Fixture associated to function createUser
   */
  public createUser: jest.Mock<Promise<User>, [UserApiCreateUserRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteUser
   */
  public deleteUser: jest.Mock<Promise<void>, [UserApiDeleteUserRequestData]> = jest.fn();
  /**
   * Fixture associated to function getUsers
   */
  public getUsers: jest.Mock<Promise<User[]>, [UserApiGetUsersRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateUser
   */
  public updateUser: jest.Mock<Promise<User>, [UserApiUpdateUserRequestData]> = jest.fn();
}

