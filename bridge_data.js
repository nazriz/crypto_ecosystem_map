const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);
const signer = new ethers.Wallet(PRIV_KEY, provider);

const { usdcContract, usdtContract, fraxContract, lusdContract, linkContract, usdEthPriceContract, usdLinkPriceContract, wbtcContract, rEthContract, uniContract, usdUniPriceContract, usdBtcPriceContract, snxContract, snxUsdPriceContract, daiContract } = require("./contract_objects")


const usdc = usdcContract();
const usdt = usdtContract();
const frax = fraxContract();
const lusd = lusdContract();
const link = linkContract();
const wbtc = wbtcContract();
const uni = uniContract();
const rEth = rEthContract();
const snx = snxContract();
const dai = daiContract();

const usdEthPriceFeed = usdEthPriceContract();
const usdLinkPriceFeed = usdLinkPriceContract();
const usdBtcPriceFeed = usdBtcPriceContract();
const usdUniPriceFeed = usdUniPriceContract();
const snxUsdPriceFeed = snxUsdPriceContract();


const arbitrumBridgeBalance = async () => {
    const arbitrumCustomGateway = "0xcEe284F754E854890e311e3280b767F80797180d" // ERC20's
    const arbitrumWethGateway = "0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515" // WETH
    const arbitrumERC20Gateway = "0xa3A7B6F88361F48403514059F1F16C8E78d60EeC" // ERC20's

    let usdcBalance = parseFloat(ethers.utils.formatUnits(await usdc.balanceOf(arbitrumCustomGateway), 6));
    let usdtBalance = parseFloat(ethers.utils.formatUnits(await usdt.balanceOf(arbitrumCustomGateway), 6));
    let fraxBalance = parseFloat(ethers.utils.formatUnits(await frax.balanceOf(arbitrumERC20Gateway), 18));
    let linkBalance = parseFloat(ethers.utils.formatUnits(await link.balanceOf(arbitrumERC20Gateway), 18));
    let ethBalance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(arbitrumWethGateway), 18));

    // Pricefeeds
    let usdEthPrice = parseFloat(ethers.utils.formatUnits(await usdEthPriceFeed.latestAnswer(), 8));
    let usdLinkPrice = parseFloat(ethers.utils.formatUnits(await usdLinkPriceFeed.latestAnswer(), 8));

    linkBalanceInUSD = (linkBalance * usdLinkPrice)
    ethBalanceInUSD = (ethBalance * usdEthPrice)
    bridgeTotalUSD = (usdcBalance + usdtBalance + fraxBalance + ethBalanceInUSD + linkBalanceInUSD)

    return bridgeTotalUSD
}

const optimismBridgeBalance = async () => {

    const optimismDaiBridge = "0x467194771dae2967aef3ecbedd3bf9a310c76c65" //DAI
    const optimismBridge = "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
    const optimismSnxBridge = "0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f" //Synthetix

    let usdcBalance = parseFloat(ethers.utils.formatUnits(await usdc.balanceOf(optimismBridge), 6));
    let usdtBalance = parseFloat(ethers.utils.formatUnits(await usdt.balanceOf(optimismBridge), 6));
    let lusdBalance = parseFloat(ethers.utils.formatUnits(await lusd.balanceOf(optimismBridge), 18));
    let wbtcBalance = parseFloat(ethers.utils.formatUnits(await wbtc.balanceOf(optimismBridge), 8));
    let rEthBalance = parseFloat(ethers.utils.formatUnits(await rEth.balanceOf(optimismBridge), 18));
    let uniBalance = parseFloat(ethers.utils.formatUnits(await uni.balanceOf(optimismBridge), 18));
    let linkBalance = parseFloat(ethers.utils.formatUnits(await link.balanceOf(optimismBridge), 18));
    let snxBalance = parseFloat(ethers.utils.formatUnits(await snx.balanceOf(optimismSnxBridge), 18));
    let ethBalance = parseFloat(ethers.utils.formatUnits(await provider.getBalance(optimismBridge), 18));
    let daiBalance = parseFloat(ethers.utils.formatUnits(await dai.balanceOf(optimismDaiBridge), 18));

    let usdEthPrice = parseFloat(ethers.utils.formatUnits(await usdEthPriceFeed.latestAnswer(), 8));
    let usdLinkPrice = parseFloat(ethers.utils.formatUnits(await usdLinkPriceFeed.latestAnswer(), 8));
    let usdUniPrice = parseFloat(ethers.utils.formatUnits(await usdUniPriceFeed.latestAnswer(), 8));
    let usdWbtcPrice = parseFloat(ethers.utils.formatUnits(await usdBtcPriceFeed.latestAnswer(), 8));
    let snxUsdPrice = parseFloat(ethers.utils.formatUnits(await snxUsdPriceFeed.latestAnswer(), 8));

    rEthBalanceInUSD = (rEthBalance * usdEthPrice)
    uniBalanceInUSD = (uniBalance * usdUniPrice)
    wbtcBalanceInUSD = (wbtcBalance * usdWbtcPrice)
    linkBalanceInUSD = (linkBalance * usdLinkPrice)
    ethBalanceInUSD = (ethBalance * usdEthPrice)
    snxBalanceInUSD = (snxBalance * snxUsdPrice)


    bridgeTotalUSD = (usdcBalance + usdtBalance + lusdBalance + rEthBalanceInUSD +
        uniBalanceInUSD + wbtcBalanceInUSD + linkBalanceInUSD + ethBalanceInUSD + snxBalanceInUSD + daiBalance)

    return bridgeTotalUSD
}

// let arb = arbitrumBridgeBalance();

// (async () => {
//     console.log(await arb);
// })()

let op = optimismBridgeBalance();

(async () => {
    console.log(await op);
})()