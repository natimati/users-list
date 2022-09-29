const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users'
        };
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(
            express.static(path.join(__dirname, "./client/build"))
        );
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.auth, require('./routes/auth'));
        this.app.use(this.paths.users, require('./routes/users'));
        this.app.get("*", (req, res) => {
            res.sendFile(
                path.join(__dirname, "./client/build/index.html")
            );
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }
}

module.exports = Server;