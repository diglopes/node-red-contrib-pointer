const { Base64 } = require("js-base64");
const api = require("./services/api");

module.exports = function(RED) {
  function Pointer(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.smsType = config.smsType;
    const user = node.credentials.user;
    const password = node.credentials.password;

    const token = Base64.encode(`${user}:${password}`);

    const headers = {
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      }
    };

    node.on("input", async msg => {
      try {
        if (node.smsType === "multiple-sms") {
          msg.payload = { messages: msg.payload };
        }
        msg.payload = await api.post(node.smsType, msg.payload, headers);

        node.send(msg);
      } catch (error) {
        node.error(error);
      }
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
