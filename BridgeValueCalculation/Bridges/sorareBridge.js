const { getBridgeBalanceInfura } = require("./getBridgeBalanceInfura");

const sorareBridgeBalance = async () => {
  const [sorareBridge] = await Promise.all([getBridgeBalanceInfura("0xF5C9F957705bea56a7e806943f98F7777B995826")]);

  return sorareBridge;
};

module.exports = { sorareBridgeBalance };
