const { ethToAltL1 } = require("./ethToAltL1");
const { ethToLayer2 } = require("./ethToLayer2");
const { ethToSidechain } = require("./ethToSidechain");
const fs = require("fs");

const getBridgeValues = async () => {
  // Call the calculation functions
  ethToLayer2();
  ethToSidechain();
  ethToAltL1();

  let layer2File = fs.readFileSync("bridgedFromEthToLayer2.json");
  let layer2Data = JSON.parse(layer2File);

  let altL1File = fs.readFileSync("bridgedFromEthToAltL1.json");
  let altL1Data = JSON.parse(altL1File);

  let sidechainFile = fs.readFileSync("bridgedFromEthToSidechain.json");
  let sidechainData = JSON.parse(sidechainFile);

  let combinedBridges = {};

  combinedBridges["layer2"] = layer2Data;
  combinedBridges["sidechain"] = sidechainData;
  combinedBridges["altL1"] = altL1Data;

  fs.writeFile("bridgedFromEth.json", JSON.stringify(combinedBridges), (err) => {
    if (err) {
      console.error(err);
    }
  });
};

getBridgeValues();
