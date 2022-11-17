const { bitcoinTotalValue } = require("./bitcoin");
const { polygonTotalTokenValue } = require("./polygon");
const { ethereumTokenTotalValue } = require("./ethereum");
const { avalancheTokenTotalValue } = require("./avalanche");
const { arbitrumTokenTotalValue } = require("./arbitrum");
const { optimismTokenTotalValue } = require("./optimism");
const { bnbTotalTokenValue } = require("./bnb");
const { solanaTokenValue } = require("./solana");
const { cosmosIBCTotalValue } = require("./cosmos");

module.exports = {
  bitcoinTotalValue,
  polygonTotalTokenValue,
  ethereumTokenTotalValue,
  avalancheTokenTotalValue,
  arbitrumTokenTotalValue,
  optimismTokenTotalValue,
  bnbTotalTokenValue,
  solanaTokenValue,
  cosmosIBCTotalValue,
};
