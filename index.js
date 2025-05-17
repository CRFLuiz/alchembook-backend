let envFile = process.env.ENV ? `.env.${process.env.ENV.toLocaleLowerCase()}` : false;
if(envFile) require('dotenv').config({ path: envFile });

const express = require('express');

const routes = require('./src/routes');

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(routes);

server.listen(PORT, err => console.log(err || `Server is running on port ${PORT}`));