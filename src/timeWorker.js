// const workercode = () => {
// var interval = 1000 // ms
// var expected = Date.now() + interval
// setTimeout(step, interval)
// function step() {
//     var dt = Date.now() - expected // the drift (positive for overshooting)
//     if (dt > interval) {
//         // something really bad happened. Maybe the browser (tab) was inactive?
//         // possibly special handling to avoid futile "catch up" run
//     }
//     self.postMessage("tick") /* eslint-disable-line no-restricted-globals */

//     expected += interval
//     setTimeout(step, Math.max(0, interval - dt)) // take into account drift
// }
// }

const workercode = () => {
    // eslint-disable-next-line no-restricted-globals
    let initialTime = self.performance.now()

    const calcGapSeconds = () => {
        // eslint-disable-next-line no-restricted-globals
        const currentTime = self.performance.now()
        const elapsedSeconds = Math.floor((currentTime - initialTime) / 1000)
        if (elapsedSeconds !== 0) {
            // eslint-disable-next-line no-restricted-globals
            initialTime += elapsedSeconds * 1000
        }
        return elapsedSeconds
    }
    const timer = setInterval(() => {
        const gapSeconds = calcGapSeconds()
        for (let i = 0; i < gapSeconds; i++) {
            // eslint-disable-next-line no-restricted-globals
            self.postMessage("tick")
        }
    }, 1000)
}

let code = workercode.toString()
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))

const blob = new Blob([code], { type: "application/javascript" })
const timeWorker = URL.createObjectURL(blob)

module.exports = timeWorker
