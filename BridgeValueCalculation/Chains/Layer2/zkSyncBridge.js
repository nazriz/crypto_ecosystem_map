const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const zkSyncBridgeBalance = async () => {
  const [zkSyncBridge] = await Promise.all([getBridgeBalance("0xaBEA9132b05A70803a4E85094fD0e1800777fBEF")]);

  return zkSyncBridge;
};

module.exports = { zkSyncBridgeBalance };
