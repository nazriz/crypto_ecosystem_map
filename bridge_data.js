const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);
const signer = new ethers.Wallet(PRIV_KEY, provider);

const { daiContract, usdcContract, usdtContract, usdEthPriceContract } = require("./contract_objects")


const usdc = usdcContract();
const dai = daiContract();
const usdt = usdtContract();
const usdEthPriceFeed = usdEthPriceContract();


// async function main() {
//     console.log("The usdc balance is: " + ethers.utils.formatUnits(usdcBalance, 6));
//     console.log("The usdt balance is: " + ethers.utils.formatUnits(usdtBalance, 6));
// }
// main();


const arbitrumBridgeBalance = async () => {
    const arbitrumCustomGateway = "0xcEe284F754E854890e311e3280b767F80797180d" // ERC20's
    const arbitrumWethGateway = "0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515" // WETH
    let usdcBalance = await usdc.balanceOf(arbitrumCustomGateway);
    let usdtBalance = await usdt.balanceOf(arbitrumCustomGateway);
    let ethBalance = await provider.getBalance(arbitrumWethGateway);
    let usdEthPrice = await usdEthPriceFeed.latestAnswer();

    usdcBalance = parseFloat(ethers.utils.formatUnits(usdcBalance, 6));
    usdtBalance = parseFloat(ethers.utils.formatUnits(usdtBalance, 6));
    ethBalance = parseFloat(ethers.utils.formatUnits(ethBalance, 18));
    usdEthPrice = parseFloat(ethers.utils.formatUnits(usdEthPrice, 8));
    ethPriceInUSD = (ethBalance * usdEthPrice)
    bridgeTotalUSD = (usdcBalance + usdtBalance + ethPriceInUSD)

    return bridgeTotalUSD
}


let arb = arbitrumBridgeBalance();

(async () => {
    console.log(await arb);
})()