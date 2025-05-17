import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '../../atoms/Button/Button.atom';
import { AudioPlayButton } from '../AudioPlayButton';
import clsx from 'clsx';

function AudioListItem({
  name,
  onDelete,
  blob,
  actionButtons,
  className,
}: Readonly<{
  name: string;
  onDelete?: () => void;
  actionButtons?: Array<{
    label: string;
    onClick: () => void;
  }>;
  blob: Blob;
  className?: string;
}>) {
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [blob]);

  return (
    <div
      className={clsx(
        className,
        'p-4 flex flex-col gap-3 border border-blue-200 sm:flex-row sm:justify-between sm:items-center sm:gap-4 rounded-lg shadow-md  hover:shadow-lg transition-shadow duration-300'
      )}
    >
      <div className='flex items-center gap-3 flex-grow'>
        <div className=''>
          <AudioPlayButton url={audioUrl} />
        </div>
        <span className='text-lg font-semibold text-gray-800 truncate'>
          {name}
        </span>
      </div>
      <div className='flex items-center gap-2 flex-wrap justify-end'>
        {actionButtons?.map(({ label, onClick }) => (
          <Button
            key={label}
            size='sm'
            onClick={onClick}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300'
          >
            {label}
          </Button>
        ))}
        {onDelete && (
          <Button
            size='sm'
            color='secondary'
            onClick={onDelete}
            className='px-4 py-2 transition-colors duration-300'
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default AudioListItem;
