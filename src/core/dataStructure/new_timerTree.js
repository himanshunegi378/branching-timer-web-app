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
        try {
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
        } catch (error) {
            console.log(error)
        }

    }

    generateTimerJson = () => {
        let t = {}

        let currentHead = Object.assign({}, this.HEAD)

        while (true) {
            //does currentHead match with targetId
            if (false) {
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
                            return undefined
                        }
                    }
                }
            }
        }
    }


    insertTimerBelow = (id, opts) => {
        console.log('below')
        let timer = this.findTimer(id)
        if (timer.child) {
            return timer.child
        }
        else {
            let newTimer = new Timer({ id: uuidv1(), ...opts })

            timer.child = newTimer
            newTimer.parent = timer
            return newTimer

        }
    }

    updateTimer = (targetId, opts) => {
        let targetTimer = this.findTimer(targetId)
        if (targetTimer) {
            targetTimer.update(opts)
        }
    }

    findTimer = (targetId, node = this.HEAD) => {
        let currentNode = node
        while (true) {

            if (currentNode.id === targetId) {
                return currentNode
            }
            else {
                let nextNode = currentNode.next
                if (nextNode) {
                    currentNode = nextNode
                }
                else {
                    break
                }
            }
        }
        currentNode = node
        while (true) {
            console.log('he')

            let childNode = currentNode.child
            if (childNode) {
                let returnedNode = this.findTimer(targetId, childNode)
                if (returnedNode) {
                    return returnedNode
                }
                else {
                    let nextNode = currentNode.next
                    if (nextNode) {
                        currentNode = nextNode
                    }
                    else {
                        return undefined
                    }
                }
            }
            else {
                let nextNode = currentNode.next
                if (nextNode) {
                    currentNode = nextNode
                }
                else {
                    return undefined
                }
            }
        }
    }



}

let obj = new CountdownTimer()
obj.createTimerTree({ id: 'himanshu', time: 500 })

module.exports = obj