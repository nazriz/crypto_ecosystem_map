const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const moonriverBridgeBalance = async () => {
  const [moonRiverBridge] = await Promise.all([getBridgeBalanceInfura("0x10c6b61DbF44a083Aec3780aCF769C77BE747E23")]);

  return moonRiverBridge;
};

module.exports = { moonriverBridgeBalance };
