const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const avalancheBridgeBalance = async () => {
  const [avalancheBridge] = await Promise.all([getBridgeBalance("0x8EB8a3b98659Cce290402893d0123abb75E3ab28")]);

  return avalancheBridge;
};

module.exports = { avalancheBridgeBalance };
