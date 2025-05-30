import { inject, Injectable, signal } from "@angular/core";
import { ApiFactoryService } from "@o3r/apis-manager";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { User, UserApi } from "@todo-sdk/sdk";
import { lastValueFrom } from "rxjs";

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
