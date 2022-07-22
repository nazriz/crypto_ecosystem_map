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
let layer2 = {};
let sidechain = {};
let altL1 = {};
let chainType = {};

layer2["arbitrum"] = {};
layer2["optimism"] = {};
layer2["zkSync"] = {};
layer2["dYdX"] = {};
layer2["loopring"] = {};
layer2["immutableX"] = {};
layer2["deversiFi"] = {};
layer2["sorare"] = {};
layer2["aztec"] = {};
layer2["OMG"] = {};
layer2["starknet"] = {};
layer2["polygonHermez"] = {};
layer2["metisAndromeda"] = {};
layer2["bobaNetwork"] = {};
layer2["ZKSpace"] = {};

sidechain["polygon"] = {};
sidechain["ronin"] = {};
sidechain["gnosisChain"] = {};

altL1["avalanche"] = {};
altL1["solana"] = {};
altL1["near"] = {};
altL1["fantom"] = {};
altL1["moonriver"] = {};
altL1["bitcoin"] = {};
altL1["BNB"] = {};
altL1["dogecoin"] = {};
altL1["dogecoin"] = {};
altL1["xrp"] = {};
altL1["zcash"] = {};
altL1["algorand"] = {};
altL1["tezos"] = {};
altL1["tron"] = {};
altL1["cardano"] = {};
altL1["polkadot"] = {};
altL1["harmony"] = {};
altL1["celo"] = {};

chainType["layer2"] = layer2;
chainType["sidechain"] = sidechain;
chainType["alt_l1"] = altL1;

// Function to check which chains are missing from Obj,
// Based on the unique chains placed into the list from
// getUniqueChainNames function user must then
//  manually update object, and can run function again
const checkMissingChainsFromList = (inputList, objToCheck) => {
  let missingChain = [];
  for (item in inputList) {
    let check = 0;
    for (type in objToCheck) {
      if (inputList[item] in objToCheck[type]) {
        check = 1;
      }
    }
    if (check != 1) {
      missingChain.push(inputList[item]);
    }
  }

  console.log("The missing chains are:");
  console.log(missingChain);
  console.log("Please update the input list accordingly.");
};

// checkMissingChainsFromList(uniqueChainNames, chainType);

// Token Mcap
for (type in chainType) {
  for (chain in chainType[type]) {
    for (type2 in chainTokenMcap) {
      for (chain2 in chainTokenMcap[type2]) {
        if (chain === chain2) {
          chainType[type][chain] = chainTokenMcap[type2][chain2];
        }
      }
    }
    for (chain in chainType[type]) {
      if (Object.keys(chainType[type][chain]).length === 0) {
        chainType[type][chain] = { chainTokenMcapUSD: "none", "chainTokenMcapRatio (%)": NaN };
      }
    }
  }
}

// Ecosystem Value
for (type in chainType) {
  for (chain in chainType[type]) {
    for (type2 in ecosystemValue) {
      for (chain2 in ecosystemValue[type2]) {
        if (chain === chain2) {
          Object.assign(chainType[type][chain], ecosystemValue[type2][chain2]);
        }
      }
    }
    for (chain in chainType[type]) {
      if (Object.keys(chainType[type][chain]).length === 1) {
        let emptyItem = { ecosystemValueUSD: "none", "ecosystemValueRatio (%)": NaN };
        Object.assign(chainType[type][chain], emptyItem);
      }
    }
  }
}

// Bridged From Eth
for (type in chainType) {
  for (chain in chainType[type]) {
    for (type2 in bridgedFromEth) {
      for (chain2 in bridgedFromEth[type2]) {
        if (chain === chain2) {
          Object.assign(chainType[type][chain], bridgedFromEth[type2][chain2]);
        }
      }
    }
    for (chain in chainType[type]) {
      if (Object.keys(chainType[type][chain]).length === 4) {
        let emptyItem = { bridgedFromEthUSD: "noCalc", "bridgedFromEthRatio (%)": NaN };
        Object.assign(chainType[type][chain], emptyItem);
      }
    }
  }
}

console.log(chainType);

// console.log(chainTokenMcap);
// for (item in uniqueChainNames) {
//   finalChainArray.push(tempChainArray);
//   tempChainArray = [];
//   let chainName = uniqueChainNames[item];
//   for (type in bridgedFromEth) {
//     let tempBridgedFromEth = bridgedFromEth[type];
//     for (chain in tempBridgedFromEth) {
//       if (chain === chainName) {
//         tempChainArray.push(tempBridgedFromEth[chain]);
//       }
//     }
//   }

//   for (type2 in chainTokenMcap) {
//     let tempChainTokenMcap = chainTokenMcap[type2];
//     for (chain2 in tempChainTokenMcap) {
//       if (chain2 === chainName) {
//         // tempChainArray.push(tempChainTokenMcap[chain]);
//         console.log(chain2, chainName);
//       }
//     }
//   }
// }

// console.log(finalChainArray);

// let cleanArray = finalChainArray.filter((e) => e.length);
// console.log(cleanArray);

// let finalChainArray = [];
// let tempChainArray = [];
// let tempChainObj = {};
// let tempTypeObj = {};
// for (type in bridgedFromEth) {
//   for (type2 in chainTokenMcap) {
//     for (type3 in ecosystemValue) {
//       if (type === type2 && type === type3) {
//         let tempBridgedFromEth = bridgedFromEth[type];
//         let tempChainTokenMcap = chainTokenMcap[type];
//         let tempEcosystemValue = ecosystemValue[type];
//         for (chain in tempBridgedFromEth) {
//           let chainObjName = chain;
//           for (chain2 in tempChainTokenMcap) {
//             for (chain3 in tempEcosystemValue) {
//               tempChainArray = [];

//               for (chainName in uniqueChainNames) {
//                 if (chain === uniqueChainNames[chainName]) {
//                   tempChainArray.push(tempBridgedFromEth[chain]);
//                   tempChainArray.push(tempChainTokenMcap[chain2]);
//                   tempChainArray.push(tempEcosystemValue[chain3]);

//                   // }
//                   // if (chain2 === uniqueChainNames[chainName]) {
//                   //   tempChainArray.push(tempChainTokenMcap[chain2]);
//                   // }
//                   // if (chain3 === uniqueChainNames[chainName]) {
//                   //   tempChainArray.push(tempEcosystemValue[chain3]);
//                   // }
//                 }
//               }
//               console.log(tempChainArray);
//               console.log("next");
//             }
//           }
//         }
//       }
//     }
//   }
// }

// let testObj = { ...chainTokenMcap, ...bridgedFromEth, ...ecosystemValue };

// console.log(chainTokenMcap, bridgedFromEth, ecosystemValue);
