const { LsCountdown, LsCountdownOptions, LsCountdownSufixes } = require('ls-countdown')

// Target date to be the reference for the countdown
let isActive = false;

const timer = (time, cb) => {

    const currentDate = new Date()
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()+time )

    // Event dispatched right after the countdown starts
    const onStart = ({ days, hours, minutes, seconds }) => { /* Do whatever you want... */ }

    // Event dispatched ever 1 second
    const onTick = ({ days, hours, minutes, seconds }) => {
        process.stdout.write("\r\x1b[K")
        process.stdout.write(minutes)
        process.stdout.write(":")
        process.stdout.write(seconds)
        if (days === '00'& hours === '00'& minutes === '00'& seconds === '00') {
            console.log('time up')
            countdown.stop()
            cb()
        }
    }

    // Event dispatched right after the countdown stops
    const onStop = ({ days, hours, minutes, seconds }) => { }

    // You can use the LsCountdownSufixes class to change the sufixes of the tick on return
    // This is the defaults: { days: 'd', hours: 'h', minutes: 'm', seconds: 's' }
    const sufixes = new LsCountdownSufixes({ days: '', hours: '', minutes: '', seconds: '' })

    // Create a new options class with the parameters
    const options = new LsCountdownOptions({ targetDate, onStart, onTick, onStop, sufixes })

    // Create a new countdown class
    const countdown = new LsCountdown(options)

    // starts to countdown
    if (isActive) {
        countdown.changeTargetDate(targetDate)
    }
    else {
        countdown.start()
    }
    isActive = true


}

module.exports = timer