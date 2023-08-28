import { useCallback, useRef, useState } from 'react';
import { Howl } from 'howler';
export default function useSoundPlayer() {
  const [playerId, setPlayerId] = useState<number>(-1);
  const playerRef = useRef<Howl | null>(null);

  const play = useCallback(function (sound: string, time?: number) {
    playerRef.current = new Howl({
      src: [sound],
      format: ['webm'],
      volume: 1,
    });
    const handleId = playerRef.current.play();
    if (time) {
      setTimeout(() => {
        if (!playerRef.current) return;
        playerRef.current.stop(handleId);
      }, time * 1000);
    }
    setPlayerId(handleId);
  }, []);
  const pause = useCallback(
    function () {
      if (!playerRef.current) return;
      playerRef.current.pause(playerId);
    },
    [playerId]
  );

  function stop() {
    if (!playerRef.current) return;
    playerRef.current.stop(playerId);
  }

  return { play, pause, stop };
}
