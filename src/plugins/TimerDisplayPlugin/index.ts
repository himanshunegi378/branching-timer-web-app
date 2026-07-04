import { Plugin } from '../Plugin';
export class TimerDisplayPlugin extends Plugin {
  constructor() {
    super(
      'https://raw.githubusercontent.com/himanshunegi378/timerCardsPlugin/main/TimerDisplayPlugin/plugin'
    );
  }

  get name(): string {
    return 'Timer Display Plugin';
  }
}
