import { ReactNode, useState } from 'react';
import { TimerTasksProps } from './TimerCardTask.types';
import { Task } from '../../../contexts/TimerCards/TimerCards.types';
import { CloseButton } from '../../molecules/CloseButton/CloseButton.component';
import { Popup } from '../../atoms/Popup';

/**
 * Check if the content of an HTML element is overflowing its container.
 * @param element - The HTML element to check.
 * @return {boolean} - Returns true if the content is overflowing, otherwise false.
 */
const isContentOverflowing = (element: HTMLElement): boolean => {
  return element.scrollWidth > element.clientWidth;
};

export const TimerTasks = ({
  tasks,
  onEditTask,
  onDelete,
}: TimerTasksProps) => {
  const [editingTaskId, setEditingTaskId] = useState<Task['id'] | null>(null);
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [popupData, setPopupData] = useState<{
    anchor: HTMLElement | null;
    reactNode: ReactNode;
  }>({
    anchor: null,
    reactNode: null,
  });

  const handleEditTask = (taskId: Task['id'], description: string) => {
    setEditingTaskId(taskId);
    setEditedTaskDescription(description);
  };

  const handleSaveTask = (taskId: Task['id']) => {
    if (editedTaskDescription.trim() !== '') {
      // Call the onEdit callback with the new task description
      // and reset the editing state
      const editedTask: Task = {
        id: taskId,
        description: editedTaskDescription,
        completed: false,
      };
      onEditTask(editedTask);
      setEditingTaskId(null);
      setEditedTaskDescription('');
    }
  };

  const handleKeyDown = (
    taskId: Task['id'],
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      handleSaveTask(taskId);
    }
  };

  return (
    <div className='flex flex-col space-y-4'>
      {tasks.map((task) => (
        <div
          key={task.id}
          className='bg-white p-4 rounded-lg shadow-md border border-blue-200'
        >
          {editingTaskId === task.id ? (
            <input
              type='text'
              value={editedTaskDescription}
              onChange={(event) => setEditedTaskDescription(event.target.value)}
              onBlur={(event) => handleSaveTask(task.id)}
              onKeyDown={(event) => handleKeyDown(task.id, event)}
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
          ) : (
            <div className='flex justify-between'>
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                className='flex-1 text-base transition-colors duration-200 hover:bg-blue-500 hover:text-white rounded p-1'
                onClick={() => handleEditTask(task.id, task.description)}
                onMouseEnter={(e) => {
                  if (!isContentOverflowing(e.currentTarget)) {
                    return;
                  }
                  setPopupData({
                    anchor: e.currentTarget,
                    reactNode: <div> {task.description}</div>,
                  });
                }}
                onMouseLeave={(e) => {
                  setPopupData({
                    anchor: null,
                    reactNode: null,
                  });
                }}
              >
                {task.description}
              </div>
              <span>
                <CloseButton size='sm' onClick={() => onDelete(task.id)} />
              </span>
            </div>
          )}
        </div>
      ))}
      <Popup
        isOpen={Boolean(popupData.anchor)}
        anchorEl={popupData.anchor}
        onClose={() => {
          setPopupData({
            anchor: null,
            reactNode: null,
          });
        }}
      >
        <div className='bg-white border border-gray-200 rounded-md p-3 shadow-lg text-lg tracking-wider'>
          {popupData.reactNode}
        </div>
      </Popup>
    </div>
  );
};
