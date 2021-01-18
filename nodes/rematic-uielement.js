module.exports = function(RED) {
    function UIElementNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        setTimeout(() => {
            node.send({ topic: 'config', payload: config });
        }, 100);
    }
    RED.nodes.registerType('rematic-uielement', UIElementNode);
};
