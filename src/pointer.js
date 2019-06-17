module.exports = function(RED) {
  function Pointer(config) {
    RED.nodes.createNode(this, config);
    const node = this;
  }
  RED.nodes.registerType("pointer", Pointer, {
    credentials: {
      user: {
        type: "text",
        required: true
      },
      password: {
        type: "password",
        required: true
      }
    }
  });
};
