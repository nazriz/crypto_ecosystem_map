const { ethers } = require("ethers");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;

const provider = new ethers.providers.AlchemyProvider(
  (network = "homestead"),
  process.env.ALCHEMY_API_KEY
);

const signer = new ethers.Wallet(PRIV_KEY, provider);

const {
  usdc,
  usdt,
  frax,
  lusd,
  link,
  wbtc,
  uni,
  rEth,
  snx,
  dai,
  ghst,
  aave,
  mana,
  crv,
  bal,
  bel,
  awx,
  dg,
  xdg,
  cel,
  matic,
  weth,
  woo,
  alpha,
  aleph,
  srm,
  ftt,
  hbtc,
  busd,
  husd,
  nexm,
  ldo,
  xcn,
  tusd,
  dola,
  sushi,
  yfi,
  woofy,
  fxs,
  ice,
  axs,
} = require("./contract_objects");
const { priceFeeds } = require("./price_feeds");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

const getBridgeBalance = async (bridgeAddress) => {
  let bridgeTotals = {};

  let usdcBalance = parseFloat(
    ethers.utils.formatUnits(await usdc.balanceOf(bridgeAddress), 6)
  );
  let usdtBalance = parseFloat(
    ethers.utils.formatUnits(await usdt.balanceOf(bridgeAddress), 6)
  );
  let daiBalance = parseFloat(
    ethers.utils.formatUnits(await dai.balanceOf(bridgeAddress), 18)
  );
  let fraxBalance = parseFloat(
    ethers.utils.formatUnits(await frax.balanceOf(bridgeAddress), 18)
  );

  let husdBalance = parseFloat(
    ethers.utils.formatUnits(await husd.balanceOf(bridgeAddress), 8)
  );

  let busdBalance = parseFloat(
    ethers.utils.formatUnits(await busd.balanceOf(bridgeAddress), 18)
  );

  let tusdBalance = parseFloat(
    ethers.utils.formatUnits(await tusd.balanceOf(bridgeAddress), 18)
  );
  let dolaBalance = parseFloat(
    ethers.utils.formatUnits(await dola.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["ETH"] = parseFloat(
    ethers.utils.formatUnits(await provider.getBalance(bridgeAddress), 18)
  );

  bridgeTotals["WETH"] = parseFloat(
    ethers.utils.formatUnits(await weth.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["WBTC"] = parseFloat(
    ethers.utils.formatUnits(await wbtc.balanceOf(bridgeAddress), 8)
  );
  bridgeTotals["rETH"] = parseFloat(
    ethers.utils.formatUnits(await rEth.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["UNI"] = parseFloat(
    ethers.utils.formatUnits(await uni.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["LINK"] = parseFloat(
    ethers.utils.formatUnits(await link.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["SNX"] = parseFloat(
    ethers.utils.formatUnits(await snx.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["GHST"] = parseFloat(
    ethers.utils.formatUnits(await ghst.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["AAVE"] = parseFloat(
    ethers.utils.formatUnits(await aave.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["BAL"] = parseFloat(
    ethers.utils.formatUnits(await bal.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["MANA"] = parseFloat(
    ethers.utils.formatUnits(await mana.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["CRV"] = parseFloat(
    ethers.utils.formatUnits(await crv.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["AWX"] = parseFloat(
    ethers.utils.formatUnits(await awx.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["BEL"] = parseFloat(
    ethers.utils.formatUnits(await bel.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["CEL"] = parseFloat(
    ethers.utils.formatUnits(await cel.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["DG"] = parseFloat(
    ethers.utils.formatUnits(await dg.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["XDG"] = parseFloat(
    ethers.utils.formatUnits(await xdg.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["MATIC"] = parseFloat(
    ethers.utils.formatUnits(await matic.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["WOO"] = parseFloat(
    ethers.utils.formatUnits(await woo.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["ALPHA"] = parseFloat(
    ethers.utils.formatUnits(await alpha.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["ALEPH"] = parseFloat(
    ethers.utils.formatUnits(await aleph.balanceOf(bridgeAddress), 18)
  );
  // HBTC
  bridgeTotals["WBTC"] = parseFloat(
    ethers.utils.formatUnits(await hbtc.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["FTT"] = parseFloat(
    ethers.utils.formatUnits(await ftt.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["SRM"] = parseFloat(
    ethers.utils.formatUnits(await srm.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["NEXM"] = parseFloat(
    ethers.utils.formatUnits(await nexm.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["XCN"] = parseFloat(
    ethers.utils.formatUnits(await xcn.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["LDO"] = parseFloat(
    ethers.utils.formatUnits(await ldo.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["SUSHI"] = parseFloat(
    ethers.utils.formatUnits(await sushi.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["YFI"] = parseFloat(
    ethers.utils.formatUnits(await yfi.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["WOOFY"] = parseFloat(
    ethers.utils.formatUnits(await woofy.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["FXS"] = parseFloat(
    ethers.utils.formatUnits(await fxs.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["ICE"] = parseFloat(
    ethers.utils.formatUnits(await ice.balanceOf(bridgeAddress), 18)
  );
  bridgeTotals["AXS"] = parseFloat(
    ethers.utils.formatUnits(await axs.balanceOf(bridgeAddress), 18)
  );

  bridgeTotals["USD"] =
    daiBalance +
    usdtBalance +
    usdcBalance +
    tusdBalance +
    fraxBalance +
    husdBalance +
    busdBalance +
    dolaBalance;
  return bridgeTotals;
};

// const newTotals = {};
// for (const [key1, value1] of Object.entries(testObject)) {
//   for (const [key2, value2] of Object.entries(testObject2)) {
//     if (key1 === key2) {
//       newTotals[key1] = value1 + value2;
//       // console.log(`It's a match! ${key1} equals ${key2}`);
//     }
//   }
// }

const arbitrumBridgeBalance = async () => {
  const arbitrumCustomGateway = await getBridgeBalance(
    "0xcEe284F754E854890e311e3280b767F80797180d"
  ); // ERC20's
  const arbitrumWethGateway = await getBridgeBalance(
    "0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515"
  ); // WETH
  const arbitrumERC20Gateway = await getBridgeBalance(
    "0xa3A7B6F88361F48403514059F1F16C8E78d60EeC"
  ); // ERC20's

  const bridgeTotal = {};
  for (const [key1, value1] of Object.entries(arbitrumCustomGateway)) {
    for (const [key2, value2] of Object.entries(arbitrumWethGateway)) {
      for (const [key3, value3] of Object.entries(arbitrumERC20Gateway)) {
        if (key1 === key2 && key1 === key3) {
          bridgeTotal[key1] = value1 + value2 + value3;
        }
      }
    }
  }

  return bridgeTotal;
};

arbitrumBridgeBalance();

// console.log(getBridgeBalance("0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515"));

// Function for Calculating the USD total of a respective bridge
// Using the priceFeed definitions in /price_feeds.js
const calculateTotal = (inputBridge, priceFeed) => {
  let runningTotal = 0.0;
  for (const item in inputBridge) {
    if (item != "USD") {
      runningTotal += inputBridge[item] * priceFeed[item];
    }
  }
  let total = inputBridge["USD"] + runningTotal;
  return total;
};

// // Compiles all bridge data into an object, and returns that object
const data = async () => {
  let bridgeTotals = {};

  let [arbitrumResults, feedPrices] = await Promise.all([
    arbitrumBridgeBalance(),
    feeds(),
  ]);

  bridgeTotals["arbitrum"] = calculateTotal(arbitrumResults, feedPrices);
  console.log(bridgeTotals);
  return bridgeTotals;
};

data();
