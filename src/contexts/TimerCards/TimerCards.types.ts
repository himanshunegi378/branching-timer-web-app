export type Task = {
  id: string;
  completed: boolean;
  description: string;
};

export type Timer = {
  id: string;
  name: string;
  time: number;
  options: { audioId?: string };
  tasks: {
    data: { [key: string]: Task };
    order: string[];
  };
};

export type TimerGroup = {
  id: string;
  name: string;
  timers: Timer[];
};

export type TimerCard = {
  id: string;
  timerGroup: TimerGroup;
  looping: Boolean;
  status: 'playing' | 'paused' | 'stopped';
  currentTimer?: { id: string; remainingTime: number; totalTime: number };
};

/**
 * Timercard reducer relate types
 */
export type ActionType =
  | 'INIT'
  | 'SETUP_EMPTY_TIMER'
  | 'ADD_TIMER'
  | 'REMOVE_TIMER'
  | 'EDIT_TIMER'
  | 'ATTACH_AUDIO'
  | 'PAUSE'
  | 'PLAY'
  | 'STOP'
  | 'TIMER_FINISHED'
  | 'TOGGLE_LOOP'
  | 'RENAME_TIMERCARD'
  | 'REMOVE_TIMERCARD';

export type Action = {
  type: ActionType;
  payload: { [key: string]: any };
};
