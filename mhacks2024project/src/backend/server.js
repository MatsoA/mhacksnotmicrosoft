// const express = require('express')
// const http = require('http')
// const path = require('path')
// const expressWs = require('express-ws')(app);

import express from 'express';
import expressWs from 'express-ws'

const app = express();

expressWs(app);

//root route handler
app.get(',', (req, res, next) => {
    console.log('root');
    res.end();
});

//on connect
app.ws('/ws', (ws, req) => {
    //event listener for new websocket
    ws.on('message', (msg) => {
        console.log(msg);
        ws.send("MEWO");
    });

    console.log('socket', req);
}); 

app.listen(3000);


