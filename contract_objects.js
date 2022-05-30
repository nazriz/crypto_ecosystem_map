const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;

const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);

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

const usdtContract = () => {
    const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const usdtABI = require("./ABI/usdt_abi.json")
    const usdtContract = new ethers.Contract(usdtAddress, usdtABI, provider)
    return usdtContract

}


module.exports = {
    usdcContract,
    daiContract,
    usdtContract

}