const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const bobaNetworkBridgeBalance = async () => {
  const [bobaNetworkBridge] = await Promise.all([getBridgeBalance("0xdc1664458d2f0B6090bEa60A8793A4E66c2F1c00")]);

  return bobaNetworkBridge;
};

module.exports = { bobaNetworkBridgeBalance };
