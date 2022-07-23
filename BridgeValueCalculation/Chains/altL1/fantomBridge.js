const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const fantomBridgeBalance = async () => {
  const [fantomAnyswapBridge] = await Promise.all([getBridgeBalance("0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE")]);

  return fantomAnyswapBridge;
};

module.exports = { fantomBridgeBalance };
