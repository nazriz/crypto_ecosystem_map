const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);
const signer = new ethers.Wallet(PRIV_KEY, provider);

const { usdcContract, usdtContract, fraxContract, lusdContract, linkContract, wbtcContract, usdEthPriceContract, usdLinkPriceContract, wbtcContract, rEthContract, uniContract } = require("./contract_objects")


const usdc = usdcContract();
const usdt = usdtContract();
const frax = fraxContract();
const lusd = lusdContract();
const link = linkContract();
const wbtc = wbtcContract();
const uni = uniContract();
const rEth = rEthContract();
const usdEthPriceFeed = usdEthPriceContract();
const usdLinkPriceFeed = usdLinkPriceContract();


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
    const optimismBridge = "x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
    const optimismSnxBridge = "0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f" //Synthetix

    let usdcBalance = await usdc.balanceOf(optimismBridge);
    let usdtBalance = await usdt.balanceOf(optimismBridge);
    let lusdBalance = await lusd.balanceOf(optimismBridge);
    let wbtcBalance = await wbtc.balanceOf(optimismBridge);
    let rEthBalance = await rEth.balanceOf(optimismBridge);
    let uniBalance = await uni.balanceOf(optimismBridge);
    let linkBalance = await link.balanceOf(optimismBridge);

    let ethBalance = await provider.getBalance(optimismBridge);


    usdcBalance = parseFloat(ethers.utils.formatUnits(usdcBalance, 6));
    usdtBalance = parseFloat(ethers.utils.formatUnits(usdtBalance, 6));
    lusdBalance = parseFloat(ethers.utils.formatUnits(lusdBalance, 18));
    wbtcBalance = parseFloat(ethers.utils.formatUnits(usdtBalance, 8));


    ethBalance = parseFloat(ethers.utils.formatUnits(ethBalance, 18));

}

let arb = arbitrumBridgeBalance();

(async () => {
    console.log(await arb);
})()