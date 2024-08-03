import { useState } from 'react';
import { Task } from '../../../contexts/TimerCards/TimerCards.types';

export const TaskEdit = ({
  task,
  onEditTask,
}: {
  task: Task;
  onEditTask: (task: Task) => void;
}) => {
  const [editedTaskDescription, setEditedTaskDescription] = useState(
    task.description
  );

  const handleSaveTask = () => {
    if (editedTaskDescription.trim() !== '') {
      onEditTask({ ...task, description: editedTaskDescription });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveTask();
    }
  };

  return (
    <input
      type='text'
      value={editedTaskDescription}
      onChange={(event) => setEditedTaskDescription(event.target.value)}
      onBlur={handleSaveTask}
      onKeyDown={handleKeyDown}
      autoFocus
      className='outline-none border-blue-200 shadow-sm p-2 rounded-md'
      style={{
        border: 'none',
        background: 'none',
        outline: 'none',
        fontSize: '1rem',
        minWidth: 0,
        width: '100%',
      }}
    />
  );
};
