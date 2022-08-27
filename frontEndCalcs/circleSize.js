const fs = require("fs");

let layer2fileData = fs.readFileSync("../data/bridgedFromEthToLayer2.json");
let layer2Data = JSON.parse(layer2fileData);
ethToLayer2 = layer2Data["layer2"];

let altL1fileData = fs.readFileSync("../data/bridgedFromEthToAltL1.json");
let altL1data = JSON.parse(altL1fileData);
ethToAltL1 = altL1data["altL1"];

let sidechainfileData = fs.readFileSync("../data/bridgedFromEthToSidechain.json");
let sidechaindata = JSON.parse(sidechainfileData);
ethToSidechain = sidechaindata["sidechain"];

const circleSizeCalc = (dataObject, outputFileName) => {
  circleOutputObject = {};
  for (const [chain, value] of Object.entries(dataObject)) {
    let amount = parseInt(value);
    let widthHeight;

    if (amount.toString().length == 10) {
      widthHeight = parseInt(parseInt(amount.toString().slice(0, 3)) / 1.5);
    } else if (amount.toString().length == 9) {
      widthHeight = parseInt(parseInt(amount.toString().slice(0, 2)) / 1.2);
    } else if (amount.toString().length == 8) {
      widthHeight = parseInt(parseInt(amount.toString().slice(0, 2) / 2));
    } else {
      widthHeight = 10;
    }
    circleOutputObject[chain] = { name: chain, width: widthHeight, height: widthHeight };
  }

  let dataToWrite = JSON.stringify(circleOutputObject);
  fs.writeFileSync(`${outputFileName}Circles.json`, dataToWrite);
};

circleSizeCalc(ethToLayer2, "ethToLayer2");
circleSizeCalc(ethToAltL1, "ethToAltL1");
circleSizeCalc(ethToSidechain, "ethToSidechain");
