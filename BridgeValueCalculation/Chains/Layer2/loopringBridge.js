const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const loopringBridgeBalance = async () => {
  const [loopringBridge] = await Promise.all([getBridgeBalanceInfura("0x674bdf20A0F284D710BC40872100128e2d66Bd3f")]);
  return loopringBridge;
};

module.exports = { loopringBridgeBalance };
