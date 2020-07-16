// const alarmSound = require('./alarm.mp3')

const {SoundPlayer} = require("./SoundPlayer")
const {describe, it} = require("mocha")
const expect = require('chai').expect;

const soundURL = 'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-41945/zapsplat_emergency_bell_alarm_fire_or_burglar_ring_001_44041.mp3?_=2'

describe('testing sound player', () => {
    it('play sound', () => {
        expect(SoundPlayer.play(soundURL)).to.be.equal(true);

    })
    it('no sound argument given', () => {
        expect(SoundPlayer.play()).to.be.equal(false);
    })
    it('invalid sound argument given', () => {
        expect(SoundPlayer.play('sfsdfsfsf')).to.be.equal(false);
    })
})