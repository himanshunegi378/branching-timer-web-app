const Timer = require('./timer')
const { v1: uuidv1 } = require('uuid');
const countdownClock = require('../countDownClock')
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
            //remove random funcrion later in both insert func
            let newTimer = new Timer({ id: uuidv1(),time:Math.floor(Math.random() * Math.floor(1000)), ...opts })
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

    insertTimerBelow = (id, opts) => {
        console.log('below')
        let timer = this.findTimer(id)
        if (timer.child) {
            return timer.child
        }
        else {
            let newTimer = new Timer({ id: uuidv1(),time:Math.floor(Math.random() * Math.floor(1000)), ...opts })

            timer.child = newTimer
            newTimer.parent = timer
            return newTimer

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

    updateTimer = (targetId, opts) => {
        let targetTimer = this.findTimer(targetId)
        if (targetTimer) {
            targetTimer.update(opts)
        }
    }

    getNextNode = (currentTimer) => {
        if (currentTimer.child) {
            let childTimer = this.getLeafNode(currentTimer.child)
            return childTimer
        }
        else {
            if (currentTimer.next) {
                let nextTimer = currentTimer.next
                if (nextTimer.child) {
                    let childTimer = this.getLeafNode(nextTimer.child)
                    return childTimer
                }
                else {
                    return nextTimer
                }
            }
            else {
                let nextToParentTimer = this.getParentNode(currentTimer)
                if (nextToParentTimer) {
                    if (nextToParentTimer.child) {
                        let childTimer = this.getLeafNode(currentTimer.child)
                        return childTimer
                    }
                    else {
                        return nextToParentTimer
                    }
                }
                else {
                    return undefined
                }
            }
        }
    }

    getLeafNode = (node) => {
        if (node.child) {
            let childNode = this.getLeafNode(node.child)
            return childNode
        } else {
            return node
        }
    }

    getParentNode = (node) => {
        if (node.parent) {
            let parentNode = node.parent
            if (parentNode.next) {
                return parentNode.next
            }
            parentNode = this.getParentNode(parentNode)
            return parentNode
        }
        else {
            if (node.previous) {
                let parentNode = this.getParentNode(node.previous)
                return parentNode
            }
            else {
                return undefined
            }
        }
    }



    startTimer = () => {
        let iscountdownFinished = true

        let refreshId = setInterval(() => {
            if (iscountdownFinished) {
                let timer = this.nextTimer()
                if (timer === undefined) {
                    // notifier.notify({
                    //     title: 'Timer',
                    //     message: 'All Countdown ended',
                    //     appID: 'Countdown timer'
                    // });
                    clearInterval(refreshId)
                    return
                }
                iscountdownFinished = false;
                countdownClock(timer.time, () => {
                    this.showWholeTimer()
                    // notifier.notify({
                    //     title: 'Timer',
                    //     message: timer.message,
                    //     appID: 'Countdown timer'
                    // });
                    iscountdownFinished = true
                })
            }

        }, 1000);
    }





}

let obj = new CountdownTimer()
obj.createTimerTree({ id: 'himanshu', time: 500 })

module.exports = obj