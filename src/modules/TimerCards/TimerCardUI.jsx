import { useState } from 'react';

import { Button } from '../../component/atoms/Button/Button.atom';
import { CloseButton } from '../../component/molecules/CloseButton/CloseButton.component';
import LoopButton from '../../component/molecules/LoopButton/LoopButton.component';
import { PlayButton } from '../../component/molecules/PlayButton/PlayButton.component';
import StopButton from '../../component/molecules/StopButton/StopButton.component';
import { Timer } from '../../component/organisms/Timer/Timer.component';
import { InjectorContext } from '../../contexts/InjectorContext';
import { useTimerCard } from '../../contexts/TimerCards';
import { TimerCardData } from '../../HOC/TimerCardData';
import { ComponentsRenderer } from '../ComponentRenderer';

const TimerTitle = ({ currentName, onRename, onDelete }) => {
  const [editTitle, setEditTitle] = useState(false);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='flex justify-between items-center bg-blue-100 p-2 rounded-t-lg'
    >
      <div className='text-center font-medium cursor-pointer fancy-scrollbar mr-2 w-full min-w-0'>
        <div
          className='whitespace-nowrap overflow-hidden overflow-ellipsis w-full text-left hover:underline cursor-pointer'
          onClick={() => setEditTitle(true)}
        >
          {editTitle ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const title = event.currentTarget.title.value;
                if (title) {
                  onRename(title);
                }
                setEditTitle(false);
              }}
              onBlur={(event) => {
                event.preventDefault();
                const title = event.currentTarget.title.value;
                if (title) {
                  onRename(title);
                }
                setEditTitle(false);
              }}
            >
              <input
                autoFocus
                type='text'
                name='title'
                defaultValue={currentName}
                className='bg-blue-100 rounded outline-none p-0 m-0 w-full'
              />
            </form>
          ) : (
            currentName
          )}
        </div>
      </div>
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </div>
  );
};




const TimerControlButtons = ({
  status,
  onPlay,
  onPause,
  onStop,
  looping,
  onToggleLoop,
}) => {
  return (
    <div className='flex mt-2'>
      <div className=' mx-2 h-8 w-auto my-1'>
        <PlayButton
          isPlaying={status === 'playing'}
          onChange={(state, e) => {
            e.stopPropagation();
            if (state) {
              onPlay();
            } else {
              onPause();
            }
          }}
        />
      </div>
      <StopButton
        isStopped={status === 'stopped'}
        onChange={(isStopped, e) => {
          e.stopPropagation();
          if (isStopped) onStop();
        }}
      />
      <div className='px-0 user-select-none ml-auto'>
        <LoopButton
          looping={looping}
          onChange={(looping, e) => {
            e.stopPropagation();
            onToggleLoop();
          }}
        />
      </div>
    </div>
  );
};



function TimerCardUI(props) {
  const { onDelete, timerCardId, className } = props;
  const { timerCardData, actions } = useTimerCard(timerCardId);
  const [shouldShowTimerTasksModal, setShouldShowTimerTasksModal] =
    useState(false);
  // const endTimes = useEndTime(timerCardId, 5);



  if (!timerCardData) return <div></div>;
  return (
    <>
      <div
        className={`bg-white shadow-lg rounded-lg flex flex-col overflow-hidden w-80 ${className} border-blue-300 border`}
        onClick={() => {
          setShouldShowTimerTasksModal(true);
        }}
      >
        <TimerTitle
          currentName={timerCardData.timerGroup.name}
          onRename={(newTitle) => actions.renameTimerCard(newTitle)}
          onDelete={() => onDelete(timerCardId)}
        />
        <div className='flex flex-col min-h-0 p-4'>
          <ComponentsRenderer tag='timerDisplay' props={{ timerCardId }} />
          <hr className="my-4" />
          <TimerControlButtons
            status={timerCardData?.status}
            onPlay={actions.playCard}
            onPause={actions.pauseCard}
            onStop={actions.stopCard}
            looping={timerCardData?.looping}
            onToggleLoop={() => actions.toggleLoop()}
          />
          <ComponentsRenderer tag='timerList' props={{ timerCardId }} />

          <div className='flex justify-center mt-4'>
            <Button
              size='md'
              variant='outline'
              color='primary'
              onClick={(e) => {
                e.stopPropagation();
                actions.addTimer({ name: 'New Timer', time: 60 });
              }}
            >
              Add Timer
            </Button>
          </div>
        </div>
      </div>
      {/*<Modal*/}
      {/*  isOpen={shouldShowTimerTasksModal}*/}
      {/*  onClose={() => {*/}
      {/*    setShouldShowTimerTasksModal(false);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {() => (*/}
      {/*    <TrelloItem key={timerCardId}>*/}
      {/*      <TimerCardData*/}
      {/*        id={timerCardId}*/}
      {/*        render={(timerCardData) => {*/}
      {/*          if (!timerCardData) return null;*/}
      {/*          return <TimerCardTasks timerCard={timerCardData} />;*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </TrelloItem>*/}
      {/*  )}*/}
      {/*</Modal>*/}
    </>
  );
}



export default TimerCardUI
