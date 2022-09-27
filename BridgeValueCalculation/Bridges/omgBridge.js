const { getBridgeBalanceInfura } = require("./CalcTools/getBridgeBalanceInfura");

const OMGBridgeBalance = async () => {
  const [OMGEthBridge, OMGERC20Bridge] = await Promise.all([
    getBridgeBalanceInfura("0x3Eed23eA148D356a72CA695DBCe2fceb40a32ce0"),
    getBridgeBalanceInfura("0x070cB1270A4B2bA53c81CeF89d0FD584Ed4F430B"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(OMGEthBridge)) {
    for (const [key2, value2] of Object.entries(OMGERC20Bridge)) {
      if (key1 === key2) {
        bridgeTotal[key1] = value1 + value2;
      } else {
        continue;
      }
    }
  }
  return bridgeTotal;
};

module.exports = { OMGBridgeBalance };
