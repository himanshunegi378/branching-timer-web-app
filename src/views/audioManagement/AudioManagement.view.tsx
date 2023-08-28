import { useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { v4 } from 'uuid';
import { AudioItem } from './components/AudioItem';

export function AudioManagementView() {
  const [openAudioSelector, { plainFiles: files, loading }] = useFilePicker({
    accept: 'audio/*',
  });
  const [audioFiles, setAudioFiles] = useState<
    {
      id: string;
      file: File;
    }[]
  >([]);
  useEffect(() => {
    if (files.length === 0) return;
    setAudioFiles((prev) => [
      ...prev,
      ...files.map((file) => ({ id: v4(), file })),
    ]);
  }, [files]);
  return (
    <div>
      <div>
        <button
          className='border-2 border-gray-500 rounded-lg p-2'
          onClick={openAudioSelector}
        >
          {loading ? 'Loading...' : 'Select Audio'}
        </button>
      </div>
      <div>
        {audioFiles.map(({ id, file }) => (
          <AudioItem
            key={id}
            audioFile={file}
            onRemove={() =>
              setAudioFiles((audioFiles) =>
                audioFiles.filter(({ id: _id }) => _id !== id)
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
