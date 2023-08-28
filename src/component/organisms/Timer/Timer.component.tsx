import { useEffect, useState } from 'react';
import { TimerProps } from './Timer.types';
import style from './style.module.scss';
import { CloseButton } from '../../molecules/CloseButton/CloseButton.component';
// import { TripleDashMenu } from "../../atoms/TripleDashMenu";
// import { Menu, MenuItem } from "../../molecules/Menu";

export const Timer = (props: TimerProps) => {
  const { onNameChange, onTimeChange, onDelete, id, name, time, active } =
    props;

  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [editTitle, setEditTitle] = useState(() => false);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  useEffect(() => {
    if (!time) return;
    const minutes = time / 60;
    const seconds = time % 60;
    setMins(minutes);
    setSecs(seconds);
  }, [time]);

  return (
    <div
      id={props.id}
      // className="my-1 px-2 pt-2 border rounded-lg border-gray-300"
      className={`my-1 rounded-lg ${style.timer} ${
        active ? style.timer__active : ''
      }`}
    >
      <div
        className={`${style.title} w-full rounded-t-lg  border border-b-0 border-gray-300 px-1 `}
      >
        <div className={` flex flex-row justify-between items-center gap-1`}>
          <div
            className='whitespace-nowrap overflow-hidden overflow-ellipsis w-full'
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

      <div className='border border-t-0 rounded-b-lg  border-gray-300'>
        {/* <div className={messageBgColor}>{TimerDetail.message}</div> */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const minutes = parseInt(event.currentTarget.mins.value);
            const seconds = parseInt(event.currentTarget.secs.value);
            let time = 0;
            if (minutes) time += minutes * 60;
            if (seconds) time += seconds;
            onTimeChange(time);
          }}
          onBlur={(event) => {
            const minutes = parseInt(event.currentTarget.mins.value);
            const seconds = parseInt(event.currentTarget.secs.value);
            let time = 0;
            if (minutes) time += minutes * 60;
            if (seconds) time += seconds;
            onTimeChange(time);
          }}
          className='text-center py-2'
        >
          <input
            name='mins'
            style={{ width: '3em' }}
            type='number'
            placeholder='m'
            onChange={(e) => setMins(parseInt(e.target.value))}
            value={mins}
          />
          <span className='mx-1'>:</span>
          <input
            name='secs'
            style={{ width: '3em' }}
            type='number'
            placeholder='s'
            onChange={(e) => setSecs(parseInt(e.target.value))}
            value={secs}
          />
        </form>
      </div>
    </div>
  );
};
