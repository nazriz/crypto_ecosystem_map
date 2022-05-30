const { ethers } = require("ethers");
require('dotenv').config()
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const provider = new ethers.providers.EtherscanProvider(network = "homestead", API_KEY);
const signer = new ethers.Wallet(PRIV_KEY, provider);

const { daiContract, usdcContract } = require("./contract_objects")


const usdc = usdcContract();
const dai = daiContract();


const arbEthBridgeFile = require("./ABI/arbitrum_eth_bridge_abi.json");
// const arbEthBridgeFileParsed = JSON.parse(fs.readFileSync(arbEthBridgeFile));
const arbEthBridgeABI = arbEthBridgeFile
const arbEthBridgeAddress = '0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515';
const arbEthBridgeContract = new ethers.Contract(arbEthBridgeAddress, arbEthBridgeABI, provider);



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
    const message = await usdc.balanceOf("0xcEe284F754E854890e311e3280b767F80797180d");
    console.log("The balance is: " + message);
}
main();

