import React, { useEffect, useState } from 'react';

import { useEndTime, useTimerCard } from '../../contexts/TimerCards';
import { PlayButton } from '../molecules/PlayButton/PlayButton.component';
import StopButton from '../molecules/StopButton/StopButton.component';
import LoopButton from '../molecules/LoopButton/LoopButton.component';
import { CloseButton } from '../molecules/CloseButton/CloseButton.component';
import { Timer } from '../organisms/Timer/Timer.component';
import { Button } from '../atoms/Button/Button.atom';
import Modal from '../atoms/Modal';
import { TimerCardData } from '../../HOC/TimerCardData';
import { TrelloItem } from '../templates/TrelloLayout';
import { TimerCardTasks } from '../templates/TimerCardTasks';
import useTimer from '../hooks/useTimer';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentsRenderer } from '../../modules/ComponentRenderer';

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

const numberVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const TimerDisplay = ({ remainingTime }) => {
  const minutes = parseInt(remainingTime / 60);
  const seconds = remainingTime % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return (
    <div className='text-7xl font-mono tracking-tighter font-medium text-center select-none'>
      {paddedMinutes.split('').map((digit, idx) => (
        <AnimatePresence mode={'popLayout'} key={digit + idx}>
          <motion.span
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={numberVariants}
            transition={{ duration: 0.3 }}
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
      :
      {paddedSeconds.split('').map((digit, idx) => (
        <AnimatePresence mode={'popLayout'} key={digit + idx}>
          <motion.span
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={numberVariants}
            transition={{ duration: 0.3 }}
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
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

const TimerList = ({ timers, timerProps }) => {
  return (
    <div className='overflow-auto fancy-scrollbar px-1 flex-1 mt-2 bg-blue-50 p-2 rounded'>
      {timers.map((timer) => {
        if (!timer) return null;
        return <Timer key={timer.id} {...timerProps(timer.id)} />;
      })}
    </div>
  );
};

export default function TimerCard(props) {
  const { onDelete, timerCardId, className } = props;
  const [editTitle, setEditTitle] = useState(() => false);
  const { timerCardData, runningTimer, actions } = useTimerCard(timerCardId);
  const injector = actions?.injector;
  const [shouldShowTimerTasksModal, setShouldShowTimerTasksModal] =
    useState(false);
  const endTimes = useEndTime(timerCardId, 5);
  const timerProps = useTimer(timerCardId);

  // useEffect(() => {
  //   endTimes.forEach((endTime, i) => {
  //     console.log(`${i + 1} ${endTime.toLocaleString()}`);
  //   });
  //   return () => { };
  // }, [endTimes]);

  if (!timerCardData || !injector) return <div></div>;
  return (
    <>
      <div
        className={`bg-white shadow-lg rounded-lg flex flex-col overflow-auto pb-2 w-72 ${className} border-blue-300 border`}
        onClick={() => {
          setShouldShowTimerTasksModal(true);
        }}
      >
        <TimerTitle
          currentName={timerCardData.timerGroup.name}
          onRename={(newTitle) => actions.renameTimerCard(newTitle)}
          onDelete={() => onDelete(timerCardId)}
        />
        <div className='flex flex-col min-h-0'>
          <ComponentsRenderer tag='timerDisplay' injector={injector} />
          <hr />
          <TimerControlButtons
            status={timerCardData?.status}
            onPlay={actions.playCard}
            onPause={actions.pauseCard}
            onStop={actions.stopCard}
            looping={timerCardData?.looping}
            onToggleLoop={() => actions.toggleLoop()}
          />
          {/* <iframe src='https://raw.githubusercontent.com/himanshunegi378/timerCardsPlugin/main/TimerDisplayPlugin/dist/index.html' title='Timer Display'/> */}
          <ComponentsRenderer tag='timerList' injector={injector} />

          <div className='flex justify-center mt-4'>
            <Button
              size='md'
              variant='outline'
              color='primary'
              onClick={(e) => {
                e.stopPropagation();
                actions.addTimer({ name: 'unnamed', time: 60 });
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={shouldShowTimerTasksModal}
        onClose={() => {
          setShouldShowTimerTasksModal(false);
        }}
      >
        {() => (
          <TrelloItem key={timerCardId}>
            <TimerCardData
              id={timerCardId}
              render={(timerCardData) => {
                if (!timerCardData) return null;
                return <TimerCardTasks timerCard={timerCardData} />;
              }}
            />
          </TrelloItem>
        )}
      </Modal>
    </>
  );
}
