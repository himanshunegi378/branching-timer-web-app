import { get } from 'lodash';
import Modal from '../../../component/atoms/Modal';
import { AudioListItem } from '../../../component/molecules/AudioList';
import { useInjector } from '../../../contexts/InjectorContext';
import useDataStore from '../../../hooks/useDataStore';
import AudioStore, {
  AUDIO_STORE_KEY,
} from '../../AudioStore/AudioStoreManager';
import {
  IS_ALARM_TONE_MODAL_OPEN_KEY,
  TimerAlarmToneModule,
} from '../TimerAlarmToneModule';

const AlarmToneSelectionList = () => {
  const injector = useInjector();
  const audioStoreModule = injector.get('audioStore') as AudioStore;
  const timerAlarmToneModule = injector.get(
    'timerAlarmTone'
  ) as TimerAlarmToneModule;
  const dataStore = injector.get('dataStore') as any;
  const isAlarmToneSelectionModalOpen = useDataStore(
    dataStore,
    IS_ALARM_TONE_MODAL_OPEN_KEY
  );
  const audioMap = useDataStore(audioStoreModule.dataStore, AUDIO_STORE_KEY);
  const { isOpen, context } = isAlarmToneSelectionModalOpen;
  const selectedAlarmId = useDataStore(dataStore, (state) =>
    get(state, `alarmStore.${context?.timerCard.timerCardId}.${context?.id}`)
  );
  console.log('selectedAlarmId', selectedAlarmId);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        timerAlarmToneModule.closeAlarmToneModal();
      }}
      className='h-5/6'
      style={{ maxHeight: '100vh', overflow: 'auto' }}
    >
      {Object.keys(audioMap).map((id) => {
        const { meta, blob } = audioMap[id];
        return (
          <div key={id} className='my-2'>
            <AudioListItem
              name={meta.name}
              blob={blob}
              className={selectedAlarmId === id ? 'bg-green-200' : ''}
              actionButtons={[
                {
                  label: 'Select',
                  onClick: () => {
                    timerAlarmToneModule.setAlarmTone({
                      alarmId: id,
                      timerCardId: context.timerCard.timerCardId,
                      timerId: context.id,
                    });
                    timerAlarmToneModule.closeAlarmToneModal();
                  },
                },
              ]}
            />
          </div>
        );
      })}
    </Modal>
  );
};

export default AlarmToneSelectionList;

