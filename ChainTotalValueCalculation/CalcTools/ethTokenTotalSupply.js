const { ethers } = require("ethers");
const erc20ABI = require("./erc20_abi.json");
const axios = require("axios");
const fs = require("fs");

require("dotenv").config();

// const provider = new ethers.providers.InfuraProvider("homestead", {
//   projectId: process.env.INFURA_PROJECT_ID,
//   projectSecret: process.env.INFURA_PROJECT_SECRET,
// });

const provider = new ethers.providers.AlchemyProvider((network = "homestead"), process.env.ALCHEMY_API_KEY);

// Token supply on Ethereum is handled differently from token supply on alt chains
// Since often the total token supply =/= to circulating supply
// This modified tokenTotalSupply function uses messari circulating token supply data
// to ensure addtional accuracy of the calculation. Where the messari api returns nothing
// The total token supply returned from onchain is used. The retrieved circulating supply
// Is saved locally, to prevent hitting the messari free tier API limits of 30 reqs p/minute
// This means that circulating token supply will need to be manually updated occassionally
// From the use of a seperate function.

const ethTokenTotalSupply = async (chainProvider, circSupplyFile, contractAddress, decimal) => {
  let tokenContract = new ethers.Contract(contractAddress, erc20ABI, chainProvider);

  let [tokenSupply, tokenTicker] = await Promise.all([
    parseFloat(ethers.utils.formatUnits(await tokenContract.totalSupply(), decimal)),
    tokenContract.symbol(),
  ]);

  let tickerAddressObj = {};
  tickerAddressObj[[tokenTicker]] = contractAddress;

  if (!(tokenTicker in circSupplyFile)) {
    let tickerLower = tokenTicker.toLowerCase();
    try {
      let data = await axios.get(`https://data.messari.io/api/v1/assets/${tickerLower}/metrics`);
      let circSupply = data["data"]["data"]["supply"]["circulating"];
      if (circSupply != null) {
        tokenSupply = circSupply;
        circSupplyFile[tokenTicker] = tokenSupply;
        let dataToWrite = JSON.stringify(circSupplyFile);
        fs.writeFileSync("eth_circulating_token_supply_data.json", dataToWrite);
      }
    } catch (error) {
      tokenSupply = tokenSupply;
    }
  } else {
    tokenSupply = parseFloat(circSupplyFile[tokenTicker]);
  }

  let array = [];

  array = [tokenTicker, tokenSupply, contractAddress];
  return array;
};

module.exports = { ethTokenTotalSupply };
