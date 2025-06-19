import type {Configuration} from '@o3r/core';
import {computeItemIdentifier} from '@o3r/core';

/**
 * Configuration for TodoItem component
 */
export interface TodoItemConfig extends Configuration {
  /**
   * Display mode for the Todo item status
   */
  sideBorderMode: boolean
}

export const TODO_ITEM_DEFAULT_CONFIG: Readonly<TodoItemConfig> = {
  sideBorderMode: false
} as const;

export const TODO_ITEM_CONFIG_ID = computeItemIdentifier('TodoItemConfig', 'todo-ui');
