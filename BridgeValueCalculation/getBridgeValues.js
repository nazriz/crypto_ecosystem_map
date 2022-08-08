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

  // ethToAltL1(function () {
  //   ethToLayer2(function () {
  //     ethToSidechain(function () {});
  //   });
  // });

  // Call the calculation functions
  // ethToAltL1();
  // ethToLayer2();
  // ethToSidechain();

  // new Promise((resolve, reject) => {
  //   ethToAltL1();
  // })
  //   .then(ethToLayer2())
  //   .then(ethToSidechain());

  // const ethToAltL1Data = new Promise((resolve, reject) => {
  //   let data = ethToAltL1();
  //   if (data) {
  //     resolve();
  //   } else {
  //     reject();
  //   }
  // });

  let layer2File = fs.readFileSync("bridgedFromEthToLayer2.json");
  let layer2Data = JSON.parse(layer2File);

  let altL1File = fs.readFileSync("bridgedFromEthToAltL1.json");
  let altL1Data = JSON.parse(altL1File);

  let sidechainFile = fs.readFileSync("bridgedFromEthToSidechain.json");
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
