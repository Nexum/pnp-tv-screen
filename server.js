const {createServer} = require('http');
const next = require("next");

const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
});
const nextHandler = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;


nextApp.prepare().then(() => {
    const server = createServer((req, res) => {
        req.io = io;

        return nextHandler(req, res);
    }).listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log("ready on " + port);
    });
    const io = require('socket.io')(server);

    io.on("connect", socket => {
        console.log("new socket");
    });
});