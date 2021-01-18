module.exports = function(RED) {
    function UIGroup(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        this.elements = [];

        this.on('input', (msg, done) => {
            // store all connected elements
            if (msg.topic === 'config') {
                const existingIndex = node.elements.findIndex(element => element.id === msg.payload.id);
                if (existingIndex >= 0) {
                    node.elements.splice(existingIndex, 1, msg.payload);
                } else node.elements.push(msg.payload);
            }

            // sort and forward them to connected nodes
            node.elements.sort((a, b) => (parseInt(a.order) > parseInt(b.order) ? 1 : -1));
            const message = { topic: 'config', payload: config };
            message.payload.items = node.elements;
            node.send(message);

            if (done) done();
        });
    }
    RED.nodes.registerType('rematic-uigroup', UIGroup);
};
