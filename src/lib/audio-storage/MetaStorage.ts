import { localStorage } from '../../utils/localStorage';

export type MetaType = {
  name: string;
  id: string;
  createdAt: number;
};

export class MetaStorage {
  save(id: string, meta: MetaType) {
    return localStorage.setItem(`audio_meta_${id}`, meta);
  }
  load(id: string) {
    return localStorage.getItem<MetaType>(`audio_meta_${id}`);
  }
  delete(id: string) {
    return localStorage.removeItem(`audio_meta_${id}`);
  }
}
