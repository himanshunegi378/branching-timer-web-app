const Timer = require('./timer')
const { v1: uuidv1 } = require('uuid');

class CountdownTimer {
    constructor() {
        this.HEAD = {}
        this.currentHead = {}
    }

    createTimerTree = (opts) => {
        this.HEAD = new Timer(opts)
    }

    insertTimerToRight = (id, opts) => {

        let timer = this.findTimer(id)
        let newTimer = new Timer({ id: uuidv1(), ...opts })
        if (timer.next) {
            let nexTimer = timer.next
            timer.next = newTimer
            newTimer.next = nexTimer
            newTimer.previous = timer
            nexTimer.previous = newTimer
        }
        else {
            timer.next = newTimer
            newTimer.previous = timer
        }
        return newTimer
    }

    insertTimerBelow = (id, opts) => {

    }

    updateTimer = (targetId,  opts ) => {
        let targetTimer = this.findTimer(targetId)
        if (targetTimer) {
            targetTimer.update(opts)
        }
    }

    findTimer = (targetId) => {
        //assumed this.HEAD is not empty
        if (this.HEAD.id === targetId) {
            console.log('found in HEAD')
            return this.HEAD
        }
        let currentHead = Object.assign({}, this.HEAD)

        while (true) {
            //does currentHead match with targetId
            if (currentHead.id === targetId) {
                return currentHead
            }
            else {
                //does node have child
                if (currentHead.child) {
                    currentHead = currentHead.child
                } else {
                    //does node have next
                    if (currentHead.next) {
                        currentHead = currentHead.next
                    }
                    else {
                        if (currentHead.parent) {
                            currentHead = currentHead.parent
                        }
                        else {
                            console.log(targetId, 'not found')
                            return undefined
                        }
                    }
                }
            }
        }
    }
}

let obj = new CountdownTimer()
obj.createTimerTree({ id: 'himanshu', time: 500 })

module.exports = obj