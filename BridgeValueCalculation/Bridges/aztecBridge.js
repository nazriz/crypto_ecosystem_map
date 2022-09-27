const { getBridgeBalanceInfura } = require("./getBridgeBalanceInfura");

const aztecBridgeBalance = async () => {
  const [aztecBridge] = await Promise.all([getBridgeBalanceInfura("0x737901bea3eeb88459df9ef1BE8fF3Ae1B42A2ba")]);

  return aztecBridge;
};

module.exports = { aztecBridgeBalance };
