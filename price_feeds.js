const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;

const provider = new ethers.providers.AlchemyProvider(
  (network = "homestead"),
  process.env.ALCHEMY_API_KEY
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
const fttTokenAddress = "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9";
const sushiTokenAddress = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";
const yfiTokenAddress = "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e";
const fxsTokenAddress = "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0";
const axsTokenAddress = "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b";
const snxTokenAddress = "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F";
const wbtcTokenAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
const uniTokenAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const linkTokenAddress = "0x514910771af9ca656af840dff83e8264ecf986ca";

const priceFeeds = async () => {
  let newPriceFeeds = {};
  let priceFeeds = {};

  let linkPrice = await feedingRegistry.latestRoundData(linkTokenAddress, USD);

  const [ethPrice, btcPrice] = await Promise.all([
    parseFloat(
      ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)
    ),
    parseFloat(
      ethers.utils.formatUnits(await btcUsdPriceFeed.latestAnswer(), 8)
    ),
  ]);

  // using same feed as Eth for now

  //LINK

  priceFeeds["LINK"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(linkPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  // UNI
  let uniPrice = await feedingRegistry.latestRoundData(uniTokenAddress, USD);
  priceFeeds["UNI"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(uniPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  //SNX
  let snxPrice = await feedingRegistry.latestRoundData(snxTokenAddress, USD);
  priceFeeds["SNX"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(snxPrice["answer"]["_hex"]).toNumber(),
      8
    )
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

  //FTT
  let fttPrice = await feedingRegistry.latestRoundData(fttTokenAddress, USD);
  priceFeeds["FTT"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(fttPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  let sushiPrice = await feedingRegistry.latestRoundData(
    sushiTokenAddress,
    USD
  );
  priceFeeds["SUSHI"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(sushiPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  let yfiPrice = await feedingRegistry.latestRoundData(yfiTokenAddress, USD);
  priceFeeds["YFI"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(yfiPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  let fxsPrice = await feedingRegistry.latestRoundData(fxsTokenAddress, USD);
  priceFeeds["FXS"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(fxsPrice["answer"]["_hex"]).toNumber(),
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
  priceFeeds["ALEPH"] = parseFloat(aleph["data"]["aleph"]["usd"]);

  let serum = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=serum&vs_currencies=usd`
  );
  priceFeeds["SRM"] = parseFloat(serum["data"]["serum"]["usd"]);

  let xcn = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=chain-2&vs_currencies=usd`
  );
  priceFeeds["XCN"] = parseFloat(xcn["data"]["chain-2"]["usd"]);

  let nexm = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=nexum&vs_currencies=usd`
  );
  priceFeeds["NEXM"] = parseFloat(nexm["data"]["nexum"]["usd"]);

  let ldo = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=lido-dao&vs_currencies=usd`
  );
  priceFeeds["LDO"] = parseFloat(ldo["data"]["lido-dao"]["usd"]);

  let ice = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=ice-token&vs_currencies=usd`
  );
  priceFeeds["ICE"] = parseFloat(ice["data"]["ice-token"]["usd"]);

  let woofy = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=woofy&vs_currencies=usd`
  );
  priceFeeds["WOOFY"] = parseFloat(woofy["data"]["woofy"]["usd"]);

  let axs = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=usd`
  );
  priceFeeds["AXS"] = parseFloat(axs["data"]["axie-infinity"]["usd"]);

  console.log(await priceFeeds);

  newPriceFeeds["ETH"] = ethPrice;
  newPriceFeeds["WETH"] = ethPrice;
  newPriceFeeds["rETH"] = ethPrice;
  newPriceFeeds["WBTC"] = btcPrice;
  console.log(newPriceFeeds);
  return priceFeeds;
};

priceFeeds();

module.exports = {
  priceFeeds,
};
