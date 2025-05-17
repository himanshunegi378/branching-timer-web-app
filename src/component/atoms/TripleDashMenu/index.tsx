import React, { MouseEvent } from 'react';

interface TripleDashMenuProps {
  size?: number;
  thickness?: number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const TripleDashMenu = ({
  size = 16,
  thickness = 3,
  onClick,
}: TripleDashMenuProps) => {
  const containerSize = `${size}px`;
  const dashStyle = {
    height: `${thickness}px`,
    width: '100%',
    backgroundColor: '#999',
    borderRadius: '9999px',
    transition: 'background-color 0.2s',
  };

  const lineClass = 'w-full';
  return (
    <button
      className='flex flex-col items-center justify-between'
      style={{ width: containerSize, height: containerSize }}
      onClick={onClick}
    >
      <div
        className={lineClass}
        style={dashStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#666';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#999';
        }}
      ></div>
      <div
        className={lineClass}
        style={dashStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#666';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#999';
        }}
      ></div>
      <div
        className={lineClass}
        style={dashStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#666';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#999';
        }}
      ></div>
    </button>
  );
};
