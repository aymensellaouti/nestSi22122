export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export class Todo {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: TodoStatusEnum;
}
