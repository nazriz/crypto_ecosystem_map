const { priceFeeds, calculateTotal } = require("./CalcTools");
const fs = require("fs");
const path = require("path");
const {
  avalancheBridgeBalance,
  solanaBridgeBalance,
  nearBridgeBalance,
  moonriverBridgeBalance,
  fantomBridgeBalance,
} = require("./Bridges");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

// // Compiles all bridge data into an object, and returns that object
const ethToAltL1 = async () => {
  let altL1Totals = {};

  // let [avalancheResults, solanaResults, nearResults, fantomResults, moonriverResults, feedPrices] = await Promise.all([
  //   avalancheBridgeBalance(),
  //   solanaBridgeBalance(),
  //   nearBridgeBalance(),
  //   fantomBridgeBalance(),
  //   moonriverBridgeBalance(),
  //   feeds(),
  // ]).catch((error) => console.log(error));

  let avalancheResults, solanaResults, nearResults, fantomResults, moonriverResults, feedPrices;

  // Limits concurrent calls, to not overload cloud instance
  console.log("avalanche");
  avalancheResults = await avalancheBridgeBalance();
  console.log("solana");
  solanaResults = await solanaBridgeBalance();
  console.log("near");
  nearResults = await nearBridgeBalance();
  console.log("fantom");
  fantomResults = await fantomBridgeBalance();
  console.log("moonriver");
  moonriverResults = await moonriverBridgeBalance();
  console.log("feeds");
  feedPrices = await feeds();

  altL1Totals["avalanche"] = calculateTotal(avalancheResults, feedPrices);
  altL1Totals["solana"] = calculateTotal(solanaResults, feedPrices);
  altL1Totals["near"] = calculateTotal(nearResults, feedPrices);
  altL1Totals["fantom"] = calculateTotal(fantomResults, feedPrices);
  altL1Totals["moonriver"] = calculateTotal(moonriverResults, feedPrices);

  let altL1Final = {};

  altL1Final["altL1"] = altL1Totals;

  fs.writeFile(path.resolve(__dirname, "../data/bridgedFromEthToAltL1.json"), JSON.stringify(altL1Final), (err) => {
    if (err) {
      console.error(err);
    }
  });
  return altL1Final;
};

module.exports = { ethToAltL1 };
