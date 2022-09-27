const { getBridgeBalanceInfura } = require("./CalcTools/getBridgeBalanceInfura");

const dYdXBridgeBalance = async () => {
  const [dYdXBridge] = await Promise.all([getBridgeBalanceInfura("0xD54f502e184B6B739d7D27a6410a67dc462D69c8")]);

  return dYdXBridge;
};

module.exports = { dYdXBridgeBalance };
