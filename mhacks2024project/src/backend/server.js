// const express = require('express')
// const http = require('http')
// const path = require('path')
// const expressWs = require('express-ws')(app);

import express from 'express';
import expressWs from 'express-ws'
import ViteExpress from "vite-express";

const app = express();

expressWs(app);

let users = new Map();

function constructStateMessage(user_id) {
    let user = users.get(user_id)
    return {
        user_id: user.id
    };
}

// On connect
let next_user_id = 0;
app.ws('/ws', (ws, req) => {
    console.log("User connected!");

    // Create user
    let user = {
        id: next_user_id
    }
    users.set(user.id, user);
    next_user_id += 1;

    // Send state to user
    ws.send(JSON.stringify(constructStateMessage(user.id)));

    ws.on('message', (msg) => {
        // TODO
    });
}); 

console.log("Starting server!");
ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));