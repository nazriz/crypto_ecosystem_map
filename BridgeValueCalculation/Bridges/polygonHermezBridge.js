const { getBridgeBalanceInfura } = require("./CalcTools/getBridgeBalanceInfura");

const polygonHermezBridgeBalance = async () => {
  const [polygonHermezBridge] = await Promise.all([
    getBridgeBalanceInfura("0xA68D85dF56E733A06443306A095646317B5Fa633"),
  ]);

  return polygonHermezBridge;
};

module.exports = { polygonHermezBridgeBalance };
