const fs = require("fs");

const calcRatios = (ecosystemData) => {
  let totalValueBridgedFromEthereum = 0;
  for (let type in ecosystemData["Ethereum"]) {
    let chains = ecosystemData["Ethereum"][type];
    for (let [bridge, value] of Object.entries(chains)) {
      totalValueBridgedFromEthereum += value;
    }
  }

  let ratiosObject = {};
  for (let type in ecosystemData["Ethereum"]) {
    let chains = ecosystemData["Ethereum"][type];
    for (let [bridge2, value2] of Object.entries(chains)) {
      let ratio = (value2 / totalValueBridgedFromEthereum) * 100;
      ratiosObject[bridge2] = { ratio: ratio, dollars: value2 };
    }
  }

  let ecosystemRatios = ecosystemData["Ethereum"];
  let tempSubChain = {};
  let counter = 0;
  for (let [chain1, value1] of Object.entries(ecosystemRatios)) {
    counter++;
    let tempChain = ecosystemRatios[chain1];
    tempSubChain = {};
    for (let [chain2, value2] of Object.entries(tempChain)) {
      for (let [ratio, value3] of Object.entries(ratiosObject)) {
        if (chain2 === ratio) {
          tempSubChain[chain2] = value3;
        }
      }
      ecosystemRatios[chain1] = tempSubChain;
    }
  }

  let ecosystemRatiosFinal = {};

  ecosystemRatiosFinal["Ethereum"] = ecosystemRatios;
  ecosystemRatiosFinal["totalValueBridgedFromEthereum"] = totalValueBridgedFromEthereum;

  console.log(ecosystemRatiosFinal);

  fs.writeFile("BridgeRatios.json", JSON.stringify(ecosystemRatiosFinal), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = {
  calcRatios,
};

//DEBUG DATA
let ecosystem = {
  Ethereum: {
    layer2: {
      arbitrum: 1855109430.602241,
      optimism: 646273252.6611059,
      zkSync: 58614483.44570308,
      dYdX: 613533505.14431,
      loopring: 173821547.08601046,
      immutableX: 63655357.698145114,
      deversiFi: 27464378.74114421,
      sorare: 18825231.475119587,
      aztec: 4950100.933928354,
      OMG: 3028923.05799428,
      starknet: 621742.0821321699,
      polygonHermez: 299041.4487894291,
      metisAndromeda: 91760233.7782529,
      bobaNetwork: 42989278.395832464,
      ZKSpace: 35935929.969332255,
    },
    sidechain: {
      polygon: 3386802065.9640083,
      ronin: 552527.2837491987,
      gnosisChain: 201111853.38626048,
    },
    alt_l1: {
      avalanche: 1291824719.5724502,
      solana: 401717807.9382722,
      near: 409082200.7614021,
      fantom: 617691870.0157282,
      moonriver: 74961752.06582898,
    },
  },
};

calcRatios(ecosystem);
