const {SoundPlayer} =  require("./SoundPlayer")
const alarmSound =  require('./alarm.mp3')
const {describe,it} = require("mocha")
const expect = require('chai').expect;

describe('testing sound player',()=>{
    it('play sound',()=>{
        expect(SoundPlayer.play(alarmSound)).to.be.equal(true);

    })
})