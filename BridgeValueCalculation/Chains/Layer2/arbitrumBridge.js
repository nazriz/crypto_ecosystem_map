const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const arbitrumBridgeBalance = async () => {
  const [arbitrumCustomGateway, arbitrumWethGateway, arbitrumERC20Gateway] = await Promise.all([
    getBridgeBalance("0xcEe284F754E854890e311e3280b767F80797180d"),
    getBridgeBalance("0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515"),
    getBridgeBalance("0xa3A7B6F88361F48403514059F1F16C8E78d60EeC"),
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
