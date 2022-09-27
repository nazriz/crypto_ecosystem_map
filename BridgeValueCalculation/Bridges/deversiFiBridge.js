const { getBridgeBalanceAlchemy } = require("./getBridgeBalanceAlchemy");

const deversiFiBridgeBalance = async () => {
  const [deversiFiBridge] = await Promise.all([getBridgeBalanceAlchemy("0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b")]);

  return deversiFiBridge;
};

module.exports = { deversiFiBridgeBalance };
