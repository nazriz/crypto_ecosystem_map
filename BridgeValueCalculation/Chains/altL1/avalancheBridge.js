const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const avalancheBridgeBalance = async () => {
  const avalancheBridgeAddress = "0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0";

  const [avalancheBridge] = await Promise.all([getBridgeBalance("0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0")]);

  return avalancheBridge;
};

module.exports = { avalancheBridgeBalance };
