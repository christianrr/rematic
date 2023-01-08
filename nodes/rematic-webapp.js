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

            conn.on('cmd', async cmd => {
                await this.handleCommand(cmd, config);
            });

            conn.on('cmds', async cmds => {
                for (let cmd of cmds) {
                    await this.handleCommand(cmd, config);
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

        async delay(ms) {
            return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
          })
        }

        async handleCommand(cmd, config) {
            if (cmd.delay) await this.delay(cmd.delay);
            if (cmd.type === 'hm') {
                switch (cmd.method) {
                    case 'setValue':
                        this.ccu.setValue(cmd.iface, cmd.address, cmd.datapoint, cmd.value);
                        break;
                    case 'programExecute':
                        this.ccu.programExecute(cmd.name);
                        break;
                    case 'setVariable':
                        this.ccu.setVariable(cmd.name, cmd.value);
                        break;
                    default:
                }
            } else if (cmd.type === 'msg') {
                if(cmd.appName === config.name) {
                    var newMsg = { topic: cmd.appName, payload: cmd.value };
                    if (cmd.value === 'WebApp connected') {
                        this.send([newMsg, null]);
                    } else this.send([null, newMsg]);
                }
            }
        }
    }

    RED.nodes.registerType('rematic-webapp', RematicWebApp);
};
