const { priceFeeds, calculateTotal } = require("./CalcTools");
const fs = require("fs");
const path = require("path");

const { polygonBridgeBalance, roninBridgeBalance, gnosisChainBridgeBalance } = require("./Bridges");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

// // Compiles all bridge data into an object, and returns that object
const ethToSidechain = async () => {
  let sidechainTotals = {};

  // let [polygonResults, roninResults, gnosisChainResults, feedPrices] = await Promise.all([
  //   polygonBridgeBalance(),
  //   roninBridgeBalance(),
  //   gnosisChainBridgeBalance(),
  //   feeds(),
  // ]).catch((error) => console.log(error));

  let polygonResults, roninResults, gnosisChainResults, feedPrices;

  console.log("polygon");
  polygonResults = await polygonBridgeBalance();
  console.log("polygon");
  roninResults = await roninBridgeBalance();
  console.log("gnosis");
  gnosisChainResults = await gnosisChainBridgeBalance();
  console.log("feeds");
  feedPrices = feeds();

  sidechainTotals["polygon"] = calculateTotal(polygonResults, feedPrices);
  sidechainTotals["ronin"] = calculateTotal(roninResults, feedPrices);
  sidechainTotals["gnosisChain"] = calculateTotal(gnosisChainResults, feedPrices);

  let sidechainFinal = {};

  sidechainFinal["sidechain"] = sidechainTotals;

  fs.writeFile(
    path.resolve(__dirname, "../data/bridgedFromEthToSidechain.json"),
    JSON.stringify(sidechainFinal),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  console.log(sidechainFinal);
  return sidechainFinal;
};

module.exports = { ethToSidechain };
