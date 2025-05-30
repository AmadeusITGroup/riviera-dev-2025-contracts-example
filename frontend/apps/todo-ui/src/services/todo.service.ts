import { effect, inject, Injectable, signal } from "@angular/core";
import { ApiFactoryService } from "@o3r/apis-manager";
import { injectMutation, injectQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { Todo, TodoApi } from "@todo-sdk/sdk";
import { lastValueFrom } from "rxjs";
import { AlertService } from "./alert.service";

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
    onMutate: async (title) => {
      await this.queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = this.queryClient.getQueryData<Todo[]>(['todos']);
      this.queryClient.setQueryData<Todo[]>(
        ['todos'],
        (old) => (old || []).concat({
          id: 'tmp-id',
          title,
          createdAt: Date.now()
        })
      );
      return { previousTodos }
    },
    onSettled: () => this.queryClient.invalidateQueries({ queryKey: ['todos'] }),
    onError: (err, _, context) => {
      this.alertService.add(err.message);
      this.queryClient.setQueryData(['todos'], context!.previousTodos);
    }
  }));
  private readonly updateMutation = injectMutation(() => ({
    mutationFn: (todo: Todo) => this.api.updateTodo({ todoId: todo.id, BaseTodo: todo }),
    mutationKey: ['updateTodo'],
    onMutate: async (newTodo) => {
      await this.queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] })
      const previousTodos = this.queryClient.getQueryData(['todos'])
      this.queryClient.setQueryData<Todo[]>(
        ['todos'],
        (old) => old?.map((item) => item.id === newTodo.id ? { ...newTodo, completedAt: newTodo.status === 'done' ? Date.now() : undefined } : item)
      );
      return { previousTodos, newTodo }
    },
    onError: (err, _, context) => {
      this.alertService.add(err.message);
      this.queryClient.setQueryData(
        ['todos'],
        context!.previousTodos,
      )
    },
    onSettled: (newTodo) => {
      this.queryClient.invalidateQueries({ queryKey: ['todos', newTodo?.id] })
    },
  }));
  private readonly deleteMutation = injectMutation(() => ({
    mutationFn: (todoId: string) => this.api.deleteTodo({ todoId }),
    mutationKey: ['deleteTodo'],
    onMutate: async (todoId) => {
      await this.queryClient.cancelQueries({ queryKey: ['todos', todoId] })
      const previousTodos = this.queryClient.getQueryData(['todos']);
      this.queryClient.setQueryData<Todo[]>(
        ['todos'],
        (old) => old?.filter(item => item.id !== todoId)
      );
      return { previousTodos, todoId }
    },
    onError: (err, _, context) => {
      this.alertService.add(err.message);
      this.queryClient.setQueryData(
        ['todos'],
        context!.previousTodos,
      )
    },
    onSettled: (todoId) => {
      this.queryClient.invalidateQueries({ queryKey: ['todos', todoId] })
    },
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

  public changeDueDate(id: string, dueDate?: number) {
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
