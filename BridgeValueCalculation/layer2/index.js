const { optimismBridgeBalance } = require("./optimismBridge");
const { arbitrumBridgeBalance } = require("../Bridges/arbitrumBridge");
const { zkSyncBridgeBalance } = require("./zkSyncBridge");
const { loopringBridgeBalance } = require("./loopringBridge");
const { immutableXBridgeBalance } = require("./immutableXBridge");
const { deversiFiBridgeBalance } = require("./deversiFiBridge");
const { sorareBridgeBalance } = require("./sorareBridge");
const { aztecBridgeBalance } = require("./aztecBridge");
const { dYdXBridgeBalance } = require("./dYdXBridge");
const { OMGBridgeBalance } = require("./omgBridge");
const { starknetBridgeBalance } = require("./starknetBridge");
const { polygonHermezBridgeBalance } = require("./polygonHermezBridge");
const { metisAndromedaBridgeBalance } = require("./metisAndromedaBridge");
const { bobaNetworkBridgeBalance } = require("./bobaNetworkBridge");
const { zkSpaceBridgeBalance } = require("./zkSpaceBridge");

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
  OMGBridgeBalance,
  starknetBridgeBalance,
  polygonHermezBridgeBalance,
  metisAndromedaBridgeBalance,
  bobaNetworkBridgeBalance,
  zkSpaceBridgeBalance,
};
