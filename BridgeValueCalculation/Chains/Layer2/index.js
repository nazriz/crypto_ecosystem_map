const { optimismBridgeBalance } = require("./optimismBridge");
const { arbitrumBridgeBalance } = require("./arbitrumBridge");
const { zkSyncBridgeBalance } = require("./zkSyncBridge");
const { loopringBridgeBalance } = require("./loopringBridge");
const { immutableXBridgeBalance } = require("./immutableXBridge");

const { dYdXBridgeBalance } = require("./dYdXBridge");

module.exports = {
  optimismBridgeBalance,
  arbitrumBridgeBalance,
  zkSyncBridgeBalance,
  dYdXBridgeBalance,
  loopringBridgeBalance,
  immutableXBridgeBalance,
};
