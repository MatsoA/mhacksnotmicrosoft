// const express = require('express')
// const http = require('http')
// const path = require('path')
// const expressWs = require('express-ws')(app);

import express from 'express';
import expressWs from 'express-ws'
import ViteExpress from "vite-express";

const app = express();

expressWs(app);

//on connect
app.ws('/ws', (ws, req) => {
    console.log("Websocket connection");
    ws.on('message', (msg) => {
        console.log(msg);
        ws.send(msg);
    });

    console.log('socket', req);
}); 

console.log("Starting server!");
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));