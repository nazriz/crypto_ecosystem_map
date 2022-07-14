const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const {
  bitcoinMcapTvl,
  polygonTotalTokenValue,
  ethereumTokenTotalValue,
  avalancheTokenTotalValue,
  arbitrumTokenTotalValue,
  optimismTokenTotalValue,
  bnbTotalTokenValue,
  solanaTokenValue,
} = require("./Chains");

const { tokenTotalSupply, ethTokenTotalSupply, getPrices } = require("./CalcTools");
const { channel } = require("diagnostics_channel");

let fileData = fs.readFileSync("../chainTotalValue.json");
let chainTotalValue = JSON.parse(fileData);
let ethereumTotal = {};
let layer2Totals = {};
let sidechainTotals = {};
let altL1Totals = {};

for (const [key, value] of Object.entries(chainTotalValue)) {
  if (key === "ethereum") {
    ethereumTotal = chainTotalValue[key];
  } else if (key === "layer2") {
    layer2Totals = chainTotalValue[key];
  } else if (key === "sidechain") {
    sidechainTotals = chainTotalValue[key];
  } else if (key === "alt_l1") {
    altL1Totals = chainTotalValue[key];
  }
}

const calculateChainValue = async () => {
  // let [ethereumTokens, optimismTokens, arbitrumTokens, polygonTokens, avalancheTokens, bnbTokens] = await Promise.all([
  //   ethereumTokenTotalValue(),
  //   optimismTokenTotalValue(),
  //   arbitrumTokenTotalValue(),
  //   polygonTotalTokenValue(),
  //   avalancheTokenTotalValue(),
  //   bnbTotalTokenValue(),
  // ]);

  // let [
  //   ethereumTotalValue,
  //   optimismTotalValue,
  //   arbitrumTotalValue,
  //   polygonTotalValue,
  //   avalancheTotalValue,
  //   bnbTotalValue,
  //   solanaTotalValue,
  // ] = await Promise.all([
  //   getPrices("ethereum", ethereumTokens),
  //   getPrices("optimistic-ethereum", optimismTokens),
  //   getPrices("arbitrum-one", arbitrumTokens),
  //   getPrices("polygon-pos", polygonTokens),
  //   getPrices("avalanche", avalancheTokens),
  //   getPrices("binance-smart-chain", bnbTokens),
  //   solanaTokenValue(),
  // ]);

  let ethMcap,
    opMcap,
    avaxMcap,
    maticMcap = 0;

  //Add coingecko ID to this array, for it to be added to the request payload
  // Must additionally add logic to the for loop below for the mcap
  // to be included in final calculation
  let coingeckoMcapIds = ["avalanche-2", "matic-network"];

  coingeckoMcapPayload = "";

  for (id in coingeckoMcapIds) {
    coingeckoMcapPayload += "%2C%20" + coingeckoMcapIds[id];
  }

  let geckoData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum${coingeckoMcapPayload}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  let data = await geckoData["data"];

  for (item in data) {
    let chain = data[item];
    if (chain["symbol"] === "eth") {
      ethMcap = chain["market_cap"];
    } else if (chain["symbol"] === "avax") {
      avaxMcap = chain["market_cap"];
    } else if (chain["symbol"] === "matic") {
      maticMcap = chain["market_cap"];
    }
  }

  // ethereumTotal["ethereum"] = ethereumTotalValue;

  // layer2Totals["optimism"] = optimismTotalValue;
  // layer2Totals["arbitrum"] = arbitrumTotalValue;

  // sidechainTotals["polygon"] = polygonTotalValue;

  // altL1Totals["avalanche"] = avalancheTotalValue;
  // altL1Totals["BNB"] = bnbTotalValue;
  // altL1Totals["solana"] = solanaTotalValue;

  // chainTotalValue["ethereum"] = ethereumTotal;
  // chainTotalValue["layer2"] = layer2Totals;
  // chainTotalValue["sidechain"] = sidechainTotals;
  // chainTotalValue["alt_l1"] = altL1Totals;
  let dataToWrite = JSON.stringify(chainTotalValue);
  console.log(dataToWrite);
  fs.writeFileSync("../chainTotalValue.json", dataToWrite);
};

calculateChainValue();

const test = async () => {
  let geckoData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum%2C%20avalanche-2%2C%20matic-network&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  let data = await geckoData["data"];

  console.log(data);

  for (item in data) {
    let chain = data[item];
    if (chain["symbol"] == "eth") {
      console.log("Found it!");
    } else {
      console.log("Not Eth!");
    }
  }
};

// test();
