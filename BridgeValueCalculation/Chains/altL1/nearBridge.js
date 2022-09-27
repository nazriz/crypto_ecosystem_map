const { getBridgeBalanceInfura } = require("../../CalcTools/getBridgeBalanceInfura");

const nearBridgeBalance = async () => {
  // Contract address holds the entire uncirculating supply for some projects,
  // These tokens have been omitted from the calculation:
  // Omitted tokens:
  // Aurora (AURORA)
  // Aurigami (PLY)
  // Octopus Network (OCT)
  // YouMinter (UMINT)

  const [nearRainbowBridge] = await Promise.all([getBridgeBalanceInfura("0x23Ddd3e3692d1861Ed57EDE224608875809e127f")]);

  return nearRainbowBridge;
};

module.exports = { nearBridgeBalance };
