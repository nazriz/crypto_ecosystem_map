const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const dYdXBridgeBalance = async () => {
  const [dYdXBridge] = await Promise.all([getBridgeBalance("0xD54f502e184B6B739d7D27a6410a67dc462D69c8")]);

  return dYdXBridge;
};

module.exports = { dYdXBridgeBalance };
