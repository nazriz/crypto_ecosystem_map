const axios = require("axios");

const defiLlamaChainTVLData = async () => {
  const [chainData] = await Promise.all([
    await axios.get(
      `https://api.llama.fi/chains
          `
    ),
  ]);

  let newChainData = chainData["data"];

  const getChainTVL = (chainName, data) => {
    for (let i = 0; i < data.length; i++) {
      let tempData = data[i];
      if (tempData["name"] === chainName) {
        return tempData["tvl"];
      } else {
        continue;
      }
    }
  };

  let chainTVL = {};

  // chainTVL["Ethereum"] = getChainTVL("ETH", newChainData);
  // chainTVL["OptimismTVL"] = getChainTVL("Optimism", newChainData);

  //   console.log(optimismTVL);

  return chainData;
};

module.exports = { defiLlamaChainTVLData };
