import type {Translation} from '@o3r/core';

export interface TodoListTranslation extends Translation {
  /** Alert label when all items are completed */
  allCompleted: string;
  /** Alert label for remaining items */
  remainingItems: string;
  /** Alert label when no items in the list */
  noItems: string;
}

export const translations: Readonly<TodoListTranslation> = {
  allCompleted: 'app-todo-list.allCompleted',
  remainingItems: 'app-todo-list.remainingItems',
  noItems: 'app-todo-list.noItems'
} as const;
