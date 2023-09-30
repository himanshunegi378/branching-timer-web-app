import { UseTimerCard } from '../../../contexts/TimerCards/hooks/useTimerCard';
import { Button } from '../../atoms/Button/Button.atom';
import useTimer from '../../hooks/useTimer';
import { Timer } from '../../organisms/Timer/Timer.component';
import { TrelloItem, TrelloLayout } from '../TrelloLayout';
import { TimerTasks } from './TimerTask';

export const TimerCardTasks = ({ timerCard }: { timerCard: UseTimerCard }) => {
  const timerProps = useTimer(timerCard.timerCardData?.id!);

  return (
    <TrelloLayout className=''>
      {timerCard.timerCardData?.timerGroup.timers.map((timer) => {
        console.log({ timer });
        const tasks = timer.tasks.order.map(
          (taskId) => timer.tasks.data[taskId]
        );

        return (
          <TrelloItem className='w-52' key={timer.id}>
            <div
              key={timer.id}
              className='bg-white border border-blue-200 p-4 rounded-lg shadow-md flex flex-col space-y-4'
            >
              <Timer {...timerProps(timer.id)} />
              <TimerTasks
                onEditTask={(modifiedTask) => {
                  timerCard.actions?.timer.updateTask(
                    timer.id,
                    modifiedTask.id,
                    modifiedTask
                  );
                }}
                onDelete={(taskId) =>
                  timerCard.actions?.timer.deleteTask(timer.id, taskId)
                }
                tasks={tasks}
              />
              <Button
                size='sm'
                color='secondary'
                variant='solid'
                onClick={() => {
                  timerCard.actions?.timer.addTask(timer.id);
                }}
              >
                Add Task
              </Button>
            </div>
          </TrelloItem>
        );
      })}
    </TrelloLayout>
  );
};
