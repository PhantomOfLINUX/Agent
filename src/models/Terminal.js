const pty = require("node-pty");

class Terminal {
    constructor() {
        this.ptyProcess = pty.spawn("bash", [], {
            name: "xterm-color",
            cols: 100,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env,
        });
    }

    onData(callback) {
        this.ptyProcess.on("data", callback);
    }

    write(data) {
        this.ptyProcess.write(data);
    }

    resize(cols, rows) {
        this.ptyProcess.resize(cols, rows);
    }

    destroy() {
        this.ptyProcess.kill();
    }
}

module.exports = Terminal;
