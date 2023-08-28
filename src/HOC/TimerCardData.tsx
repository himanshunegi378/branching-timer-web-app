import { useTimerCard } from '../contexts/TimerCards';
import { TimerCard } from '../contexts/TimerCards/TimerCards.types';

export const TimerCardData = ({
  id,
  render,
}: {
  id: string;
  render: (data?: TimerCard) => JSX.Element;
}) => {
  const { timerCardData } = useTimerCard(id);
  return render(timerCardData);
};
