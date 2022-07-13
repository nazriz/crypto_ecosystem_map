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

let fileData = fs.readFileSync("../chainTotalValue.json");
let chainTotalValue = JSON.parse(fileData);

const calculateChainValue = async () => {
  let [optimismTokens] = await Promise.all([optimismTokenTotalValue()]);

  let [optimismPrices] = await Promise.all([getPrices("optimistic-ethereum", await optimismTokens)]);

  console.log(optimismPrices);
};

calculateChainValue();

const test = async () => {
  // let bnbTokens = bnbTotalTokenValue();
  //   let testEthTokens = TESTethTokensTotalySupply();
  //   let optimismTokens = optimismTokenTotalValue();
  //   let arbitrumTokens = arbitrumTokenTotalValue();
  // let ethereumTokens = ethereumTokenTotalValue();
  // ethereumTokenTotalValue();
  //   let polygonTokens = await polygonTotalTokenValue();
  //   let avaxTokens = await avalancheTokenTotalValue();
  //   getPrices("polygon-pos", polygonTokens);
  //   getPrices("avalanche", avaxTokens);
  //   getPrices("arbitrum-one", await arbitrumTokens);
  //   getPrices("optimistic-ethereum", await optimismTokens);
  // getPrices("ethereum", await ethereumTokens);
  //   getPrices("ethereum", await testEthTokens);
  // getPrices("binance-smart-chain", await bnbTokens);
};
