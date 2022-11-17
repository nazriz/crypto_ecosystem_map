const axios = require("axios");

const cosmosIBCTotalValue = async () => {
  // Protocol list extracted from https://cosmos.network/ecosystem/tokens/
  // only protocols enabled with IBC and with an mcap > $1m included.
  cosmosChainIds = [
    "osmosis",
    "secret",
    "sentinel",
    "evmos",
    "crypto-com-chain",
    "kava",
    "oec-token",
    "juno-network",
    "injective-protocol",
    "band-protocol",
    "persistence",
    "agoric",
    "kujira",
    "stargaze",
    "regen",
    "fetch-ai",
    "akash-network",
    "ki",
    "iris-network",
    "crescent-network",
    "switcheo",
    "assetmantle",
    "e-money",
    "cheqd-network",
    "comdex",
    "bostrom",
    "oraichain-token",
    "likecoin",
    "lambda",
    "decentr",
    "bitsong",
  ];

  coingeckoPayload = "";

  for (id in cosmosChainIds) {
    coingeckoPayload += "%2C%20" + cosmosChainIds[id];
  }

  let geckoData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coingeckoPayload}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  let data = await geckoData["data"];

  cosmosEcosystemTotalValue = 0;
  for ([item] of Object.entries(data)) {
    cosmosEcosystemTotalValue += data[item]["market_cap"];
  }

  return cosmosEcosystemTotalValue;
};

module.exports = { cosmosIBCTotalValue };
