const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const TEST = process.env.TEST;

const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);
const signer = new ethers.Wallet(PRIV_KEY, provider);

var fs = require('fs');
const arbEthBridgeFile = require("./ABI/arbitrum_eth_bridge_abi.json");
// const arbEthBridgeFileParsed = JSON.parse(fs.readFileSync(arbEthBridgeFile));
const arbEthBridgeABI = arbEthBridgeFile
const arbEthBridgeAddress = '0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515';

const arbEthBridgeContract = new ethers.Contract(arbEthBridgeAddress, arbEthBridgeABI, provider);

const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const daiABI = require("./ABI/dai_abi.json")

const daiContract = new ethers.Contract(daiAddress, daiABI, provider);

const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const usdcABI = require("./ABI/usdc_abi.json");

const usdcContract = new ethers.Contract(usdcAddress, usdcABI, provider);

// async function main() {
//     const balance = await provider.getBalance("0xcEe284F754E854890e311e3280b767F80797180d");
//     console.log("The balance is: " + balance);
// }
// main();

// async function main() {
//     const message = await arbEthBridgeContract.balanceOf("0xd3dd6c9af57693d2fe1bbbb1adfc8d0caf4af3fd");
//     console.log("The name is: " + message);
// }
// main();

async function main() {
    const message = await usdcContract.balanceOf("0xcEe284F754E854890e311e3280b767F80797180d");
    console.log("The balance is: " + message);
}
main();

