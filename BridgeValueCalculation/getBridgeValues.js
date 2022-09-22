const { ethToAltL1 } = require("./ethToAltL1");
const { ethToLayer2 } = require("./ethToLayer2");
const { ethToSidechain } = require("./ethToSidechain");
const fs = require("fs");

const getBridgeValues = () => {
  ethToSidechain().then(function () {
    ethToLayer2().then(function () {
      ethToAltL1();
    });
  });

  let layer2File = fs.readFileSync("../data/bridgedFromEthToLayer2.json");
  let layer2Data = JSON.parse(layer2File);

  let altL1File = fs.readFileSync("../data/bridgedFromEthToAltL1.json");
  let altL1Data = JSON.parse(altL1File);

  let sidechainFile = fs.readFileSync("../data/bridgedFromEthToSidechain.json");
  let sidechainData = JSON.parse(sidechainFile);

  let combinedBridges = {};

  combinedBridges["layer2"] = layer2Data["layer2"];
  combinedBridges["sidechain"] = sidechainData["sidechain"];
  combinedBridges["altL1"] = altL1Data["altL1"];

  fs.writeFile("../data/bridgedFromEth.json", JSON.stringify(combinedBridges), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

getBridgeValues();
