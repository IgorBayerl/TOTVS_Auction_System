const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

//Importing the routes
const authRoute = require('./routes/auth');
const auctionRoute = require('./routes/auction');

dotenv.config();


app.use(cors());
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/auction', auctionRoute);

app.listen( process.env.PORT || 3333, ()=> console.log(`APP Server ${process.env.PORT}`) );



//Start the web socket server
// const WebSocket = require('ws');
// const http = require('http');
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });


// let arrayUsuarios = [];

// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });
 
//     ws.send('Hi there, I am a WebSocket server');
// });

// server.listen(process.env.WS_PORT || 8999, () =>  console.log(`WS Server ${server.address().port} `));

