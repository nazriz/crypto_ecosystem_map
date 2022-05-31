const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;

const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);

const { ethUsdPriceContract, uniUsdPriceContract, btcUsdPriceContract, snxUsdPriceContract, linkUsdPriceContract } = require("./contract_objects")

const ethUsdPriceFeed = ethUsdPriceContract();
const linkUsdPriceFeed = linkUsdPriceContract();
const btcUsdPriceFeed = btcUsdPriceContract();
const uniUsdPriceFeed = uniUsdPriceContract();
const snxUsdPriceFeed = snxUsdPriceContract();


const priceFeeds = async () => {

    let priceFeeds = {}

    priceFeeds["ETH"] = parseFloat(ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["rETH"] = parseFloat(ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)); // using same feed as Eth for now
    priceFeeds["LINK"] = parseFloat(ethers.utils.formatUnits(await linkUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["UNI"] = parseFloat(ethers.utils.formatUnits(await uniUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["WBTC"] = parseFloat(ethers.utils.formatUnits(await btcUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["SNX"] = parseFloat(ethers.utils.formatUnits(await snxUsdPriceFeed.latestAnswer(), 8));

    return priceFeeds

}

module.exports = {
    priceFeeds
};



