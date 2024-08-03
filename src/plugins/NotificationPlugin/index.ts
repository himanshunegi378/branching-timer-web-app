import { TimerCard } from '../../contexts/TimerCards/TimerCard';
import { Plugin } from '../Plugin';
// @ts-ignore

export class NotificationPlugin extends Plugin {
  constructor() {
    super(
      'https://raw.githubusercontent.com/himanshunegi378/timerCardsPlugin/main/NotificationPlugin'
    );
  }

  get name(): string {
    return 'Notification Plugin';
  }
}
