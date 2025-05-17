import { useEffect } from 'react';
import { useInjector } from '../../../contexts/InjectorContext';
import useDataStore from '../../../hooks/useDataStore';
import { TimerCard } from '../../TimerCards/TimerCard';
import { get } from 'lodash';
import { SoundPlayer } from '../../../lib/soundPlayer/SoundPlayer';

const AlarmTonePlayer = () => {
  const injector = useInjector();
  const dataStore = injector.get('dataStore') as any;
  const timerCardsModule = injector.get('timerCards') as any;
  const audioStoreModule = injector.get('audioStore') as any;
  const timerCardsStore = useDataStore(dataStore, 'timerCardsStore');
  const alarmStore = useDataStore(dataStore, 'alarmStore');

  useEffect(() => {
    if (alarmStore && timerCardsStore) {
      const eventsList: Array<{
        timerCard: TimerCard;
        handleTimerFinished: (timerId: string) => void;
      }> = [];

      Object.values<TimerCard>(timerCardsStore).forEach((timerCard) => {
        const handleTimerFinished = async (timerId: string) => {
          const alarmId = get(alarmStore, [timerCard.timerCardId, timerId]);
          if (alarmId) {
            const audioData = await audioStoreModule.getAudio(alarmId);
            if (audioData) {
              const audioPlayer = new SoundPlayer();
              const url = URL.createObjectURL(audioData.blob);
              audioPlayer.play(url);
            }
          }
        };

        timerCard.on('timerFinished', handleTimerFinished);
        eventsList.push({
          timerCard,
          handleTimerFinished,
        });
      });

      return () => {
        eventsList.forEach(({ timerCard, handleTimerFinished }) => {
          timerCard.off('timerFinished', handleTimerFinished);
        });
      };
    }
  }, [alarmStore, timerCardsStore]);

  return (
    <>
      <pre>{JSON.stringify(alarmStore, null, 2)}</pre>
    </>
  );
};

export default AlarmTonePlayer;
