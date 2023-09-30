import { Task } from '../../../contexts/TimerCards/TimerCards.types';

export type TimerTasksProps = {
  tasks: Array<Task>;
  onEditTask: (EditedTask: Task) => void;
  onDelete: (taskId: string) => void;
};
