export type Task = {
  id: number;
  completed: boolean;
  description: string;
};

export type TimerTasksProps = {
  tasks: Array<Task>;
  onEditTask: (EditedTask: Task) => void;
};
