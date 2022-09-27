const { getBridgeBalanceAlchemy } = require("./getBridgeBalanceAlchemy");

const zkSpaceBridgeBalance = async () => {
  const [zkSpaceBridge] = await Promise.all([getBridgeBalanceAlchemy("0x5CDAF83E077DBaC2692b5864CA18b61d67453Be8")]);

  return zkSpaceBridge;
};

module.exports = { zkSpaceBridgeBalance };
