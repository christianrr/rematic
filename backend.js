const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');
const socketio = require('socket.io');
const serveStatic = require('serve-static');

let inited = false;

const settings = {};

let io;

class Conn extends EventEmitter {
    constructor() {
        super();
        this.on('event', data => {
            io.emit('event', data);
        });
        this.on('sysvar', data => {
            io.emit('sysvar', data);
        });
        this.on('program', data => {
            io.emit('program', data);
        });
        this.on('data', data => {
            io.emit('data', data);
        });
    }
}

const conn = new Conn();
const config = {};
const servers = [];

module.exports = function(RED, conf) {
    config[conf.name] = conf;
    if (!inited) {
        inited = true;
        init(RED);
    }
    createServer(RED, conf);
    return conn;
};

// From: http://stackoverflow.com/a/28592528/3016654
function join(...paths) {
    const trimRegex = new RegExp('^\\/|\\/$', 'g');
    return (
        '/' +
        paths
            .map(e => {
                return e.replace(trimRegex, '');
            })
            .filter(e => {
                return e;
            })
            .join('/')
    );
}

function init(RED) {
    const { log, server } = RED;
    const app = RED.httpNode || RED.httpAdmin;
    const redSettings = RED.settings;

    const uiSettings = redSettings.rematicWebapp || {};
    settings.path = 'rematic/';
    settings.title = uiSettings.title || 'rematic Web-App';
    settings.defaultGroupHeader = uiSettings.defaultGroup || 'Default';

    //log.info('Settings: ' + JSON.stringify(settings));
    const fullPath = join(redSettings.httpNodeRoot, settings.path);
    const socketIoPath = join(fullPath, 'backend');
    //log.info('Server: ' + JSON.stringify(server));

    app.use(join(settings.path), serveStatic(path.join(__dirname, 'www')));

    io = socketio(server, { 
        path: socketIoPath
    });

    log.info('rematic-webapp started at ' + fullPath);
    log.info('rematic-webapp socket opened at ' + socketIoPath);

    // auth
    io.use((socket, next) => {
        let app = socket.handshake.query.app;
        let token = socket.handshake.query.token;
        if (app && token && config[app] && token === config[app].token) {
            return next();
        }
        return next(new Error('authentication error'));
    });

    // handle connection
    io.on('connection', socket => {
        const address = socket.request.connection.remoteAddress;
        log.debug('rematic-webapp connect from ' + address);
        socket.on('getConfig', (id, cb) => {
            id = id.replace(/^\?\/?/, '').replace(/\/$/, '');
            log.info('rematic-webapp getConfig "' + id + '" from ' + address);
            if (config[id]) {
                cb({
                    config: {
                        name: config[id].name,
                        title: config[id].title,
                        elements: config[id].elements
                    },
                    data: conn.getData && conn.getData()
                });
            } else {
                log.error('rematic-webapp getConfig "' + id + '" unknown');
                cb({});
            }
        });

        socket.on('cmd', data => {
            conn.emit('cmd', data);
        });
    });

    io.on('connect_error', error => {
        console.log('connect_error', error);
    });
}

function createServer(RED, conf) {
    const { log } = RED;
    if(conf.server) {
        // get config node
        const serverConfig = RED.nodes.getNode(conf.server);

        // check if server is already running
        if (servers.indexOf(serverConfig.port) != -1) return;
        servers.push(serverConfig.port);
        
        const express = require('express');
        const app = express();
        let server;

        const redSettings = RED.settings;
        const fullPath = join(redSettings.httpNodeRoot, 'rematic/');
        const socketIoPath = join(fullPath, 'backend');
        
        if(serverConfig.key) {
            // https mode
            var options = {
                key: serverConfig.key,
                cert: serverConfig.cert,
                ca: serverConfig.chain
            };
            const https = require('https');
            server = https.createServer(options, app);
            io.attach(server);
    
            app.use(join(fullPath), serveStatic(path.join(__dirname, 'www')));
    
            log.info('rematic-webapp started at ' + fullPath + ' on port ' + serverConfig.port + ' (https)');
            log.info('rematic-webapp socket opened at ' + socketIoPath + ' on port ' + serverConfig.port + ' (https)');
    
            server.listen(parseInt(serverConfig.port));
        }
        else {
            // http mode
            const http = require('http');
            server = http.createServer(app);
            io.attach(server);
    
            app.use(join(fullPath), serveStatic(path.join(__dirname, 'www')));
    
            log.info('rematic-webapp started at ' + fullPath + ' on port ' + serverConfig.port + ' (http)');
            log.info('rematic-webapp socket opened at ' + socketIoPath + ' on port ' + serverConfig.port + ' (http)');
    
            server.listen(parseInt(serverConfig.port));
        }
    }
}