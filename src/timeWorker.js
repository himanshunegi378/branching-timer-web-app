const workercode = () => {
  setInterval(() => {
    self.postMessage('tick'); /* eslint-disable-line no-restricted-globals */
  }, 1000);
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const timeWorker = URL.createObjectURL(blob);

module.exports = timeWorker;
