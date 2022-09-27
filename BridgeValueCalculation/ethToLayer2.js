const { priceFeeds, calculateTotal } = require("./CalcTools");
const fs = require("fs");
const path = require("path");

const {
  optimismBridgeBalance,
  arbitrumBridgeBalance,
  zkSyncBridgeBalance,
  dYdXBridgeBalance,
  loopringBridgeBalance,
  immutableXBridgeBalance,
  deversiFiBridgeBalance,
  sorareBridgeBalance,
  aztecBridgeBalance,
  OMGBridgeBalance,
  starknetBridgeBalance,
  polygonHermezBridgeBalance,
  metisAndromedaBridgeBalance,
  bobaNetworkBridgeBalance,
  zkSpaceBridgeBalance,
} = require("./Chains/layer2");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

// // Compiles all bridge data into an object, and returns that object
const ethToLayer2 = async () => {
  let layer2Totals = {};

  let [
    arbitrumResults,
    optimismResults,
    zkSyncResults,
    dYdXResults,
    loopringResults,
    immutableXResults,
    deversiFiResults,
    sorareResults,
    aztecResults,
    OMGResults,
    starknetResults,
    polygonHermezResults,
    metisAndromedaResults,
    bobaNetworkResults,
    ZKSpaceResults,
    feedPrices,
  ] = await Promise.all([
    arbitrumBridgeBalance(),
    optimismBridgeBalance(),
    zkSyncBridgeBalance(),
    dYdXBridgeBalance(),
    loopringBridgeBalance(),
    immutableXBridgeBalance(),
    deversiFiBridgeBalance(),
    sorareBridgeBalance(),
    aztecBridgeBalance(),
    OMGBridgeBalance(),
    starknetBridgeBalance(),
    polygonHermezBridgeBalance(),
    metisAndromedaBridgeBalance(),
    bobaNetworkBridgeBalance(),
    zkSpaceBridgeBalance(),
    feeds(),
  ]).catch((error) => console.log(error));

  layer2Totals["arbitrum"] = calculateTotal(arbitrumResults, feedPrices);
  layer2Totals["optimism"] = calculateTotal(optimismResults, feedPrices);
  layer2Totals["zkSync"] = calculateTotal(zkSyncResults, feedPrices);
  layer2Totals["dYdX"] = calculateTotal(dYdXResults, feedPrices);
  layer2Totals["loopring"] = calculateTotal(loopringResults, feedPrices);
  layer2Totals["immutableX"] = calculateTotal(immutableXResults, feedPrices);
  layer2Totals["deversiFi"] = calculateTotal(deversiFiResults, feedPrices);
  layer2Totals["sorare"] = calculateTotal(sorareResults, feedPrices);
  layer2Totals["aztec"] = calculateTotal(aztecResults, feedPrices);
  layer2Totals["OMG"] = calculateTotal(OMGResults, feedPrices);
  layer2Totals["starknet"] = calculateTotal(starknetResults, feedPrices);
  layer2Totals["polygonHermez"] = calculateTotal(polygonHermezResults, feedPrices);
  layer2Totals["metisAndromeda"] = calculateTotal(metisAndromedaResults, feedPrices);
  layer2Totals["bobaNetwork"] = calculateTotal(bobaNetworkResults, feedPrices);
  layer2Totals["ZKSpace"] = calculateTotal(ZKSpaceResults, feedPrices);

  let layer2Final = {};

  layer2Final["layer2"] = layer2Totals;

  fs.writeFile(path.resolve(__dirname, "../data/bridgedFromEthToLayer2.json"), JSON.stringify(layer2Final), (err) => {
    if (err) {
      console.error(err);
    }
  });

  return layer2Final;
};

// ethToLayer2();

module.exports = { ethToLayer2 };
