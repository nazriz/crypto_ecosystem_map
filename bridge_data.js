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

    let usdcBalance = await usdc.balanceOf(arbitrumCustomGateway);
    let usdtBalance = await usdt.balanceOf(arbitrumCustomGateway);
    let fraxBalance = await frax.balanceOf(arbitrumERC20Gateway);
    let linkBalance = await link.balanceOf(arbitrumERC20Gateway);
    let ethBalance = await provider.getBalance(arbitrumWethGateway);
    let usdEthPrice = await usdEthPriceFeed.latestAnswer();
    let usdLinkPrice = await usdLinkPriceFeed.latestAnswer();


    usdcBalance = parseFloat(ethers.utils.formatUnits(usdcBalance, 6));
    usdtBalance = parseFloat(ethers.utils.formatUnits(usdtBalance, 6));
    ethBalance = parseFloat(ethers.utils.formatUnits(ethBalance, 18));
    fraxBalance = parseFloat(ethers.utils.formatUnits(fraxBalance, 18));
    linkBalance = parseFloat(ethers.utils.formatUnits(linkBalance, 18));

    usdEthPrice = parseFloat(ethers.utils.formatUnits(usdEthPrice, 8));
    usdLinkPrice = parseFloat(ethers.utils.formatUnits(usdLinkPrice, 8));


    linkBalanceInUSD = (linkBalance * usdLinkPrice)
    ethBalanceInUSD = (ethBalance * usdEthPrice)
    bridgeTotalUSD = (usdcBalance + usdtBalance + fraxBalance + ethBalanceInUSD + linkBalanceInUSD)

    return bridgeTotalUSD
}

const optimismBridgeBalance = async () => {

    const optimismDaiBridge = "0x467194771dae2967aef3ecbedd3bf9a310c76c65" //DAI
    const optimismBridge = "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
    const optimismSnxBridge = "0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f" //Synthetix

    let usdcBalance = await usdc.balanceOf(optimismBridge);
    let usdtBalance = await usdt.balanceOf(optimismBridge);
    let lusdBalance = await lusd.balanceOf(optimismBridge);
    let wbtcBalance = await wbtc.balanceOf(optimismBridge);
    let rEthBalance = await rEth.balanceOf(optimismBridge);
    let uniBalance = await uni.balanceOf(optimismBridge);
    let linkBalance = await link.balanceOf(optimismBridge);
    let snxBalance = await snx.balanceOf(optimismSnxBridge)
    let ethBalance = await provider.getBalance(optimismBridge);
    let daiBalance = await dai.balanceOf(optimismDaiBridge)

    let usdEthPrice = await usdEthPriceFeed.latestAnswer();
    let usdLinkPrice = await usdLinkPriceFeed.latestAnswer();
    let usdUniPrice = await usdUniPriceFeed.latestAnswer();
    let usdWbtcPrice = await usdBtcPriceFeed.latestAnswer();
    let snxUsdPrice = await snxUsdPriceFeed.latestAnswer();


    usdcBalance = parseFloat(ethers.utils.formatUnits(usdcBalance, 6));
    usdtBalance = parseFloat(ethers.utils.formatUnits(usdtBalance, 6));
    lusdBalance = parseFloat(ethers.utils.formatUnits(lusdBalance, 18));
    rEthBalance = parseFloat(ethers.utils.formatUnits(rEthBalance, 18));
    uniBalance = parseFloat(ethers.utils.formatUnits(uniBalance, 18));
    linkBalance = parseFloat(ethers.utils.formatUnits(linkBalance, 18));
    wbtcBalance = parseFloat(ethers.utils.formatUnits(wbtcBalance, 8));
    ethBalance = parseFloat(ethers.utils.formatUnits(ethBalance, 18));
    snxBalance = parseFloat(ethers.utils.formatUnits(snxBalance, 18));
    daiBalance = parseFloat(ethers.utils.formatUnits(daiBalance, 18));

    usdEthPrice = parseFloat(ethers.utils.formatUnits(usdEthPrice, 8));
    usdLinkPrice = parseFloat(ethers.utils.formatUnits(usdLinkPrice, 8));
    usdUniPrice = parseFloat(ethers.utils.formatUnits(usdUniPrice, 8));
    usdWbtcPrice = parseFloat(ethers.utils.formatUnits(usdWbtcPrice, 8));
    snxUsdPrice = parseFloat(ethers.utils.formatUnits(snxUsdPrice, 8));



    rEthBalanceInUSD = (rEthBalance * usdEthPrice)
    uniBalanceInUSD = (uniBalance * usdUniPrice)
    wbtcBalanceInUSD = (wbtcBalance * usdWbtcPrice)
    linkBalanceInUSD = (linkBalance * usdLinkPrice)
    ethBalanceInUSD = (ethBalance * usdEthPrice)
    snxBalanceInUSD = (snxBalance * snxUsdPrice)


    bridgeTotalUSD = (usdcBalance + usdtBalance + lusdBalance + rEthBalanceInUSD + uniBalanceInUSD + wbtcBalanceInUSD + linkBalanceInUSD + ethBalanceInUSD + snxBalanceInUSD + daiBalance)

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