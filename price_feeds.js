const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const provider = new ethers.providers.EtherscanProvider(
  (network = "homestead"),
  API_KEY
);

const {
  ethUsdPriceContract,
  uniUsdPriceContract,
  btcUsdPriceContract,
  snxUsdPriceContract,
  linkUsdPriceContract,
  aaveUsdPriceContract,
  feedRegistry,
} = require("./contract_objects");

const addresses = require("./contract_objects");

const ethUsdPriceFeed = ethUsdPriceContract();
const linkUsdPriceFeed = linkUsdPriceContract();
const btcUsdPriceFeed = btcUsdPriceContract();
const uniUsdPriceFeed = uniUsdPriceContract();
const snxUsdPriceFeed = snxUsdPriceContract();
let aaveUsdPriceFeed = aaveUsdPriceContract();
let feedingRegistry = feedRegistry();
const USD = "0x0000000000000000000000000000000000000348";
const aaveTokenAddress = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
const crvTokenAddress = "0xd533a949740bb3306d119cc777fa900ba034cd52";
const manaTokenAddress = "0x0f5d2fb29fb7d3cfee444a200298f468908cc942";
const balTokenAddress = "0xba100000625a3754423978a60c9317c58a424e3d";
const maticTokenAddress = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";

const priceFeeds = async () => {
  let priceFeeds = {};

  priceFeeds["ETH"] = parseFloat(
    ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)
  );
  priceFeeds["rETH"] = parseFloat(
    ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)
  ); // using same feed as Eth for now
  priceFeeds["LINK"] = parseFloat(
    ethers.utils.formatUnits(await linkUsdPriceFeed.latestAnswer(), 8)
  );
  priceFeeds["UNI"] = parseFloat(
    ethers.utils.formatUnits(await uniUsdPriceFeed.latestAnswer(), 8)
  );
  priceFeeds["WBTC"] = parseFloat(
    ethers.utils.formatUnits(await btcUsdPriceFeed.latestAnswer(), 8)
  );
  priceFeeds["SNX"] = parseFloat(
    ethers.utils.formatUnits(await snxUsdPriceFeed.latestAnswer(), 8)
  );

  //AAVE
  let aavePrice = await feedingRegistry.latestRoundData(aaveTokenAddress, USD);
  priceFeeds["AAVE"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(aavePrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  //CRV
  let crvPrice = await feedingRegistry.latestRoundData(crvTokenAddress, USD);
  priceFeeds["CRV"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(crvPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  // MANA
  let manaPrice = await feedingRegistry.latestRoundData(manaTokenAddress, USD);
  priceFeeds["MANA"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(manaPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  //BAL
  let balPrice = await feedingRegistry.latestRoundData(balTokenAddress, USD);
  priceFeeds["BAL"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(balPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  //MATIC

  let maticPrice = await feedingRegistry.latestRoundData(
    maticTokenAddress,
    USD
  );
  priceFeeds["MATIC"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(maticPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  // Centralised Feeds
  //Aavegotchi
  let ghst = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=aavegotchi&vs_currencies=usd`
  );
  priceFeeds["GHST"] = parseFloat(ghst["data"]["aavegotchi"]["usd"]);

  // Decentral Games
  let dg = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=decentral-games&vs_currencies=usd`
  );
  priceFeeds["DG"] = parseFloat(dg["data"]["decentral-games"]["usd"]);

  // Decentral Games Governance

  let xdg = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=decentral-games-governance&vs_currencies=usd`
  );
  priceFeeds["XDG"] = parseFloat(
    xdg["data"]["decentral-games-governance"]["usd"]
  );

  // Aurus Defi
  let awx = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=auruscoin&vs_currencies=usd`
  );
  priceFeeds["AWX"] = parseFloat(awx["data"]["auruscoin"]["usd"]);

  // Bella Protocol

  let bel = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=bella-protocol&vs_currencies=usd`
  );
  priceFeeds["BEL"] = parseFloat(bel["data"]["bella-protocol"]["usd"]);

  // Celsius Network

  let cel = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=celsius-degree-token&vs_currencies=usd`
  );
  priceFeeds["CEL"] = parseFloat(cel["data"]["celsius-degree-token"]["usd"]);

  // Woo Network
  let woo = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=woo-network&vs_currencies=usd`
  );
  priceFeeds["WOO"] = parseFloat(woo["data"]["woo-network"]["usd"]);

  let alpha = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=alpha-finance&vs_currencies=usd`
  );
  priceFeeds["ALPHA"] = parseFloat(alpha["data"]["alpha-finance"]["usd"]);

  let aleph = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=aleph&vs_currencies=usd`
  );
  priceFeeds["ALEPH"] = parseFloat(aleph["data"]["alpha-finance"]["usd"]);

  let serum = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=serum&vs_currencies=usd`
  );
  priceFeeds["SRM"] = parseFloat(serum["data"]["alpha-finance"]["usd"]);

  //   console.log(priceFeeds);
  return priceFeeds;
};

priceFeeds();

module.exports = {
  priceFeeds,
};
