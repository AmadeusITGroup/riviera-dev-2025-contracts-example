import type { Translation } from '@o3r/core';

export interface TodoItemTranslation extends Translation {
    completedAt: string;
    toggleDatepickerAxLabel: string;
    assignedToLabel: string;
    toggleStatusLabel: string;
    deleteLabel: string;
}

export const translations: Readonly<TodoItemTranslation> = {
    completedAt: 'app-todo-item.completedAt',
    toggleDatepickerAxLabel: 'app-todo-item.toggleDatepickerAxLabel',
    assignedToLabel: 'app-todo-item.assignedToLabel',
    toggleStatusLabel: 'app-todo-item.toggleStatusLabel',
    deleteLabel: 'app-todo-item.deleteLabel'
} as const;
