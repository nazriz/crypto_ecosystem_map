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
const usdEthPrice = usdEthPriceContract();


// async function main() {
//     const usdcBalance = await usdc.balanceOf("0xcEe284F754E854890e311e3280b767F80797180d");
//     console.log("The usdc balance is: " + ethers.utils.formatUnits(usdcBalance, 6));
//     const usdtBalance = await usdt.balanceOf("0xcEe284F754E854890e311e3280b767F80797180d");
//     console.log("The usdt balance is: " + ethers.utils.formatUnits(usdtBalance, 6));
// }
// main();


const arbitrumBridgeBalance = async () => {


    const arbEth = await provider.getBalance("0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515");
    console.log("The eth is: " + arbEth);
}


arbitrumBridgeBalance();