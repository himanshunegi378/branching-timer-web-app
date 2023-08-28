import { Howl } from 'howler';

export class SoundPlayer {
  private player: Howl | undefined;
  handleId: number | undefined;
  constructor() {
    this.player = undefined;
    this.handleId = undefined;
  }

  play(sound: string, time?: number) {
    if (!sound) {
      return false;
    }
    this.player = new Howl({
      src: [sound],
      format: ['webm'],
      volume: 1,
    });
    this.handleId = this.player.play();
    if (time) {
      setTimeout(() => {
        if (!this.player) return;
        this.player.stop(this.handleId);
      }, time * 1000);
    }
    return true;
  }

  pause() {
    this.player?.pause(this.handleId);
  }

  stop() {
    this.player?.stop(this.handleId);
  }
}
