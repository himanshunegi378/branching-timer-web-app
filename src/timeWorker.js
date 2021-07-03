const workercode = () => {
    var interval = 1000 // ms
    var expected = Date.now() + interval
    setTimeout(step, interval)
    function step() {
        var dt = Date.now() - expected // the drift (positive for overshooting)
        if (dt > interval) {
            // something really bad happened. Maybe the browser (tab) was inactive?
            // possibly special handling to avoid futile "catch up" run
        }
        self.postMessage("tick") /* eslint-disable-line no-restricted-globals */

        expected += interval
        setTimeout(step, Math.max(0, interval - dt)) // take into account drift
    }
}

let code = workercode.toString()
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))

const blob = new Blob([code], { type: "application/javascript" })
const timeWorker = URL.createObjectURL(blob)

module.exports = timeWorker
