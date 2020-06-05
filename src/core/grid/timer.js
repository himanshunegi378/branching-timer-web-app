let timerState = { dormant: 'dormant', active: 'active', completed: 'completed', paused: 'paused' }

export default class Timer {
    constructor(options) {
        this.id = options.id
        this.message = options.message || 'No message'
        this.time = options.time || 0  //in minutes

        this.state = timerState.dormant

        this.top = 0
        this.left = 0

        this.parent = undefined
        this.child = undefined
        this.next = undefined
        this.previous = undefined

        this.callback = options.cb || undefined



    }

    update(options) {
        this.message = options.message || this.message
        this.time = options.time || this.time  //in minutes
        this.completed = options.completed !== undefined ? options.completed : this.completed
        this.callback = this.callback || options.cb
        this.state = options.state || this.state
        if (this.callback) {
            this.callback(this)
        }
    }

    updateMessage(msg) {
        this.message = msg || this.message
    }

    updateTime(time) {
        this.time = time || this.time
    }

    updateCompleted(isCompleted) {
        this.completed = isCompleted || this.completed
    }
}

