import { useState } from "react";
import { Task, TimerTasksProps } from "./TimerCardTask.types";

export const TimerTasks = ({ tasks, onEditTask }: TimerTasksProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskDescription, setEditedTaskDescription] = useState("");

  const handleEditTask = (taskId: number, description: string) => {
    setEditingTaskId(taskId);
    setEditedTaskDescription(description);
  };

  const handleSaveTask = (taskId: number) => {
    if (editedTaskDescription.trim() !== "") {
      // Call the onEdit callback with the new task description
      // and reset the editing state
      const editedTask: Task = {
        id: taskId,
        description: editedTaskDescription,
        completed: false,
      };
      onEditTask(editedTask);
      setEditingTaskId(null);
      setEditedTaskDescription("");
    }
  };

  const handleKeyDown = (
    taskId: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSaveTask(taskId);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="bg-gray-200 p-2 rounded-md shadow-md">
          {editingTaskId === task.id ? (
            <input
              type="text"
              value={editedTaskDescription}
              onChange={(event) => setEditedTaskDescription(event.target.value)}
              onKeyDown={(event) => handleKeyDown(task.id, event)}
              autoFocus
              className="outline-none"
            />
          ) : (
            <div>
              {task.description}
              <button
                onClick={() => handleEditTask(task.id, task.description)}
                className="ml-2 text-blue-500"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
