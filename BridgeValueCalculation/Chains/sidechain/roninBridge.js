const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

// I believe the bridge is still halted/might change altogether
// But including it as is, so that I don't forget about it in the future
const roninBridgeBalance = async () => {
  const [roninBridge] = await Promise.all([getBridgeBalance("0x1A2a1c938CE3eC39b6D47113c7955bAa9DD454F2")]);

  return roninBridge;
};

module.exports = { roninBridgeBalance };
