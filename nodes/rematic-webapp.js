module.exports = function(RED) {
    class RematicWebApp {
        constructor(config) {
            const conn = require('../backend')(RED, config);

            RED.nodes.createNode(this, config);
            this.ccu = RED.nodes.getNode(config.ccuConfig);
            config.elements = [];

            if (!this.ccu) {
                return;
            }

            var node = this;

            this.idSubscription = this.ccu.subscribe({}, msg => {
                conn.emit('event', msg);
            });

            this.idSysvarSubscription = this.ccu.subscribeSysvar({}, msg => {
                conn.emit('sysvar', msg);
            });

            this.idProgramSubscription = this.ccu.subscribeProgram({}, msg => {
                conn.emit('program', msg);
            });

            conn.on('cmd', msg => {
                if (msg.type === 'hm') {
                    switch (msg.method) {
                        case 'setValue':
                            this.ccu.setValue(msg.iface, msg.address, msg.datapoint, msg.value);
                            break;
                        case 'programExecute':
                            this.ccu.programExecute(msg.name);
                            break;
                        case 'setVariable':
                            this.ccu.setVariable(msg.name, msg.value);
                            break;
                        default:
                    }
                } else if (msg.type === 'msg') {
                    if(msg.appName === config.name) {
                        var newMsg = { topic: msg.appName, payload: msg.value };
                        if (msg.value === 'WebApp connected') {
                            this.send([newMsg, null]);
                        } else this.send([null, newMsg]);
                    }
                }
            });

            conn.getData = () => {
                if (!this.ccu.sysvar || !this.ccu.channelRooms) {
                    return null;
                }

                const channels = {};
                const channelIface = {};
                Object.keys(this.ccu.metadata.devices).forEach(iface => {
                    Object.keys(this.ccu.metadata.devices[iface]).forEach(address => {
                        channelIface[address] = iface;
                    });
                    Object.assign(channels, this.ccu.metadata.devices[iface]);
                });

                return {
                    sysvar: this.ccu.sysvar,
                    values: this.ccu.values,
                    channels: channels
                };
            };

            this.on('input', (msg, done) => {
                if (msg.topic === 'config') {
                    const existingIndex = config.elements.findIndex(element => element.id === msg.payload.id);
                    if (existingIndex >= 0) {
                        config.elements.splice(existingIndex, 1, msg.payload);
                    } else config.elements.push(msg.payload);

                    config.elements.sort((a, b) => (parseInt(a.order) > parseInt(b.order) ? 1 : -1));
                } else {
                    //this.log('Forwarded data to socket');
                    conn.emit('data', msg);
                }
                if (done) {
                    done();
                }
            });

            this.on('close', done => {
                this._destructor(done);
            });
        }

        _destructor(done) {
            this.ccu.unsubscribe(this.idSubscription);
            this.ccu.unsubscribeSysvar(this.idSysvarSubscription);
            this.ccu.unsubscribeProgram(this.idProgramSubscription);
            done();
        }
    }

    RED.nodes.registerType('rematic-webapp', RematicWebApp);
};
