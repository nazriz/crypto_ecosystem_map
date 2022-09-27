const { getBridgeBalanceAlchemy } = require("../../CalcTools/getBridgeBalanceAlchemy");
const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const gnosisChainBridgeBalance = async () => {
  const [xDaiBridge, OmniBridge, OmniBridgeStablecoins] = await Promise.all([
    getBridgeBalanceInfura("0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016"),
    getBridgeBalanceInfura("0x88ad09518695c6c3712AC10a214bE5109a655671"),
    getBridgeBalanceInfura("0x87D48c565D0D85770406D248efd7dc3cbd41e729"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(xDaiBridge)) {
    for (const [key2, value2] of Object.entries(OmniBridge)) {
      for (const [key3, value3] of Object.entries(OmniBridgeStablecoins)) {
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

module.exports = { gnosisChainBridgeBalance };
