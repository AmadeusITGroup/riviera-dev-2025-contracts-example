import { effect, inject, Injectable } from "@angular/core";
import { ApiFactoryService } from "@o3r/apis-manager";
import { CreateMutationOptions, injectMutation, injectQuery, QueryClient, Updater, type MutationFunction } from "@tanstack/angular-query-experimental";
import { Todo, TodoApi } from "@todo-sdk/sdk";
import { AlertService } from "./alert.service";

export const mutationHelper = <MutationReturnType, MutationArgumentType, QueryType>(
  opts: {
    queryKey: string,
    optimisticUpdateFn: (args: MutationArgumentType) => Updater<QueryType | undefined, QueryType | undefined>,
  },
  queryClient: QueryClient,
  alertService: AlertService
): Pick<CreateMutationOptions<MutationReturnType, Error, MutationArgumentType, { previousValue: QueryType | undefined }>, 'onMutate' | 'onSettled' | 'onError'> => ({
  onMutate: async (args: MutationArgumentType) => {
    await queryClient.cancelQueries({ queryKey: [opts.queryKey] })
    const previousValue = queryClient.getQueryData<QueryType>([opts.queryKey]);
    queryClient.setQueryData<QueryType>(
      [opts.queryKey],
      opts.optimisticUpdateFn(args)
    );
    return { previousValue }
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: [opts.queryKey] }),
  onError: (err, _, context) => {
    alertService.add(err.message);
    queryClient.setQueryData(['todos'], context!.previousValue);
  }
});

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly api = inject(ApiFactoryService).getApi(TodoApi);
  private readonly alertService = inject(AlertService);
  private readonly queryClient = inject(QueryClient);
  private readonly getQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.api.getTodos({})
  }));
  private readonly addMutation = injectMutation(() => ({
    mutationFn: (title: string) => this.api.createTodo({ BaseTodo: { title} }),
    mutationKey: ['createTodo'],
    ...mutationHelper<Todo, string, Todo[]>(
      {
        queryKey: 'todos',
        optimisticUpdateFn: (title) => (old) => (old || []).concat({
          id: 'tmp-id',
          title,
          createdAt: Date.now()
        })
      },
      this.queryClient,
      this.alertService
    )
  }));
  private readonly updateMutation = injectMutation(() => ({
    mutationFn: (todo: Todo) => this.api.updateTodo({ todoId: todo.id, BaseTodo: todo }),
    mutationKey: ['updateTodo'],
    ...mutationHelper<Todo, Todo, Todo[]>(
      {
        queryKey: 'todos',
        optimisticUpdateFn: (newTodo) => (old) => old?.map((item) => item.id === newTodo.id ? { ...newTodo, completedAt: newTodo.status === 'done' ? Date.now() : undefined } : item)
      },
      this.queryClient,
      this.alertService
    )
  }));
  private readonly deleteMutation = injectMutation(() => ({
    mutationFn: (todoId: string) => this.api.deleteTodo({ todoId }),
    mutationKey: ['deleteTodo'],
    ...mutationHelper<void, string, Todo[]>(
      {
        queryKey: 'todos',
        optimisticUpdateFn: (todoId) => (old) => old?.filter(item => item.id !== todoId)
      },
      this.queryClient,
      this.alertService
    )
  }));

  public readonly todos = this.getQuery.data;

  constructor() {
    effect(() => {
      const error = this.getQuery.error();
      if (error) this.alertService.add(error?.message)
    })
  }

  public addTodo(title: string) {
    this.addMutation.mutate(title);
  }

  public toggleStatus(id: string) {
    const item = this.todos()?.find(item => item.id === id);
    if (!item) {
      this.alertService.add(`Todo with id ${id} not found`);
      return;
    }
    this.updateMutation.mutate({
      ...item,
      status: item.status === 'done' ? 'on_hold' : 'done'
    });
  }

  public deleteTodo(id: string) {
    const item = this.todos()?.find(item => item.id === id);
    if (!item) {
      this.alertService.add(`Todo with id ${id} not found`);
      return;
    }
    this.deleteMutation.mutate(id);
  }

  public changeDueDate(id: string, dueDate: string) {
    const item = this.todos()?.find(item => item.id === id);
    if (!item) {
      this.alertService.add(`Todo with id ${id} not found`);
      return;
    }
    this.updateMutation.mutate({
      ...item,
      dueDate
    });
  }

  public changeAssignedTo(id: string, userId?: string) {
    const item = this.todos()?.find(item => item.id === id);
    if (!item) {
      this.alertService.add(`Todo with id ${id} not found`);
      return;
    }
    this.updateMutation.mutate({
      ...item,
      user: userId
    });
  }
}
