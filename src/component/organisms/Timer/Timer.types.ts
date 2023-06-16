export type TimerProps = {
  onNameChange: (name: string) => void;
  onTimeChange: (time: number) => void;
  onDelete: (id: string) => void;
  id: string;
  name: string;
  time: number;
  active: boolean;
};
