import type {Configuration} from '@o3r/core';
import {computeItemIdentifier} from '@o3r/core';

export interface TodoItemConfig extends Configuration {
  statusMode: 'side-border' | 'line-through'
}

export const TODO_ITEM_DEFAULT_CONFIG: Readonly<TodoItemConfig> = {
  statusMode: 'side-border'
} as const;

export const TODO_ITEM_CONFIG_ID = computeItemIdentifier('TodoItemConfig', 'todo-ui');
