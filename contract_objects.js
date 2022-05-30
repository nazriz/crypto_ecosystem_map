const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;

const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);

// Contracts for general tokens

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


//LINK

const linkContract = () => {
    const linkAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA"
    const linkABI = require("./ABI/link_abi.json");
    const linkContract = new ethers.Contract(linkAddress, linkABI, provider);
    return linkContract

}



// STRP - Arbitrum Bridge - L1 ERC20 Gateway - https://strips.finance/
const strpContract = () => {
    const strpAddress = "0x97872EAfd79940C7b24f7BCc1EADb1457347ADc9"
    const strpABI = require("./ABI/strp_abi.json")
    const strpContract = new ethers.Contract(strpAddress, strpABI, provider);
    return strpContract;
}

// Chainlink price feeds

const usdEthPriceContract = () => {
    const usdEthAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    const usdEthABI = require("./ABI/usdEthPriceFeed_abi.json");
    const usdEthPriceContract = new ethers.Contract(usdEthAddress, usdEthABI, provider);
    return usdEthPriceContract
}

module.exports = {
    usdcContract,
    daiContract,
    usdtContract,
    usdEthPriceContract,
    fraxContract,
    linkContract


}