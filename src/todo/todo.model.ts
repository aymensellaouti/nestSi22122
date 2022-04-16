export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export class Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date = new Date();
  status: TodoStatusEnum = TodoStatusEnum.waiting;
}
