const { ethers } = require("ethers");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const priceFeedABI = require("./ABI/aggregatorV3InterfaceABI.json");
const erc20ABI = require("./ABI/erc20_abi.json");
const provider = new ethers.providers.EtherscanProvider(
  (network = "homestead"),
  API_KEY
);

// Contracts for general tokens
// Stablecoins

//DAI
const daiContract = () => {
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const daiABI = require("./ABI/dai_abi.json");
  const daiContract = new ethers.Contract(daiAddress, daiABI, provider);
  return daiContract;
};

//USDC
const usdcContract = () => {
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const usdcABI = require("./ABI/usdc_abi.json");
  const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider);
  return usdcContract;
};

//USDT
const usdtContract = () => {
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const usdtABI = require("./ABI/usdt_abi.json");
  const usdtContract = new ethers.Contract(usdtAddress, usdtABI, provider);
  return usdtContract;
};

//FRAX
const fraxContract = () => {
  const fraxAddress = "0x853d955aCEf822Db058eb8505911ED77F175b99e";
  const fraxABI = require("./ABI/frax_abi.json");
  const fraxContract = new ethers.Contract(fraxAddress, fraxABI, provider);
  return fraxContract;
};

const lusdContract = () => {
  const lusdAddress = "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0";
  const lusdABI = require("./ABI/lusd_abi.json");
  const lusdContract = new ethers.Contract(lusdAddress, lusdABI, provider);
  return lusdContract;
};

//General Tokens (i.e. ERC20's)
//LINK

const linkContract = () => {
  const linkAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
  const linkABI = require("./ABI/link_abi.json");
  const linkContract = new ethers.Contract(linkAddress, linkABI, provider);
  return linkContract;
};

//WBTC
const wbtcContract = () => {
  const wbtcAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const wbtcABI = require("./ABI/wbtc_abi.json");
  const wbtcContract = new ethers.Contract(wbtcAddress, wbtcABI, provider);
  return wbtcContract;
};
// Rocket Pool eth
const rEthContract = () => {
  const rEthAddress = "0xae78736Cd615f374D3085123A210448E74Fc6393";
  const rEthABI = require("./ABI/rEth_abi.json");
  const rEthContract = new ethers.Contract(rEthAddress, rEthABI, provider);
  return rEthContract;
};
// UNI
const uniContract = () => {
  const uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  const uniABI = require("./ABI/uni_abi.json");
  const uniContract = new ethers.Contract(uniAddress, uniABI, provider);
  return uniContract;
};

const snxContract = () => {
  const snxAddress = "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F";
  const snxABI = require("./ABI/snx_abi.json");
  const snxContract = new ethers.Contract(snxAddress, snxABI, provider);
  return snxContract;
};

const manaContract = () => {
  const manaAddress = "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942";
  const manaABI = require("./ABI/mana_abi.json");
  const manaContract = new ethers.Contract(manaAddress, manaABI, provider);
  return manaContract;
};

const balContract = () => {
  const balAddress = "0xba100000625a3754423978a60c9317c58a424e3D";
  const balABI = require("./ABI/bal_abi.json");
  const balContract = new ethers.Contract(balAddress, balABI, provider);
  return balContract;
};

const crvContract = () => {
  const crvAddress = "0xD533a949740bb3306d119CC777fa900bA034cd52";
  const crvABI = require("./ABI/crv_abi.json");
  const crvContract = new ethers.Contract(crvAddress, crvABI, provider);
  return crvContract;
};

const aaveContract = () => {
  const aaveAddress = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
  const aaveContract = new ethers.Contract(aaveAddress, erc20ABI, provider);
  return aaveContract;
};

// Aavegotchi
const ghstContract = () => {
  const ghstAddress = "0x3F382DbD960E3a9bbCeaE22651E88158d2791550";
  const ghstABI = require("./ABI/ghst_abi.json");
  const ghstContract = new ethers.Contract(ghstAddress, ghstABI, provider);
  return ghstContract;
};

// Celsius Network

const celContract = () => {
  const celAddress = "0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d";
  const celContract = new ethers.Contract(celAddress, erc20ABI, provider);
  return celContract;
};

// STRP - Arbitrum Bridge - L1 ERC20 Gateway - https://strips.finance/
const strpContract = () => {
  const strpAddress = "0x97872EAfd79940C7b24f7BCc1EADb1457347ADc9";
  const strpABI = require("./ABI/strp_abi.json");
  const strpContract = new ethers.Contract(strpAddress, strpABI, provider);
  return strpContract;
};

// Decentral Games - Polygon ERC20 Bridge

const dgContract = () => {
  const dgAddress = "0x4b520c812e8430659fc9f12f6d0c39026c83588d";
  const dgContract = new ethers.Contract(dgAddress, erc20ABI, provider);
  return dgContract;
};
// Decentral Games Governance - Polygon ERC20 Bridge
const xdgContract = () => {
  const xdgAddress = "0x4f81c790581b240a5c948afd173620ecc8c71c8d";
  const xdgContract = new ethers.Contract(xdgAddress, erc20ABI, provider);
  return xdgContract;
};

