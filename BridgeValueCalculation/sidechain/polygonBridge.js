const { getBridgeBalanceAlchemy } = require("../../CalcTools/getBridgeBalanceAlchemy");
const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const polygonBridgeBalance = async () => {
  const [polygonEthBridge, polygonPlasmaBridge, polygonERC20Bridge] = await Promise.all([
    getBridgeBalanceInfura("0x8484Ef722627bf18ca5Ae6BcF031c23E6e922B30"),
    getBridgeBalanceAlchemy("0x401F6c983eA34274ec46f84D70b31C151321188b"),
    getBridgeBalanceAlchemy("0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(polygonEthBridge)) {
    for (const [key2, value2] of Object.entries(polygonPlasmaBridge)) {
      for (const [key3, value3] of Object.entries(polygonERC20Bridge)) {
        if (key1 === key2 && key1 === key3) {
          bridgeTotal[key1] = value1 + value2 + value3;
        } else {
          continue;
        }
      }
    }
  }
  return bridgeTotal;
};

module.exports = { polygonBridgeBalance };
