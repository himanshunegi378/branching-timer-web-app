import React from 'react';
import { StopButtonProps } from './StopButton.types';

function StopButton(props: StopButtonProps) {
  const { isStopped, onChange = () => {} } = props;
  return (
    <div
      test-id='stopButton'
      className='cursor-pointer'
      onClick={(e) => onChange(!isStopped, e)}
    >
      {isStopped ? (
        <div className='mx-2 h-auto my-1' style={{ width: '2rem' }}>
          <svg
            style={{ fill: '#dadada' }}
            className='h-8 w-auto'
            id='Capa_1'
            enableBackground='new 0 0 512 512'
            height='512'
            viewBox='0 0 512 512'
            width='512'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g>
              <path d='m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm115 356c0 8.284-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15v-200c0-8.284 6.716-15 15-15h200c8.284 0 15 6.716 15 15z' />
              <path d='m171 171h170v170h-170z' />
            </g>
          </svg>
        </div>
      ) : (
        <div className='mx-2 h-auto my-1' style={{ width: '2rem' }}>
          <svg
            className='h-8 w-auto'
            style={{ fill: '#007bff' }}
            id='Capa_1'
            enableBackground='new 0 0 512 512'
            height='512'
            viewBox='0 0 512 512'
            width='512'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g>
              <path d='m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.841 256-256-114.841-256-256-256zm115 356c0 8.284-6.716 15-15 15h-200c-8.284 0-15-6.716-15-15v-200c0-8.284 6.716-15 15-15h200c8.284 0 15 6.716 15 15z' />
              <path d='m171 171h170v170h-170z' />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}

export default StopButton;
export { StopButton };
