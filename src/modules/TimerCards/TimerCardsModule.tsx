import { DataStore } from '../DataStore';
import { Event } from '../Event';
import { TimerCard } from './TimerCard';
import { TimerCardLocalStorage } from '../../lib/timerCardStorage/TimerCardLocalStorage';
import { v4 } from 'uuid';
import { ComponentRegistry } from '../ComponentRegistry';
import { ActionType } from '../Actions/Actions';
import { TimerCardBoard } from './TimerCardBoard';

export default class TimerCardsManager {
  private eventBus: Event;
  private dataStore: DataStore<Record<string, TimerCard>>;
  private componentRegistry: ComponentRegistry;

  constructor(
    eventBus: Event,
    dataStore: DataStore<Record<string, TimerCard>>,
    componentRegistry: ComponentRegistry,
    actions: ActionType
  ) {
    this.eventBus = eventBus;
    this.dataStore = dataStore;
    this.componentRegistry = componentRegistry;
    this.dataStore.setData('timerCardsStore', {});
    actions.register('timerCard/create', this.createTimerCard.bind(this));
    actions.register('timerCard/delete', this.deleteTimerCard.bind(this));
    componentRegistry.register('board', 'TimerCardBoard', TimerCardBoard, 0);

    this.init();
  }

  async init() {
    window.addEventListener('beforeunload', this.componentWillUnmount);
    window.addEventListener('pagehide', this.componentWillUnmount);

    await this.componentDidMount();
  }

  async createTimerCard() {
    const id = v4();
    const timerCardStorage = new TimerCardLocalStorage();

    const timerCard = new TimerCard(id, timerCardStorage, this.eventBus);

    await this.saveTimerCard(timerCard);

    this.eventBus.emit('timerCard/created', timerCard);
    return timerCard;
  }

  async saveTimerList() {
    const timerCardsList = Object.keys(
      this.dataStore.getData('timerCardsStore') || {}
    );
    localStorage.setItem('timerCardIds', timerCardsList.join(','));
  }

  async deleteTimerCard(id: string) {
    const timerCard = this.getTimerCard(id);
    if (timerCard) {
      await timerCard.onTimerCardDelete();
      this.deleteTimerCardFromStore(id);
      await this.saveTimerList();
      this.eventBus.emit('timerCard/deleted', id);
    }
  }

  getTimerCard(id: string) {
    return this.dataStore.getData('timerCardsStore')?.[id];
  }

  private async saveTimerCard(timerCard: TimerCard) {
    await timerCard.save();
    this.dataStore.setProduceData((draft) => {
      // @ts-ignore
      draft['timerCardsStore'][timerCard.timerCardId] = timerCard;
    });
    await this.saveTimerList();
  }

  private deleteTimerCardFromStore(id: string) {
    this.dataStore.setProduceData((draft) => {
      delete draft['timerCardsStore'][id];
    });
  }

  private async componentWillUnmount() {
    const answer = window.confirm(
      'Are you sure you want to delete all timer cards?'
    );
    if (!answer) return;
    const timerCardsList = Object.keys(
      this.dataStore.getData('timerCardsStore') || {}
    );
    await Promise.all(
      timerCardsList.map((id) => {
        const timerCard = this.getTimerCard(id);
        if (timerCard) {
          return timerCard.save();
        }
        return null;
      })
    );
    localStorage.setItem('timerCardIds', timerCardsList.join(','));
  }

  private async componentDidMount() {
    const timerCardsList =
      localStorage.getItem('timerCardIds')?.split(',') || [];
    const timerCards = await Promise.all(
      timerCardsList.map((id) => {
        const timerCard = new TimerCard(
          id,
          new TimerCardLocalStorage(),
          this.eventBus
        );
        return timerCard;
      })
    );
    this.dataStore.setProduceData((draft) => {
      // @ts-ignore
      draft['timerCardsStore'] = timerCards.reduce(
        (acc, timerCard) => ({ ...acc, [timerCard.timerCardId]: timerCard }),
        {}
      );
    });
  }
}
