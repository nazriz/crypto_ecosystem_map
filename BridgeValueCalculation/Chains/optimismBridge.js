const { getBridgeBalanceAlchemy } = require("../Bridges/getBridgeBalanceAlchemy");
const { getBridgeBalanceInfura } = require("../CalcTools/getBridgeBalanceInfura");

const optimismBridgeBalance = async () => {
  const [optimismDaiBridge, optimismBridge, optimismSnxBridge] = await Promise.all([
    getBridgeBalanceAlchemy("0x467194771dae2967aef3ecbedd3bf9a310c76c65"),
    getBridgeBalanceInfura("0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"),
    getBridgeBalanceInfura("0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(optimismDaiBridge)) {
    for (const [key2, value2] of Object.entries(optimismBridge)) {
      for (const [key3, value3] of Object.entries(optimismSnxBridge)) {
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

// optimismBridgeBalance();

module.exports = { optimismBridgeBalance };
