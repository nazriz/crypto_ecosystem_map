const { ethToAltL1 } = require("./ethToAltL1");
const { ethToLayer2 } = require("./ethToLayer2");
const { ethToSidechain } = require("./ethToSidechain");
const fs = require("fs");
const path = require("path");

const getBridgeValues = async () => {
  await ethToAltL1();
  await ethToSidechain();
  await ethToLayer2();
  // ethToSidechain().then(function () {
  //   ethToLayer2().then(function () {
  //     ethToAltL1();
  //   });
  // });

  let layer2File = fs.readFileSync(path.resolve(__dirname, "../data/bridgedFromEthToLayer2.json"), (err) => {
    if (err) {
      console.error(err);
    }
  });
  let layer2Data = JSON.parse(layer2File);

  let altL1File = fs.readFileSync(path.resolve(__dirname, "../data/bridgedFromEthToAltL1.json"), (err) => {
    if (err) {
      console.error(err);
    }
  });
  let altL1Data = JSON.parse(altL1File);

  let sidechainFile = fs.readFileSync(path.resolve(__dirname, "../data/bridgedFromEthToSidechain.json"), (err) => {
    if (err) {
      console.error(err);
    }
  });
  let sidechainData = JSON.parse(sidechainFile);

  let combinedBridges = {};

  combinedBridges["layer2"] = layer2Data["layer2"];
  combinedBridges["sidechain"] = sidechainData["sidechain"];
  combinedBridges["altL1"] = altL1Data["altL1"];

  fs.writeFile(path.resolve(__dirname, "../data/bridgedFromEth.json"), JSON.stringify(combinedBridges), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// called from updateData.py
getBridgeValues();

module.exports = { getBridgeValues };
