const fs = require("fs");
const { calcRatios } = require("./calculateRatios");

const splitChainTotalData = () => {
  let fileData = fs.readFileSync("chainTotalValue.json");
  let chainTotalValue = JSON.parse(fileData);

  let mcapObj = {};
  let ecosystemValueObj = {};
  for (let type in chainTotalValue) {
    let chainType = chainTotalValue[type];
    let tempMcapObj = {};
    let tempEcosystemObj = {};

    for (let chain in chainType) {
      let chainData = chainType[chain];
      tempMcapObj[chain] = chainData["chainToken"];
      tempEcosystemObj[chain] = chainData["ecosystemValue"];
    }
    mcapObj[type] = tempMcapObj;
    ecosystemValueObj[type] = tempEcosystemObj;
  }
  targetMcapObj = mcapObj;
  targetEcosystemValueObj = ecosystemValueObj;

  return [targetMcapObj, targetEcosystemValueObj];
};

let splitData = splitChainTotalData();

// Import the bridge data
let fileData = fs.readFileSync("bridgedFromEth.json");
let bridgeData = JSON.parse(fileData);

let bridgedFromEth = calcRatios(bridgeData["Ethereum"], "bridgedFromEth");
let chainTokenMcap = calcRatios(splitData[0], "chainTokenMcap");
let ecosystemValue = calcRatios(splitData[1], "ecosystemValue");

// console.log(bridgedFromEth);

// Get the unique chain names accross all data sets
const getUniqueChainNames = () => {
  let combinedChainNameArray = [];
  for (type in bridgedFromEth) {
    for (type2 in chainTokenMcap) {
      for (type3 in ecosystemValue) {
        if (type === type2 && type === type3) {
          let tempBridgedFromEth = bridgedFromEth[type];
          let tempChainTokenMcap = chainTokenMcap[type];
          let tempEcosystemValue = ecosystemValue[type];
          for (chain in tempBridgedFromEth) {
            for (chain2 in tempChainTokenMcap) {
              for (chain3 in tempEcosystemValue) {
                combinedChainNameArray.push(chain);
                combinedChainNameArray.push(chain2);
                combinedChainNameArray.push(chain3);
              }
            }
          }
        }
      }
    }
  }
  let uniqueChainNames = [...new Set(combinedChainNameArray)];
  return uniqueChainNames;
};

let uniqueChainNames = getUniqueChainNames();
