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
  const [
    usdcBalance,
    usdtBalance,
    daiBalance,
    fraxBalance,
    husdBalance,
    busdBalance,
    tusdBalance,
    dolaBalance,
    ethBalance,
    wethBalance,
    wbtcBalance,
    rethBalance,
    uniBalance,
    linkBalance,
    snxBalance,
    ghstBalance,
    aaveBalance,
    balBalance,
    manaBalance,
    crvBalance,
    awxBalance,
    belBalance,
    celBalance,
    dgBalance,
    xdgBalance,
    maticBalance,
    wooBalance,
    alphaBalance,
    alephBalance,
    hbtcBalance,
    fttBalance,
    srmBalance,
    nexmBalance,
    xcnBalance,
    ldoBalance,
    sushiBalance,
    yfiBalance,
    woofyBalance,
    fxsBalance,
    iceBalance,
    axsBalance,
  ] = await Promise.all([
    parseFloat(
      ethers.utils.formatUnits(await usdc.balanceOf(bridgeAddress), 6)
    ),
    parseFloat(
      ethers.utils.formatUnits(await usdt.balanceOf(bridgeAddress), 6)
    ),
    parseFloat(
      ethers.utils.formatUnits(await dai.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await frax.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await husd.balanceOf(bridgeAddress), 8)
    ),
    parseFloat(
      ethers.utils.formatUnits(await busd.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await tusd.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await dola.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await provider.getBalance(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await weth.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await wbtc.balanceOf(bridgeAddress), 8)
    ),
    parseFloat(
      ethers.utils.formatUnits(await rEth.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await uni.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await link.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await snx.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await ghst.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await aave.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await bal.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await mana.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await crv.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await awx.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await bel.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await cel.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(ethers.utils.formatUnits(await dg.balanceOf(bridgeAddress), 18)),
    parseFloat(
      ethers.utils.formatUnits(await xdg.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await matic.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await woo.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await alpha.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await aleph.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await hbtc.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await ftt.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await srm.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await nexm.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await xcn.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await ldo.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await sushi.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await yfi.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await woofy.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await fxs.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await ice.balanceOf(bridgeAddress), 18)
    ),
    parseFloat(
      ethers.utils.formatUnits(await axs.balanceOf(bridgeAddress), 18)
    ),
  ]);

  bridgeTotals["ETH"] = ethBalance;
  bridgeTotals["WETH"] = wethBalance;
  bridgeTotals["WBTC"] = wbtcBalance;
  bridgeTotals["rETH"] = rethBalance;
  bridgeTotals["UNI"] = uniBalance;
  bridgeTotals["LINK"] = linkBalance;
  bridgeTotals["SNX"] = snxBalance;
  bridgeTotals["GHST"] = ghstBalance;
  bridgeTotals["AAVE"] = aaveBalance;
  bridgeTotals["BAL"] = balBalance;
  bridgeTotals["MANA"] = manaBalance;
  bridgeTotals["CRV"] = crvBalance;
  bridgeTotals["AWX"] = awxBalance;
  bridgeTotals["BEL"] = belBalance;
  bridgeTotals["CEL"] = celBalance;
  bridgeTotals["DG"] = dgBalance;
  bridgeTotals["XDG"] = xdgBalance;
  bridgeTotals["MATIC"] = maticBalance;
  bridgeTotals["WOO"] = wooBalance;
  bridgeTotals["ALPHA"] = alphaBalance;
  bridgeTotals["ALEPH"] = alephBalance;
  bridgeTotals["HBTC"] = hbtcBalance;
  bridgeTotals["FTT"] = fttBalance;
  bridgeTotals["SRM"] = srmBalance;
  bridgeTotals["NEXM"] = nexmBalance;
  bridgeTotals["XCN"] = xcnBalance;
  bridgeTotals["LDO"] = ldoBalance;
  bridgeTotals["SUSHI"] = sushiBalance;
  bridgeTotals["YFI"] = yfiBalance;
  bridgeTotals["WOOFY"] = woofyBalance;
  bridgeTotals["FXS"] = fxsBalance;
  bridgeTotals["ICE"] = iceBalance;
  bridgeTotals["AXS"] = axsBalance;

  bridgeTotals["USD"] =
    daiBalance +
    usdtBalance +
    usdcBalance +
    tusdBalance +
    fraxBalance +
    husdBalance +
    busdBalance +
    dolaBalance;

  // console.log(bridgeTotals);
  return bridgeTotals;
};

const arbitrumBridgeBalance = async () => {
  const [arbitrumCustomGateway, arbitrumWethGateway, arbitrumERC20Gateway] =
    await Promise.all([
      getBridgeBalance("0xcEe284F754E854890e311e3280b767F80797180d"),
      getBridgeBalance("0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515"),
      getBridgeBalance("0xa3A7B6F88361F48403514059F1F16C8E78d60EeC"),
    ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(arbitrumCustomGateway)) {
    for (const [key2, value2] of Object.entries(arbitrumWethGateway)) {
      for (const [key3, value3] of Object.entries(arbitrumERC20Gateway)) {
        if (key1 === key2 && key1 === key3) {
          bridgeTotal[key1] = value1 + value2 + value3;
        } else {
          continue;
        }
      }
    }
  }
  return bridgeTotal;
};

// Function for Calculating the USD total of a respective bridge
// Using the priceFeed definitions in /price_feeds.js
const calculateTotal = (inputBridge, priceFeed) => {
  let runningTotal = 0.0;
  for (const item in inputBridge) {
    if (item != "USD") {
      // console.log(item);
      runningTotal += inputBridge[item] * priceFeed[item];
      // console.log(runningTotal);
      // console.log(
      //   `Bridge item: ${inputBridge[item]}, feed item: ${priceFeed[item]}`
      // );
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
