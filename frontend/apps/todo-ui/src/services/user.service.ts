import { inject, Injectable } from "@angular/core";
import { ApiFactoryService } from "@o3r/apis-manager";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { UserApi } from "@todo-sdk/sdk";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userApi = inject(ApiFactoryService).getApi(UserApi);
  private readonly usersQuery = injectQuery(() => ({
    queryKey: ['users'],
    queryFn: () => this.userApi.getUsers({})
  }));

  public readonly users = this.usersQuery.data;
}
