const pty = require("node-pty");

class Terminal {
    constructor() {
        this.ptyProcess = pty.spawn("bash", [], {
            name: "xterm-color",
            cols: 112,
            rows: 42,
            cwd: process.env.HOME,
            env: process.env,
        });
        //this.ptyProcess.write("export HISTTIMEFORMAT=\"%F %T \"")
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
