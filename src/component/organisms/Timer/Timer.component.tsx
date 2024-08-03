import { useEffect, useMemo, useState } from 'react';
import { TimerProps } from './Timer.types';
import style from './style.module.scss';
import { CloseButton } from '../../molecules/CloseButton/CloseButton.component';
import toSeconds from '../../../utils/toSeconds';
import { motion } from 'framer-motion';
// import { TripleDashMenu } from "../../atoms/TripleDashMenu";
// import { Menu, MenuItem } from "../../molecules/Menu";

const numberRegex = /^\d+$/;

export const Timer = (props: TimerProps) => {
  const { onNameChange, onTimeChange, onDelete, id, name, time, active } =
    props;

  const [editTitle, setEditTitle] = useState(() => false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [mins, secs] = useMemo(() => {
    if (!time) return [0, 0];
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return [minutes, seconds];
  }, [time]);

  const handleTimeChange = ({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) => {
    const inSeconds = toSeconds({ minutes, seconds });
    // console.log(`inSeconds: ${inSeconds}`);
    onTimeChange(inSeconds);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      id={props.id}
      data-timerId={props.id}
      // className="my-1 px-2 pt-2 border rounded-lg border-gray-300"
      className={`my-4 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg ${style.timer}`}
    >
      <div
        className={`${style.title} transition duration-300 ease-in-out ${
          active ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-blue-200'
        } w-full rounded-t-lg p-2 py-1 border border-b-0 border-blue-300`}
      >
        <div className={` flex flex-row justify-between items-center gap-1`}>
          <div
            className='text-lg font-bold whitespace-nowrap overflow-hidden overflow-ellipsis w-full transition-all duration-200 hover:underline cursor-pointer'
            onClick={() => setEditTitle(true)}
          >
            {editTitle ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setEditTitle(false);
                  //@ts-ignore
                  onNameChange(event.currentTarget.title.value);
                }}
                onBlur={(event) => {
                  //@ts-ignore
                  onNameChange(event.currentTarget.title.value);
                  setEditTitle(false);
                }}
              >
                <input
                  autoFocus
                  autoComplete={'off'}
                  type='text'
                  defaultValue={name}
                  name='title'
                  className='rounded-md bg-transparent outline-none p-0'
                />
              </form>
            ) : (
              name
            )}
          </div>
          {/* Will be used in future */}
          {/* <TripleDashMenu onClick={(e) => setAnchorEl(e.currentTarget)} />
          <Menu
            isOpen={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => onDelete(id)}>Delete</MenuItem>
            <MenuItem onClick={() => setEditTitle(true)}>Edit</MenuItem>
          </Menu> */}
          <CloseButton size='sm' onClick={() => onDelete(id)} />
        </div>
      </div>

      <div className='rounded-b-lg border border-t-0 border-blue-300 text-center py-2 flex justify-center items-center'>
        <input
          name='mins'
          className='text-center w-12 border-0 border-b-2 focus:ring-0 focus:border-blue-500'
          type='number'
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
        <span className='mx-2 text-lg font-medium'>:</span>
        <input
          name='secs'
          className='text-center w-12 border-0 border-b-2 focus:ring-0 focus:border-blue-500'
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
  );
};
