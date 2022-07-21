const fs = require("fs");

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
  console.log(mcapObj);
  console.log(ecosystemValueObj);
};

splitChainTotalData();
