const { priceFeeds, calculateTotal } = require("./CalcTools");
const fs = require("fs");
const {
  avalancheBridgeBalance,
  solanaBridgeBalance,
  nearBridgeBalance,
  moonriverBridgeBalance,
  fantomBridgeBalance,
} = require("./Chains/altL1");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

// // Compiles all bridge data into an object, and returns that object
const data = async () => {
  let altL1Totals = {};

  let [avalancheResults, solanaResults, nearResults, fantomResults, moonriverResults, feedPrices] = await Promise.all([
    avalancheBridgeBalance(),
    solanaBridgeBalance(),
    nearBridgeBalance(),
    fantomBridgeBalance(),
    moonriverBridgeBalance(),
    feeds(),
  ]);

  altL1Totals["avalanche"] = calculateTotal(avalancheResults, feedPrices);
  altL1Totals["solana"] = calculateTotal(solanaResults, feedPrices);
  altL1Totals["near"] = calculateTotal(nearResults, feedPrices);
  altL1Totals["fantom"] = calculateTotal(fantomResults, feedPrices);
  altL1Totals["moonriver"] = calculateTotal(moonriverResults, feedPrices);

  let altL1Final = {};

  altL1Final["altL1"] = altL1Totals;

  fs.writeFile("bridgedFromEthToAltL1.json", JSON.stringify(altL1Final), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

data();
