const { getBridgeBalanceAlchemy } = require("./getBridgeBalanceAlchemy");
const { getBridgeBalanceInfura } = require("./getBridgeBalanceInfura");

const arbitrumBridgeBalance = async () => {
  const [arbitrumCustomGateway, arbitrumWethGateway, arbitrumERC20Gateway] = await Promise.all([
    getBridgeBalanceAlchemy("0xcEe284F754E854890e311e3280b767F80797180d"),
    getBridgeBalanceInfura("0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a"),
    getBridgeBalanceAlchemy("0xa3A7B6F88361F48403514059F1F16C8E78d60EeC"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(arbitrumCustomGateway)) {
    for (const [key2, value2] of Object.entries(arbitrumWethGateway)) {
      for (const [key3, value3] of Object.entries(arbitrumERC20Gateway)) {
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

module.exports = { arbitrumBridgeBalance };
