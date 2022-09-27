const { getBridgeBalanceAlchemy } = require("../../CalcTools/getBridgeBalanceAlchemy");

const avalancheBridgeBalance = async () => {
  const [avalancheBridge] = await Promise.all([getBridgeBalanceAlchemy("0x8EB8a3b98659Cce290402893d0123abb75E3ab28")]);

  return avalancheBridge;
};

module.exports = { avalancheBridgeBalance };
