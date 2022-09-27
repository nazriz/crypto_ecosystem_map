const { getBridgeBalanceAlchemy } = require("../../CalcTools/getBridgeBalanceAlchemy");

const metisAndromedaBridgeBalance = async () => {
  const [metisAndromedaBridge] = await Promise.all([
    getBridgeBalanceAlchemy("0x3980c9ed79d2c191A89E02Fa3529C60eD6e9c04b"),
  ]);

  return metisAndromedaBridge;
};

module.exports = { metisAndromedaBridgeBalance };
