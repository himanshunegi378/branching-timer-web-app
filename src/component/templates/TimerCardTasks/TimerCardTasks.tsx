import { TimerCard } from '../../../contexts/TimerCards/TimerCards.types';
import { Timer } from '../../organisms/Timer/Timer.component';
import { TrelloItem, TrelloLayout } from '../TrelloLayout';
import { Task } from './TimerCardTask.types';
import { TimerTasks } from './TimerTask';

const generateRandomTask = (count: number) => {
  const tasks: Array<Task> = [];
  for (let i = 0; i < count; i++) {
    tasks.push({
      id: i,
      description: `Task ${i}`,
      completed: false,
    });
  }
  return tasks;
};

export const TimerCardTasks = ({
  timerCardData,
}: {
  timerCardData: TimerCard;
}) => {
  return (
    <TrelloLayout className=''>
      {timerCardData.timerGroup.timers.map((timer) => (
        <TrelloItem className='' key={timer.id}>
          <div
            key={timer.id}
            className='bg-gray-200 p-2 rounded-md shadow-md flex flex-col space-y-2'
          >
            <Timer
              active={false}
              id={timer.id}
              name={timer.name}
              onDelete={() => {}}
              onNameChange={() => {}}
              onTimeChange={() => {}}
              time={timer.time}
            />
            <TimerTasks onEditTask={() => {}} tasks={generateRandomTask(5)} />
          </div>
        </TrelloItem>
      ))}
    </TrelloLayout>
  );
};
