const { ethers } = require("ethers");
require('dotenv').config()
const https = require('https');
const request = require("request")
const API_KEY = process.env.API_KEY;

const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);

const { ethUsdPriceContract, uniUsdPriceContract, btcUsdPriceContract, snxUsdPriceContract, linkUsdPriceContract } = require("./contract_objects")

const ethUsdPriceFeed = ethUsdPriceContract();
const linkUsdPriceFeed = linkUsdPriceContract();
const btcUsdPriceFeed = btcUsdPriceContract();
const uniUsdPriceFeed = uniUsdPriceContract();
const snxUsdPriceFeed = snxUsdPriceContract();


function getJSON(url, callback) {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body);
        }
    });
}

const priceFeeds = async () => {

    let priceFeeds = {}

    priceFeeds["ETH"] = parseFloat(ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["rETH"] = parseFloat(ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)); // using same feed as Eth for now
    priceFeeds["LINK"] = parseFloat(ethers.utils.formatUnits(await linkUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["UNI"] = parseFloat(ethers.utils.formatUnits(await uniUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["WBTC"] = parseFloat(ethers.utils.formatUnits(await btcUsdPriceFeed.latestAnswer(), 8));
    priceFeeds["SNX"] = parseFloat(ethers.utils.formatUnits(await snxUsdPriceFeed.latestAnswer(), 8));


    // let aavegotchiPrice = 0.0;
    // test = getJSON("https://api.coingecko.com/api/v3/simple/price?ids=aavegotchi&vs_currencies=usd")
    var test
    getJSON('https://api.coingecko.com/api/v3/simple/price?ids=aavegotchi&vs_currencies=usd', function (body) {
        aavegotchiPrice = body["aavegotchi"]["usd"]
        priceFeeds["GHST"] = aavegotchiPrice
    });

    console.log(priceFeeds)
    return priceFeeds

}

priceFeeds();

module.exports = {
    priceFeeds
};



