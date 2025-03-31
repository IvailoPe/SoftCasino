import express from "express"
import cors from 'cors';
import mongoose, { connections } from 'mongoose';
import routes from './routes.js';
import expressWs from 'express-ws'

const app = express()
const port = 3000

try {
    await mongoose.connect('mongodb://localhost:27017/soft-casino');
    console.log('DB Connected!');
} catch (err) {
    console.log('Cannot connect to DB!');
}

expressWs(app);

const wsConnections = [];

app.ws("/api/chat", (ws, req) => {
    ws.on('message', function (msg) {
        let data = JSON.parse(msg);
        if (data.action === "first-time") {
            wsConnections.push({ ws, id: data.id, username: data.username, picture: data.picture });
        }
        else if (data.action === "message" && wsConnections.length > 1) {
            let sender = wsConnections.find((connections) => {
                if (connections.ws === ws) {
                    return true;
                }
            })
            for (const connection of wsConnections) {
                if (connection.ws !== ws) {
                    connection.ws.send(JSON.stringify({
                        username: sender.username,
                        message: data.message,
                        id: sender.id,
                        picture: sender.picture
                    }))
                }
            }
        }
    });
    ws.on("close", function () {
        for (const connection of wsConnections) {
            if (connection.ws === ws) {
                wsConnections.splice(wsConnections.indexOf(connection.ws), 1)
                break;
            }
        }
    })
})

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use('/api', routes);

app.listen(port, () => console.log('Server is listening on http://localhost:3000/api'));