import TimerCardsModule from './TimerCardsModule';

const TimerCards = {
  __init__: ['timerCards'],
  __depends__: ['eventBus', 'dataStore', 'componentRegistry', 'actions'],
  timerCards: ['type', TimerCardsModule],
};

export default TimerCards;
