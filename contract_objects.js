const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;

const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);

// Contracts for general tokens
// Stablecoins

//DAI
const daiContract = () => {
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const daiABI = require("./ABI/dai_abi.json")
    const daiContract = new ethers.Contract(daiAddress, daiABI, provider);
    return daiContract
}

//USDC
const usdcContract = () => {
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const usdcABI = require("./ABI/usdc_abi.json");
    const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider);
    return usdcContract
}

//USDT
const usdtContract = () => {
    const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const usdtABI = require("./ABI/usdt_abi.json")
    const usdtContract = new ethers.Contract(usdtAddress, usdtABI, provider)
    return usdtContract

}

//FRAX
const fraxContract = () => {
    const fraxAddress = "0x853d955aCEf822Db058eb8505911ED77F175b99e";
    const fraxABI = require("./ABI/frax_abi.json")
    const fraxContract = new ethers.Contract(fraxAddress, fraxABI, provider);
    return fraxContract
}

const lusdContract = () => {
    const lusdAddress = "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0"
    const lusdABI = require("./ABI/lusd_abi.json");
    const lusdContract = new ethers.Contract(lusdAddress, lusdABI, provider);
    return lusdContract
}

//General Tokens (i.e. ERC20's)
//LINK

const linkContract = () => {
    const linkAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA"
    const linkABI = require("./ABI/link_abi.json");
    const linkContract = new ethers.Contract(linkAddress, linkABI, provider);
    return linkContract

}

const wbtcContract = () => {
    const wbtcAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
    const wbtcABI = require("./ABI/wbtc_abi.json")
    const wbtcContract = new ethers.Contract(wbtcAddress, wbtcABI, provider)
    return wbtcContract
}

const rEthContract = () => {
    const rEthAddress = "0xae78736Cd615f374D3085123A210448E74Fc6393"
    const rEthABI = require("./ABI/rEth_abi.json")
    const rEthContract = new ethers.Contract(rEthAddress, rEthABI, provider)
    return rEthContract

}

const uniContract = () => {
    const uniAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
    const uniABI = require("./ABI/uni_abi.json")
    const uniContract = new ethers.Contract(uniAddress, uniABI, provider)
    return uniContract
}

// STRP - Arbitrum Bridge - L1 ERC20 Gateway - https://strips.finance/
const strpContract = () => {
    const strpAddress = "0x97872EAfd79940C7b24f7BCc1EADb1457347ADc9"
    const strpABI = require("./ABI/strp_abi.json")
    const strpContract = new ethers.Contract(strpAddress, strpABI, provider);
    return strpContract;
}

// Chainlink price feeds

// USD/ETH Feed
const usdEthPriceContract = () => {
    const usdEthAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    const usdEthABI = require("./ABI/usdEthPriceFeed_abi.json");
    const usdEthPriceContract = new ethers.Contract(usdEthAddress, usdEthABI, provider);
    return usdEthPriceContract
}

const usdLinkPriceContract = () => {
    const usdLinkAddress = "0x2c1d072e956affc0d435cb7ac38ef18d24d9127c";
    const usdLinkABI = require("./ABI/usdLinkPriceFeed_abi.json");
    const usdLinkPriceContract = new ethers.Contract(usdLinkAddress, usdLinkABI, provider);
    return usdLinkPriceContract

}

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
    //pricefeeds
    usdEthPriceContract,
    usdLinkPriceContract


}