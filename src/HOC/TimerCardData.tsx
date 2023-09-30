import { useTimerCard } from '../contexts/TimerCards';
import { UseTimerCard } from '../contexts/TimerCards/hooks/useTimerCard';

export const TimerCardData = ({
  id,
  render,
}: {
  id: string;
  render: (useTimerCard: UseTimerCard) => JSX.Element;
}) => {
  const timerCard = useTimerCard(id);
  return render(timerCard);
};
