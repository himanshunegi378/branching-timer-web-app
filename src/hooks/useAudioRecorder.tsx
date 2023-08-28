import { useRef, useState } from 'react';

export default function useAudioRecorder() {
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaChunks = useRef<Blob[]>([]);

  const [audioBlob, setAudioBlob] = useState<Blob>();

  async function record() {
    mediaStream.current = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    mediaChunks.current = [];
    mediaRecorder.current = new MediaRecorder(mediaStream.current, {
      mimeType: 'audio/webm',
    });

    mediaRecorder.current.addEventListener('dataavailable', function (e) {
      if (e.data.size > 0) {
        mediaChunks.current.push(e.data);
      }
    });

    mediaRecorder.current.addEventListener('stop', function (e) {
      if (!mediaChunks.current) return;
      let [sampleChunk] = mediaChunks.current;
      setAudioBlob(new Blob(mediaChunks.current, { type: sampleChunk.type }));
    });

    mediaRecorder.current.start(100);
  }

  const stopRecording = function () {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current = null;
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
    }

    const [sameplChunk] = mediaChunks.current;
    return new Blob(mediaChunks.current, { type: sameplChunk.type });
  };

  return { record, stopRecording, audioBlob };
}
