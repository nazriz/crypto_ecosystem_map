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
let finalChainArray = [];
let tempChainArray = [];

for (item in uniqueChainNames) {
  finalChainArray.push(tempChainArray);
  tempChainArray = [];
  let chainName = uniqueChainNames[item];
  for (type in bridgedFromEth) {
    let tempBridgedFromEth = bridgedFromEth[type];
    for (chain in tempBridgedFromEth) {
      if (chain === chainName) {
        tempChainArray.push(tempBridgedFromEth[chain]);
      }
    }
  }

  for (type2 in chainTokenMcap) {
    let tempChainTokenMcap = chainTokenMcap[type2];
    for (chain2 in tempChainTokenMcap) {
      if (chain2 === chainName) {
        // tempChainArray.push(tempChainTokenMcap[chain]);
        console.log(chain2, chainName);
      }
    }
  }
}

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

console.log(chainTokenMcap, bridgedFromEth, ecosystemValue);
