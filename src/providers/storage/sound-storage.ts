import { localStorage } from '../../utils/localStorage';

class SoundStorage {
  save(id: string, audioBlob: Blob[]) {
    localStorage.setItem(`sound_${id}`, audioBlob);
  }
  load(id: string) {
    return localStorage.getItem<Blob[]>(`sound_${id}`);
  }
  delete(id: string) {
    localStorage.removeItem(`sound_${id}`);
  }
}

export const soundStorage = new SoundStorage();
