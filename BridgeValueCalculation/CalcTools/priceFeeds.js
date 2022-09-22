const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const axiosThrottle = require("axios-request-throttle");

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

axiosThrottle.use(axios, { requestsPerSecond: 1 });

const { ethUsdPriceContract, btcUsdPriceContract, feedRegistry } = require("./contractObjects");

const addresses = require("./contractObjects");

const ethUsdPriceFeed = ethUsdPriceContract();
const btcUsdPriceFeed = btcUsdPriceContract();
let feedingRegistry = feedRegistry();
const USD = "0x0000000000000000000000000000000000000348";
const aaveTokenAddress = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
const crvTokenAddress = "0xd533a949740bb3306d119cc777fa900ba034cd52";
const manaTokenAddress = "0x0f5d2fb29fb7d3cfee444a200298f468908cc942";
const balTokenAddress = "0xba100000625a3754423978a60c9317c58a424e3d";
const maticTokenAddress = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
const fttTokenAddress = "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9";
const sushiTokenAddress = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";
const yfiTokenAddress = "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e";
const fxsTokenAddress = "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0";
const axsTokenAddress = "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b";
const snxTokenAddress = "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F";
const wbtcTokenAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
const uniTokenAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const linkTokenAddress = "0x514910771af9ca656af840dff83e8264ecf986ca";
const lrcTokenAddress = "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD";
const imxTokenAddress = "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF";
const omgTokenAddress = "0xd26114cd6ee289accf82350c8d8487fedb8a0c07";

const priceFeeds = async () => {
  let priceFeeds = {};

  const [
    ethPrice,
    btcPrice,
    linkPrice,
    uniPrice,
    snxPrice,
    aavePrice,
    crvPrice,
    manaPrice,
    balPrice,
    maticPrice,
    fttPrice,
    yfiPrice,
    fxsPrice,
    sushiPrice,
    lrcPrice,
    imxPrice,
    omgPrice,
  ] = await Promise.all([
    parseFloat(ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)),
    parseFloat(ethers.utils.formatUnits(await btcUsdPriceFeed.latestAnswer(), 8)),
    await feedingRegistry.latestRoundData(linkTokenAddress, USD),
    await feedingRegistry.latestRoundData(uniTokenAddress, USD),
    await feedingRegistry.latestRoundData(snxTokenAddress, USD),
    await feedingRegistry.latestRoundData(aaveTokenAddress, USD),
    await feedingRegistry.latestRoundData(crvTokenAddress, USD),
    await feedingRegistry.latestRoundData(manaTokenAddress, USD),
    await feedingRegistry.latestRoundData(balTokenAddress, USD),
    await feedingRegistry.latestRoundData(maticTokenAddress, USD),
    await feedingRegistry.latestRoundData(fttTokenAddress, USD),
    await feedingRegistry.latestRoundData(yfiTokenAddress, USD),
    await feedingRegistry.latestRoundData(fxsTokenAddress, USD),
    await feedingRegistry.latestRoundData(sushiTokenAddress, USD),
    await feedingRegistry.latestRoundData(lrcTokenAddress, USD),
    await feedingRegistry.latestRoundData(imxTokenAddress, USD),
    await feedingRegistry.latestRoundData(omgTokenAddress, USD),
  ]);

  // For coingecko pricefeeds
  tickerAddress = {
    GHST: "0x3f382dbd960e3a9bbceae22651e88158d2791550",
    DG: "0x4b520c812e8430659fc9f12f6d0c39026c83588d",
    XDG: "0x4f81c790581b240a5c948afd173620ecc8c71c8d",
    AWX: "0xa51fc71422a30fa7ffa605b360c3b283501b5bf6",
    BEL: "0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14",
    CEL: "0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d",
    WOO: "0x4691937a7508860f876c9c0a2a617e7d9e945d4b",
    ALPHA: "0xa1faa113cbe53436df28ff0aee54275c13b40975",
    ALEPH: "0x27702a26126e0b3702af63ee09ac4d1a084ef628",
    SRM: "0x476c5e26a75bd202a9683ffd34359c0cc15be0ff",
    XCN: "0xa2cd3d43c775978a96bdbf12d733d5a1ed94fb18",
    NEXM: "0xe831f96a7a1dce1aa2eb760b1e296c6a74caa9d5",
    LDO: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
    ICE: "0xf16e81dce15b08f326220742020379b855b87df9",
    WOOFY: "0xd0660cd418a64a1d44e9214ad8e459324d8157f1",
    AXS: "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b",
    icETH: "0x7c07f7abe10ce8e33dc6c5ad68fe033085256a84",
    OMI: "0xed35af169af46a02ee13b9d79eb57d6d68c1749e",
    DVF: "0xdddddd4301a082e62e84e43f474f044423921918",
    HEZ: "0xeef9f339514298c6a857efcfc1a762af84438dee",
    METIS: "0x9e32b13ce7f2e80a01932b42553652e053d6ed8e",
    BOBA: "0x42bbfa2e77757c645eeaad1655e0911a7553efbc",
    ZKS: "0xe4815ae53b124e7263f08dcdbbb757d41ed658c6",
    cDAI: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
    HOPR: "0xf5581dfefd8fb0e4aec526be659cfab1f8c781da",
    DXD: "0xa1d65e8fb6e87b60feccbc582f7f97804b725521",
    GNO: "0x6810e776880c02933d47db1b9fc05908e5386b96",
    NODE: "0xda007777d86ac6d989cc9f79a73261b3fc5e0da0",
  };

  let geckoPayload = "";
  for (const [ticker, address] of Object.entries(tickerAddress)) {
    geckoPayload += address + ",";
  }

  let geckoData = await axios.get(
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${geckoPayload}&vs_currencies=usd`
  );

  let cleanGeckoData = geckoData["data"];

  priceFeeds["ETH"] = ethPrice;
  priceFeeds["WETH"] = ethPrice;
  priceFeeds["rETH"] = ethPrice;
  priceFeeds["wstETH"] = ethPrice;
  priceFeeds["WBTC"] = btcPrice;
  priceFeeds["HBTC"] = btcPrice;

  priceFeeds["LINK"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(linkPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["UNI"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(uniPrice["answer"]["_hex"]).toNumber(), 8)
  );
  priceFeeds["SNX"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(snxPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["AAVE"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(aavePrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["CRV"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(crvPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["MANA"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(manaPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["BAL"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(balPrice["answer"]["_hex"]).toNumber(), 8)
  );
  priceFeeds["MATIC"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(maticPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["FTT"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(fttPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["SUSHI"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(sushiPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["YFI"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(yfiPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["FXS"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(fxsPrice["answer"]["_hex"]).toNumber(), 8)
  );
  priceFeeds["LRC"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(lrcPrice["answer"]["_hex"]).toNumber(), 8)
  );
  priceFeeds["IMX"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(imxPrice["answer"]["_hex"]).toNumber(), 8)
  );

  priceFeeds["OMG"] = parseFloat(
    ethers.utils.formatUnits(ethers.BigNumber.from(omgPrice["answer"]["_hex"]).toNumber(), 8)
  );

  // Centralised Feeds

  for (const [xkey1, xvalue1] of Object.entries(cleanGeckoData)) {
    for (const [xkey2, xvalue2] of Object.entries(tickerAddress)) {
      if (xkey1 === xvalue2.toLowerCase()) {
        let temp = cleanGeckoData[xkey1];
        let price = parseFloat(temp["usd"]);
        priceFeeds[xkey2] = price;
      }
    }
  }

  return priceFeeds;
};

// priceFeeds();

module.exports = {
  priceFeeds,
};
