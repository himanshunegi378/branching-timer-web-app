// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
if (typeof window.URL.createObjectURL === "undefined") {
    window.URL.createObjectURL = () => {
        // Do nothing
        // Mock this function for mapbox-gl to work
    }
}

class Worker {
    constructor(stringUrl) {
        this.url = stringUrl
        this.onmessage = () => {}
    }

    postMessage(msg) {
        this.onmessage(msg)
    }
}

window.Worker = Worker
