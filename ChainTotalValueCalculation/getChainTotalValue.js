const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const {
  bitcoinTotalValue,
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
  let [ethereumTokens, optimismTokens, arbitrumTokens, polygonTokens, avalancheTokens, bnbTokens] = await Promise.all([
    ethereumTokenTotalValue(),
    optimismTokenTotalValue(),
    arbitrumTokenTotalValue(),
    polygonTotalTokenValue(),
    avalancheTokenTotalValue(),
    bnbTotalTokenValue(),
  ]);

  let [
    bitcoinEcosystemValue,
    ethereumEcosystemValue,
    optimismEcosystemValue,
    arbitrumEcosystemValue,
    polygonEcosystemValue,
    avalancheEcosystemValue,
    bnbEcosystemValue,
    solanaEcosystemValue,
  ] = await Promise.all([
    bitcoinTotalValue(),
    getPrices("ethereum", ethereumTokens),
    getPrices("optimistic-ethereum", optimismTokens),
    getPrices("arbitrum-one", arbitrumTokens),
    getPrices("polygon-pos", polygonTokens),
    getPrices("avalanche", avalancheTokens),
    getPrices("binance-smart-chain", bnbTokens),
    solanaTokenValue(),
  ]);

  //Add coingecko ID to this array, for it to be added to the request payload
  // Must additionally add logic to the for loop below for the mcap
  // to be included in final calculation
  let coingeckoMcapIds = [
    "avalanche-2",
    "matic-network",
    "optimism",
    "solana",
    "binancecoin",
    "bitcoin",
    "dogecoin",
    "tron",
    "ripple",
    "zcash",
    "cardano",
    "tezos",
    "polkadot",
    "algorand",
    "harmony",
    "celo",
  ];

  coingeckoMcapPayload = "";

  for (id in coingeckoMcapIds) {
    coingeckoMcapPayload += "%2C%20" + coingeckoMcapIds[id];
  }

  let geckoData = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum${coingeckoMcapPayload}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  let data = await geckoData["data"];

  let ethMcap,
    opMcap,
    avaxMcap,
    maticMcap,
    solMcap,
    bnbMcap,
    btcMcap,
    dogeMcap,
    tronMcap,
    xrpMcap,
    zecMcap,
    adaMcap,
    xtzMcap,
    dotMcap,
    celoMcap,
    harmonyMcap,
    algoMcap = 0;

  for (item in data) {
    let chain = data[item];
    if (chain["symbol"] === "eth") {
      ethMcap = chain["market_cap"];
    } else if (chain["symbol"] === "avax") {
      avaxMcap = chain["market_cap"];
    } else if (chain["symbol"] === "matic") {
      maticMcap = chain["market_cap"];
    } else if (chain["symbol"] === "op") {
      opMcap = chain["market_cap"];
    } else if (chain["symbol"] === "sol") {
      solMcap = chain["market_cap"];
    } else if (chain["symbol"] === "bnb") {
      bnbMcap = chain["market_cap"];
    } else if (chain["symbol"] === "btc") {
      btcMcap = chain["market_cap"];
    } else if (chain["symbol"] === "doge") {
      dogeMcap = chain["market_cap"];
    } else if (chain["symbol"] === "trx") {
      tronMcap = chain["market_cap"];
    } else if (chain["symbol"] === "xrp") {
      xrpMcap = chain["market_cap"];
    } else if (chain["symbol"] === "zec") {
      zecMcap = chain["market_cap"];
    } else if (chain["symbol"] === "ada") {
      adaMcap = chain["market_cap"];
    } else if (chain["symbol"] === "xtz") {
      xtzMcap = chain["market_cap"];
    } else if (chain["symbol"] === "dot") {
      dotMcap = chain["market_cap"];
    } else if (chain["symbol"] === "algo") {
      algoMcap = chain["market_cap"];
    } else if (chain["symbol"] === "one") {
      harmonyMcap = chain["market_cap"];
    } else if (chain["symbol"] === "celo") {
      celoMcap = chain["market_cap"];
    }
  }

  ethereumTotal["ethereum"] = { chainToken: ethMcap, ecosystemValue: ethereumEcosystemValue };

  layer2Totals["optimism"] = { chainToken: opMcap, ecosystemValue: optimismEcosystemValue };
  layer2Totals["arbitrum"] = { chainToken: "none", ecosystemValue: arbitrumEcosystemValue };

  sidechainTotals["polygon"] = { chainToken: maticMcap, ecosystemValue: polygonEcosystemValue };

  altL1Totals["avalanche"] = { chainToken: avaxMcap, ecosystemValue: avalancheEcosystemValue };
  altL1Totals["BNB"] = { chainToken: bnbMcap, ecosystemValue: bnbEcosystemValue };
  altL1Totals["solana"] = { chainToken: solMcap, ecosystemValue: solanaEcosystemValue };
  altL1Totals["bitcoin"] = { chainToken: btcMcap, ecosystemValue: bitcoinEcosystemValue };
  altL1Totals["dogecoin"] = { chainToken: dogeMcap, ecosystemValue: "none" };
  altL1Totals["tron"] = { chainToken: tronMcap, ecosystemValue: "noCalc" };
  altL1Totals["xrp"] = { chainToken: xrpMcap, ecosystemValue: "none" };
  altL1Totals["zcash"] = { chainToken: zecMcap, ecosystemValue: "none" };
  altL1Totals["cardano"] = { chainToken: adaMcap, ecosystemValue: "noCalc" };
  altL1Totals["tezos"] = { chainToken: xtzMcap, ecosystemValue: "noCalc" };
  altL1Totals["polkadot"] = { chainToken: dotMcap, ecosystemValue: "noCalc" };
  altL1Totals["algorand"] = { chainToken: algoMcap, ecosystemValue: "noCalc" };
  altL1Totals["harmony"] = { chainToken: harmonyMcap, ecosystemValue: "noCalc" };
  altL1Totals["celo"] = { chainToken: celoMcap, ecosystemValue: "noCalc" };

  chainTotalValue["ethereum"] = ethereumTotal;
  chainTotalValue["layer2"] = layer2Totals;
  chainTotalValue["sidechain"] = sidechainTotals;
  chainTotalValue["alt_l1"] = altL1Totals;

  let dataToWrite = JSON.stringify(chainTotalValue);
  console.log(dataToWrite);
  fs.writeFileSync("../chainTotalValue.json", dataToWrite);
};

calculateChainValue();
