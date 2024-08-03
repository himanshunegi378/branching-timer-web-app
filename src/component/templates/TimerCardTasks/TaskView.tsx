import { Task } from '../../../contexts/TimerCards/TimerCards.types';
import { CloseButton } from '../../molecules/CloseButton/CloseButton.component';

// TaskView Component
export const TaskView = ({
  task,
  readOnly,
  onDelete,
}: {
  task: Task;
  readOnly: boolean;
  onDelete: () => void;
}) => {
  return (
    <div className='flex justify-between'>
      <div
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        className={`flex-1 text-base transition-colors duration-200 rounded p-1 ${
          readOnly ? '' : 'hover:bg-blue-500 hover:text-white'
        }`}
      >
        {task.description}
      </div>
      {!readOnly && (
        <span>
          <CloseButton size='sm' onClick={onDelete} />
        </span>
      )}
    </div>
  );
};
