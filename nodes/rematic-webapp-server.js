module.exports = function(RED) {
    function RematicWebAppServer(n) {
        RED.nodes.createNode(this, n);
        this.port = n.port;
        this.key = n.key;
        this.cert = n.cert;
        this.chain = n.chain;
    }
    RED.nodes.registerType('rematic-webapp-server', RematicWebAppServer);
};
