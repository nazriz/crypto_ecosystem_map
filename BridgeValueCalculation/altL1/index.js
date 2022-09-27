const { avalancheBridgeBalance } = require("./avalancheBridge");

const { solanaBridgeBalance } = require("./solanaBridge");

const { nearBridgeBalance } = require("./nearBridge");

const { fantomBridgeBalance } = require("./fantomBridge");
const { moonriverBridgeBalance } = require("./moonriverBridge");

module.exports = {
  avalancheBridgeBalance,
  solanaBridgeBalance,
  nearBridgeBalance,
  fantomBridgeBalance,
  moonriverBridgeBalance,
};
