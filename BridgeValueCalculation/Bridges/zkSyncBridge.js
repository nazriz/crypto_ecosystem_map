const { getBridgeBalanceAlchemy } = require("./getBridgeBalanceAlchemy");

const zkSyncBridgeBalance = async () => {
  const [zkSyncBridge] = await Promise.all([getBridgeBalanceAlchemy("0xaBEA9132b05A70803a4E85094fD0e1800777fBEF")]);

  return zkSyncBridge;
};

module.exports = { zkSyncBridgeBalance };
