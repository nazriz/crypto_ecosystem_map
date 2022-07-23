const { getBridgeBalance } = require("../../CalcTools/getBridgeBalance");

const deversiFiBridgeBalance = async () => {
  const [deversiFiBridge] = await Promise.all([getBridgeBalance("0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b")]);

  return deversiFiBridge;
};

module.exports = { deversiFiBridgeBalance };
