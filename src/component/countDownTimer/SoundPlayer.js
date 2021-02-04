import {Howl} from "howler";

export class SoundPlayer {
    constructor() {
        this.player = undefined
        this.handleId = undefined
        this.sound = undefined
    }

    static play(sound) {
        if(!sound){
            return false
        }
        if (this.sound === sound && sound) {
            console.log('same as previous one')
            this.handleId = this.player.play()
            return true
        }
        this.sound = sound

        this.player = new Howl({src: [this.sound]})
        this.handleId = this.player.play()
        return true
    }

    static pause() {
        this.player.pause(this.handleId)
    }

    static stop() {
        this.player.stop(this.handleId)
    }
}