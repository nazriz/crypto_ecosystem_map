const { bitcoinMcapTvl } = require("./bitcoin");
const { polygonTotalTokenValue } = require("./polygon");
const { ethereumTokenTotalValue } = require("./ethereum");
const { avalancheTokenTotalValue } = require("./avalanche");
const { arbitrumTokenTotalValue } = require("./arbitrum");
const { optimismTokenTotalValue } = require("./optimism");
const { bnbTotalTokenValue } = require("./bnb");
const { solanaTokenValue } = require("./solana");

module.exports = {
  bitcoinMcapTvl,
  polygonTotalTokenValue,
  ethereumTokenTotalValue,
  avalancheTokenTotalValue,
  arbitrumTokenTotalValue,
  optimismTokenTotalValue,
  bnbTotalTokenValue,
  solanaTokenValue,
};
