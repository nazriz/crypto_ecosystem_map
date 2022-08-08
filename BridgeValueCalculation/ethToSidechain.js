const { priceFeeds, calculateTotal } = require("./CalcTools");
const fs = require("fs");

const { polygonBridgeBalance, roninBridgeBalance, gnosisChainBridgeBalance } = require("./Chains/sidechain");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

// // Compiles all bridge data into an object, and returns that object
const ethToSidechain = async () => {
  let sidechainTotals = {};

  let [polygonResults, roninResults, gnosisChainResults, feedPrices] = await Promise.all([
    polygonBridgeBalance(),
    roninBridgeBalance(),
    gnosisChainBridgeBalance(),
    feeds(),
  ]);

  sidechainTotals["polygon"] = calculateTotal(polygonResults, feedPrices);
  sidechainTotals["ronin"] = calculateTotal(roninResults, feedPrices);
  sidechainTotals["gnosisChain"] = calculateTotal(gnosisChainResults, feedPrices);

  let sidechainFinal = {};

  sidechainFinal["sidechain"] = sidechainTotals;

  fs.writeFile("../data/bridgedFromEthToSidechain.json", JSON.stringify(sidechainFinal), (err) => {
    if (err) {
      console.error(err);
    }
  });

  return sidechainFinal;
};

// ethToSidechain();

module.exports = { ethToSidechain };
