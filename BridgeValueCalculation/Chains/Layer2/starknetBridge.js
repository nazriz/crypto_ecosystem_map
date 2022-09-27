const { getBridgeBalanceAlchemy } = require("../../CalcTools/getBridgeBalanceAlchemy");
const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const starknetBridgeBalance = async () => {
  const [ethStarkgate, daiVault] = await Promise.all([
    getBridgeBalanceAlchemy("0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419"),
    getBridgeBalanceInfura("0x0437465dfb5B79726e35F08559B0cBea55bb585C"),
  ]);
  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(ethStarkgate)) {
    for (const [key2, value2] of Object.entries(daiVault)) {
      if (key1 === key2) {
        bridgeTotal[key1] = value1 + value2;
      } else {
        continue;
      }
    }
  }
  return bridgeTotal;
};

module.exports = { starknetBridgeBalance };
