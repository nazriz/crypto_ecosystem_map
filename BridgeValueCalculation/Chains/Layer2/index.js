const { optimismBridgeBalance } = require("./optimismBridge");
const { arbitrumBridgeBalance } = require("./arbitrumBridge");
const { zkSyncBridgeBalance } = require("./zkSyncBridge");
const { loopringBridgeBalance } = require("./loopringBridge");
const { immutableXBridgeBalance } = require("./immutableXBridge");
const { deversiFiBridgeBalance } = require("./deversiFiBridge");
const { sorareBridgeBalance } = require("./sorareBridge");
const { aztecBridgeBalance } = require("./aztecBridge");
const { dYdXBridgeBalance } = require("./dYdXBridge");
const { OMGBridgeBalance } = require("./omgBridge");

module.exports = {
  optimismBridgeBalance,
  arbitrumBridgeBalance,
  zkSyncBridgeBalance,
  dYdXBridgeBalance,
  loopringBridgeBalance,
  immutableXBridgeBalance,
  deversiFiBridgeBalance,
  sorareBridgeBalance,
  aztecBridgeBalance,
};