// Aurus Defi - Polygon ERC20 Bridge

const awxContract = () => {
  const awxAddress = "0xa51fc71422a30fa7ffa605b360c3b283501b5bf6";
  const awxContract = new ethers.Contract(awxAddress, erc20ABI, provider);
  return awxContract;
};

// Bella Protocol - Polygon ERC20 Bridge
const belContract = () => {
  const belAddress = "0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14";
  const belContract = new ethers.Contract(belAddress, erc20ABI, provider);
  return belContract;
};

const maticContract = () => {
  const maticAddress = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
  const maticContract = new ethers.Contract(maticAddress, erc20ABI, provider);
  return maticContract;
};

const wethContract = () => {
  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const wethContract = new ethers.Contract(wethAddress, erc20ABI, provider);
  return wethContract;
};

// Woo network - Avalanche
const wooContract = () => {
  const wooAddress = "0x4691937a7508860f876c9c0a2a617e7d9e945d4b";
  const wooContract = new ethers.Contract(wooAddress, erc20ABI, provider);
  return wooContract;
};

const alphaContract = () => {
  const alphaAddress = "0xa1faa113cbe53436df28ff0aee54275c13b40975";
  const alphaContract = new ethers.Contract(alphaAddress, erc20ABI, provider);
  return alphaContract;
};
// Chainlink price feeds

// USD/ETH Feed
const ethUsdPriceContract = () => {
  const usdEthAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
  const usdEthABI = require("./ABI/usdEthPriceFeed_abi.json");
  const ethUsdPriceContract = new ethers.Contract(
    usdEthAddress,
    usdEthABI,
    provider
  );
  return ethUsdPriceContract;
};

const linkUsdPriceContract = () => {
  const usdLinkAddress = "0x2c1d072e956affc0d435cb7ac38ef18d24d9127c";
  const usdLinkABI = require("./ABI/usdLinkPriceFeed_abi.json");
  const linkUsdPriceContract = new ethers.Contract(
    usdLinkAddress,
    usdLinkABI,
    provider
  );
  return linkUsdPriceContract;
};

const uniUsdPriceContract = () => {
  const usdUniAddress = "0x553303d460EE0afB37EdFf9bE42922D8FF63220e";
  const usdUniABI = require("./ABI/usdUniPriceFeed_abi.json");
  const uniUsdPriceContract = new ethers.Contract(
    usdUniAddress,
    usdUniABI,
    provider
  );
  return uniUsdPriceContract;
};

const btcUsdPriceContract = () => {
  const usdBtcPriceAddress = "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c";
  const usdBtcABI = require("./ABI/usdBtcPriceFeed_abi.json");
  const usdBtcPriceContract = new ethers.Contract(
    usdBtcPriceAddress,
    usdBtcABI,
    provider
  );
  return usdBtcPriceContract;
};

const snxUsdPriceContract = () => {
  snxUsdPriceAdddress = "0xDC3EA94CD0AC27d9A86C180091e7f78C683d3699";
  snxUsdABI = require("./ABI/usdSnxPriceFeed_abi.json");
  const snxUsdPriceContract = new ethers.Contract(
    snxUsdPriceAdddress,
    snxUsdABI,
    provider
  );
  return snxUsdPriceContract;
};

const aaveUsdPriceContract = () => {
  aaveUsdPriceFeedAddress = "0x547a514d5e3769680ce22b2361c10ea13619e8a9";
  const aaveUsdPriceFeedContract = new ethers.Contract(
    aaveUsdPriceFeedAddress,
    priceFeedABI,
    provider
  );
  return aaveUsdPriceFeedContract;
};

// Feed Registry
const feedRegistry = () => {
  const feedRegistryAddress = "0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf";
  const feedRegistryABI = require("./ABI/feedRegistryInterfaceABI.json");
  feedRegistryContract = new ethers.Contract(
    feedRegistryAddress,
    feedRegistryABI,
    provider
  );

  return feedRegistryContract;
};
module.exports = {
  //stables
  usdcContract,
  daiContract,
  usdtContract,
  fraxContract,
  lusdContract,
  //erc20's
  linkContract,
  wbtcContract,
  rEthContract,
  uniContract,
  snxContract,
  manaContract,
  balContract,
  crvContract,
  aaveContract,
  ghstContract,
  dgContract,
  xdgContract,
  belContract,
  awxContract,
  celContract,
  maticContract,
  wethContract,
  wooContract,
  alphaContract,
  //pricefeeds
  ethUsdPriceContract,
  linkUsdPriceContract,
  uniUsdPriceContract,
  btcUsdPriceContract,
  snxUsdPriceContract,
  aaveUsdPriceContract,
  feedRegistry,
};
