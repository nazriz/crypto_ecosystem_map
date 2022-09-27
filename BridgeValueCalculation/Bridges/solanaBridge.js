const { getBridgeBalanceInfura } = require("./getBridgeBalanceInfura");
const { getBridgeBalanceAlchemy } = require("./getBridgeBalanceAlchemy");

const solanaBridgeBalance = async () => {
  const [solanaSolletBridge, solanaWormHoleBridge, solanaWormholeTokenBridge] = await Promise.all([
    getBridgeBalanceInfura("0xeae57ce9cc1984F202e15e038B964bb8bdF7229a"),
    getBridgeBalanceAlchemy("0xf92cD566Ea4864356C5491c177A430C222d7e678"),
    getBridgeBalanceAlchemy("0x3ee18B2214AFF97000D974cf647E7C347E8fa585"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(solanaSolletBridge)) {
    for (const [key2, value2] of Object.entries(solanaWormHoleBridge)) {
      for (const [key3, value3] of Object.entries(solanaWormholeTokenBridge)) {
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

module.exports = { solanaBridgeBalance };
