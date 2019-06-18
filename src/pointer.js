const { Base64 } = require("js-base64");
const api = require("./services/api");

module.exports = function(RED) {
  function Pointer(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const user = node.credentials.user;
    const password = node.credentials.password;

    node.on("input", async msg => {
      const token = Base64.encode(`${user}:${password}`);

      try {
        msg.payload = await api.post(
          "single-sms",
          {
            to: msg.payload.to,
            message: msg.payload.message
          },
          {
            headers: {
              Authorization: `Basic ${token}`,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache"
            }
          }
        );
      } catch (error) {
        node.error(error);
      }

      node.send(msg);
    });
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
