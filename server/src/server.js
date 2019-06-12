require("dotenv").config();
import express from 'express';
import bodyParser from 'body-parser';

import logger from './lib/';
import routes from './routes'

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 4000;

const server = app
    .use((req, res, next) => {
        res.locals.startTime = Date.now();
        res.locals.errors = [];
        next();
    })
    .use(bodyParser.json())
    .use(express.static(__dirname + '/client/build/'))
    .use(router)
    .use('/api/', routes)
    .listen(PORT, () => {
        logger.info(`Express server is alive. Server on port ${ PORT }`);
    })

const gracefulShutdown = async() => {
    logger.debug('Shutting down gracefully...');
    await server.close();
    logger.debug('Closed all active connections.');
    setTimeout(() => {
        logger.warn('Could not close connections after 10 seconds. Forcefully shutting down');
        process.exit();
    }, 50000);
};

// // listen for TERM signal .e.g. kill
// process.on('SIGTERM', gracefulShutdown);
// // listen for INT signal e.g. Ctrl-C
// process.on('SIGINT', gracefulShutdown);
// // listen for nodemon's restart
// process.on('SIGUSR2', gracefulShutdown);