export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  dueDate?: number;
  createdAt: number;
  assignedTo?: string;
}
