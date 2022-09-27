const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const immutableXBridgeBalance = async () => {
  const [immutableXBridge] = await Promise.all([getBridgeBalanceInfura("0x5FDCCA53617f4d2b9134B29090C87D01058e27e9")]);

  return immutableXBridge;
};

module.exports = { immutableXBridgeBalance };
