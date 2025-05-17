import { useMemo, useState } from 'react';
import { ComponentsRenderer } from '../../../modules/ComponentRenderer';
import toSeconds from '../../../utils/toSeconds';
import { CloseButton } from '../../molecules/CloseButton/CloseButton.component';
import { TimerProps } from './Timer.types';

const numberRegex = /^\d+$/;

export const Timer = (props: TimerProps) => {
  const { onNameChange, onTimeChange, onDelete, id, name, time, active } =
    props;
  const [editTitle, setEditTitle] = useState(() => false);

  const [mins, secs] = useMemo(() => {
    if (!time) return [0, 0];
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return [minutes, seconds];
  }, [time]);

  const handleTimeChange = (
    config: { minutes: number | null; seconds: number | null } | null
  ): void => {
    if (!config) return;
    const { minutes, seconds } = config;

    if (
      minutes === null ||
      seconds === null ||
      !numberRegex.test(`${minutes}`) ||
      !numberRegex.test(`${seconds}`)
    )
      return;

    const inSeconds = toSeconds({ minutes, seconds });
    // console.log(`inSeconds: ${inSeconds}`);
    onTimeChange(inSeconds);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id={props.id}
      data-timerId={props.id}
      className={`my-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-lg ${
        active ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div
        className={`${
          active ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-blue-100'
        } w-full rounded-t-lg p-3 border-b border-blue-200 transition-colors duration-300`}
      >
        <div className='flex flex-row justify-between items-center gap-2'>
          <div
            className='text-lg font-bold text-gray-800 whitespace-nowrap overflow-hidden overflow-ellipsis w-full transition-all duration-200 hover:text-blue-600 cursor-pointer'
            onClick={() => setEditTitle(true)}
          >
            {editTitle ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setEditTitle(false);
                  onNameChange(
                    (event.currentTarget.elements[0] as HTMLInputElement).value
                  );
                }}
                onBlur={(event) => {
                  onNameChange(
                    (event.currentTarget.elements[0] as HTMLFormElement).value
                  );
                  setEditTitle(false);
                }}
              >
                <input
                  autoFocus
                  autoComplete='off'
                  type='text'
                  defaultValue={name}
                  name='title'
                  className='w-full rounded-md bg-white bg-opacity-50 outline-none p-1 focus:ring-2 focus:ring-blue-300'
                />
              </form>
            ) : (
              name
            )}
          </div>
          <ComponentsRenderer tag='menu' props={{ ...props }} />
          <CloseButton size='sm' onClick={() => onDelete(id)} />
        </div>
      </div>

      <div className='rounded-b-lg border-t border-blue-100 text-center py-4 flex justify-center items-center bg-gradient-to-b from-blue-50 to-white'>
        <div className='flex flex-row items-center'>
          <input
            name='mins'
            className='input-field w-16 text-center bg-transparent border-b-2 border-blue-200 focus:border-blue-500 focus:ring-0 text-2xl font-semibold text-gray-700 transition-all duration-200'
            type='number'
            min={0}
            placeholder='MM'
            onChange={(e) => {
              let rawMinutes = e.target.value;
              if (!numberRegex.test(rawMinutes)) {
                rawMinutes = '0';
              }
              const minutes = parseInt(rawMinutes);
              handleTimeChange({ minutes, seconds: secs });
            }}
            value={mins}
          />
        </div>
        <span className='mx-2 text-2xl font-medium text-gray-600'>:</span>
        <div className='flex flex-row items-center'>
          <input
            name='secs'
            className='input-field w-16 text-center bg-transparent border-b-2 border-blue-200 focus:border-blue-500 focus:ring-0 text-2xl font-semibold text-gray-700 transition-all duration-200'
            type='number'
            placeholder='SS'
            onChange={(e) => {
              let rawSeconds = e.target.value;
              if (!numberRegex.test(rawSeconds)) {
                rawSeconds = '0';
              }
              const seconds = parseInt(rawSeconds);
              handleTimeChange({ minutes: mins, seconds });
            }}
            value={secs}
          />
        </div>
      </div>
    </div>
  );
};
