import { v4 } from 'uuid';
import { TimerCard } from './TimerCard';
import { Task, TimerCard as TimerCardDataType } from './TimerCards.types';

class Timer {
  private timerCard: TimerCard;
  constructor(timerCard: TimerCard) {
    this.timerCard = timerCard;
  }

  private findTimer(timerCardData: TimerCardDataType, timerId: string) {
    return timerCardData.timerGroup.timers.find(
      (timer) => timer.id === timerId
    );
  }

  addTask(timerId: string) {
    this.timerCard.updateCardData((timerCardData) => {
      const timer = this.findTimer(timerCardData, timerId);
      if (timer) {
        const task: Task = {
          id: v4(),
          completed: false,
          description: 'Untitled task',
        };
        timer.tasks.data[task.id] = task;
        timer.tasks.order.push(task.id);
      }
    });
  }

  updateTask(timerId: string, taskId: string, task: Omit<Task, 'id'>) {
    this.timerCard.updateCardData((timerCardData) => {
      const timer = this.findTimer(timerCardData, timerId);
      if (timer) {
        timer.tasks.data[taskId] = { ...task, id: taskId };
      }
    });
  }

  deleteTask(timerId: string, taskId: string) {
    this.timerCard.updateCardData((timerCardData) => {
      const timer = this.findTimer(timerCardData, timerId);
      if (timer) {
        delete timer.tasks.data[taskId];
        timer.tasks.order = timer.tasks.order.filter((id) => id !== taskId);
      }
    });
  }
}

export default Timer;
