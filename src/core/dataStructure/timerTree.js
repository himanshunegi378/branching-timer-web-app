const Timer = require('./timer')

class CountdownTimer {
    constructor() {
        this.timer = { 0: { timer: new Timer({ id: '0', time: -1 }) } }
        this.t = {}
        this.depth = 0
        this.index = [0]

    }

    showWholeTimer = () => {
        console.log(JSON.stringify(this.timer))
        // console.log(this.timer)
    }

    showFlattenTimer = () => {
        let t = { index: [0], depth: 0, flatTimer: [] }
        // index = []
        // depth = 0
        while (true & t.depth >= 0) {
            if (this.isTimerExist(t.index.join('-'))) {
                if (this.haveChild(t.index.join('-'))) {
                    t.depth++
                    t.index[t.depth] = 0
                } else {
                    if (this.haveNextTimer(t.index.join('-'))) {
                        t.flatTimer.push(this.findTimerById(t.index.join('-')))
                        let nextTimerIndex = this.getHorizontalIndex(t.index)
                        t.index = nextTimerIndex
                    }
                    else {
                        t.flatTimer.push(this.findTimerById(t.index.join('-')))
                        t.depth--
                        t.index.splice(t.depth + 1, 1)
                        t.index = this.getHorizontalIndex(t.index)
                    }
                }
            } else {
                t.depth--
                t.index.splice(t.depth + 1, 1)
                t.index = this.getHorizontalIndex(t.index)
            }
        }
        console.log(t.flatTimer)
    }


    getVerticalIndex = (index) => {
        let newIndex = [...index]
        newIndex.push(0)
        return newIndex
    }

    getHorizontalIndex = (index) => {
        let newIndex = [...index]
        newIndex[newIndex.length - 1] += 1
        return newIndex
    }

    editTimer = (id, opts) => {
        let parentTimer = this.getParent(id)
        let obj = { sumOfTimer: 0, index: 0, editedTimer: {} }
        let t = parentTimer

        while (true) {
            if (t[obj.index]) {
                if (t[obj.index].timer.id === id) {
                    t[obj.index].timer.update(opts)
                    obj.editedTimer = t[obj.index]
                }
                obj.sumOfTimer += t[obj.index].timer.time
                obj.index++
            }
            else {
                break
            }
        }
        t.timer.time = obj.sumOfTimer
        return obj.editedTimer
        // findTimer.timer.update(opts)

    }


    getParent = (childId) => {
        let index = childId.split('-').map(x => +x)
        let len = index.length
        let newindex = index.slice()
        newindex.pop()
        let indexofnewTimer = newindex
        let idOfNewTimer = indexofnewTimer.join('-')
        let findTimer = this.findTimerById(idOfNewTimer)
        if (findTimer) {
            return findTimer
        }
        else {
            return undefined
        }
    }

    deleteTimerbyID = (id) => {
        let index = id.split('-')
        if (index.length > 1) {
            index.pop()
            let id = index.join('-')
            let findTimer = this.findTimerById(id)
            delete findTimer[index[index.length - 1]]
        }
        else {
            delete this.timer[index[0]]
        }
        // let findTimer = this.findTimerById(id)
        // console.log(findTimer)
        // delete findTimer.timer
        // console.log(findTimer)
    }
    //may private method
    findTimerById = (id) => {
        let index = id.split('-')
        let len = index.length
        this.t = this.timer
        for (let i = 0; i < len; i++) {
            //does timer exist
            if (this.t[index[i]]) {
                this.t = this.t[index[i]]
            }
            else {
                console.log('node with id', id, 'is missing')
                return undefined
            }
        }
        return this.t
    }

    inserTimerHorizontally = (nextToId, time, msg) => {
        let index = nextToId.split('-').map(x => +x)
        let len = index.length
        let newindex = index.slice()
        newindex[len - 1] += 1
        let indexofnewTimer = newindex
        let idOfNewTimer = indexofnewTimer.join('-')
        this.addTimer(idOfNewTimer, time, msg)
    }

    inserTimerVertically = (belowId, time, msg) => {
        let index = belowId.split('-').map(x => +x)
        let len = index.length
        let newindex = index.slice()
        newindex.push(0)
        let indexofnewTimer = newindex
        let idOfNewTimer = indexofnewTimer.join('-')
        this.addTimer(idOfNewTimer, time, msg)


    }

    //privatish method
    addTimer = (id, time, msg) => {
        let index = id.split`-`.map(x => +x)
        const newTimer = new Timer({ id: index.join("-"), message: msg, time: time })
        let t = this.timer
        let len = index.length
        let el = 0
        for (let i = 0; i < len - 1; i++) {
            el = index[i]
            //is node present
            if (t[el]) {
                t = t[el]
            }
            else {
                console.log('node', el, 'missing')
            }
        }

        el = index[len - 1]
        //is it a first timer in the branch
        if (el === 0) {
            t[el] = { timer: newTimer }
        }
        else {
            //does it have previous timer in the branch
            if (t[el - 1]) {
                t[el] = { timer: newTimer }
            }
            else {
                console.log('previous timer missing')
            }
        }
    }

    nextTimer = () => {
        let t = this.timer
        while (true) {
            //have child
            if (this.haveChild(t[this.index[this.depth]])) {
                t = t[this.index[this.depth]]
                this.depth++
                this.index[this.depth] = 0

            }
            else {
                //is completed
                if (t[this.index[this.depth]].timer.completed) {
                    //is next sibling
                    if (t[this.index[this.depth] + 1]) {
                        //go to next sibling
                        this.index[this.depth]++
                    }
                    else {
                        if (this.depth === 0) {
                            // it means all timer has finsihed
                            return undefined
                        }
                        else {
                            //go one leve up
                            this.depth--
                            continue
                        }
                    }
                }
                else {
                    t[this.index[this.depth]].timer.completed = true
                    return t[this.index[this.depth]].timer
                }
            }
        }
    }

    haveChild = (id) => {
        let index = id.split('-').map(x => +x)
        let len = index.length
        let newindex = index.slice()
        newindex.push(0)
        let indexofChildTimer = newindex
        let idOfNewTimer = indexofChildTimer.join('-')
        let findTimer = this.findTimerById(idOfNewTimer)
        if (findTimer) {
            return true
        }
        else {
            return false
        }
    }

    haveNextTimer = (id) => {
        let index = id.split('-').map(x => +x)
        let len = index.length
        let newindex = index.slice()
        newindex[len - 1] += 1
        let indexofNextTimer = newindex
        let idOfNewTimer = indexofNextTimer.join('-')
        let findTimer = this.findTimerById(idOfNewTimer)
        if (findTimer) {
            return true
        }
        else {
            return false
        }
    }

    isTimerExist = (id) => {
        let findTimer = this.findTimerById(id)
        if (findTimer) {
            return true
        }
        else {
            return false
        }
    }

}

module.exports = CountdownTimer