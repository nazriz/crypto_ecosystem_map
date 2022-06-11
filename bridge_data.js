const { ethers } = require("ethers");
require("dotenv").config();
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const provider = new ethers.providers.EtherscanProvider(
  (network = "homestead"),
  API_KEY
);
const signer = new ethers.Wallet(PRIV_KEY, provider);

const {
  usdcContract,
  usdtContract,
  fraxContract,
  lusdContract,
  linkContract,
  wbtcContract,
  rEthContract,
  uniContract,
  snxContract,
  daiContract,
  ghstContract,
  aaveContract,
  crvContract,
  balContract,
  manaContract,
  belContract,
  awxContract,
  dgContract,
  xdgContract,
  celContract,
  maticContract,
  wethContract,
  wooContract,
  alphaContract,
  serumContract,
  alephContract,
} = require("./contract_objects");
const { priceFeeds } = require("./price_feeds");

const feeds = async () => {
  let feeds = priceFeeds();
  return feeds;
};

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
const ghst = ghstContract();
const aave = aaveContract();
const mana = manaContract();
const crv = crvContract();
const bal = balContract();
const bel = belContract();
const awx = awxContract();
const dg = dgContract();
const xdg = xdgContract();
const cel = celContract();
const matic = maticContract();
const weth = wethContract();
const woo = wooContract();
const alpha = alphaContract();
const aleph = alephContract();
const srm = serumContract();

const arbitrumBridgeBalance = async () => {
  let bridgeTotals = {};

  const arbitrumCustomGateway = "0xcEe284F754E854890e311e3280b767F80797180d"; // ERC20's
  const arbitrumWethGateway = "0x011B6E24FfB0B5f5fCc564cf4183C5BBBc96D515"; // WETH
  const arbitrumERC20Gateway = "0xa3A7B6F88361F48403514059F1F16C8E78d60EeC"; // ERC20's

  let usdcBalance = parseFloat(
    ethers.utils.formatUnits(await usdc.balanceOf(arbitrumCustomGateway), 6)
  );
  let usdtBalance = parseFloat(
    ethers.utils.formatUnits(await usdt.balanceOf(arbitrumCustomGateway), 6)
  );
  let fraxBalance = parseFloat(
    ethers.utils.formatUnits(await frax.balanceOf(arbitrumERC20Gateway), 18)
  );
  bridgeTotals["LINK"] = parseFloat(
    ethers.utils.formatUnits(await link.balanceOf(arbitrumERC20Gateway), 18)
  );
  bridgeTotals["ETH"] = parseFloat(
    ethers.utils.formatUnits(await provider.getBalance(arbitrumWethGateway), 18)
  );

  bridgeTotals["USD"] = usdcBalance + usdtBalance + fraxBalance;

  return bridgeTotals;
};

const optimismBridgeBalance = async () => {
  let bridgeTotals = {};

  const optimismDaiBridge = "0x467194771dae2967aef3ecbedd3bf9a310c76c65"; //DAI
  const optimismBridge = "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1";
  const optimismSnxBridge = "0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f"; //Synthetix

  let usdcBalance = parseFloat(
    ethers.utils.formatUnits(await usdc.balanceOf(optimismBridge), 6)
  );
  let usdtBalance = parseFloat(
    ethers.utils.formatUnits(await usdt.balanceOf(optimismBridge), 6)
  );
  let lusdBalance = parseFloat(
    ethers.utils.formatUnits(await lusd.balanceOf(optimismBridge), 18)
  );
  let daiBalance = parseFloat(
    ethers.utils.formatUnits(await dai.balanceOf(optimismDaiBridge), 18)
  );

  bridgeTotals["WBTC"] = parseFloat(
    ethers.utils.formatUnits(await wbtc.balanceOf(optimismBridge), 8)
  );
  bridgeTotals["rETH"] = parseFloat(
    ethers.utils.formatUnits(await rEth.balanceOf(optimismBridge), 18)
  );
  bridgeTotals["UNI"] = parseFloat(
    ethers.utils.formatUnits(await uni.balanceOf(optimismBridge), 18)
  );
  bridgeTotals["LINK"] = parseFloat(
    ethers.utils.formatUnits(await link.balanceOf(optimismBridge), 18)
  );
  bridgeTotals["SNX"] = parseFloat(
    ethers.utils.formatUnits(await snx.balanceOf(optimismSnxBridge), 18)
  );
  bridgeTotals["ETH"] = parseFloat(
    ethers.utils.formatUnits(await provider.getBalance(optimismBridge), 18)
  );

  bridgeTotals["USD"] = usdcBalance + usdtBalance + lusdBalance + daiBalance;

  return bridgeTotals;
};

const polygonBridgeBalance = async () => {
  let bridgeTotals = {};

  const polygonEthBridge = "0x8484Ef722627bf18ca5Ae6BcF031c23E6e922B30";
  const polygonPlasmaBridge = "0x401F6c983eA34274ec46f84D70b31C151321188b";
  const polygonERC20Bridge = "0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf";

  let daiBalance = parseFloat(
    ethers.utils.formatUnits(await dai.balanceOf(polygonERC20Bridge), 18)
  );
  bridgeTotals["GHST"] = parseFloat(
    ethers.utils.formatUnits(await ghst.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["AAVE"] = parseFloat(
    ethers.utils.formatUnits(await aave.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["BAL"] = parseFloat(
    ethers.utils.formatUnits(await bal.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["MANA"] = parseFloat(
    ethers.utils.formatUnits(await mana.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["CRV"] = parseFloat(
    ethers.utils.formatUnits(await crv.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["AWX"] = parseFloat(
    ethers.utils.formatUnits(await awx.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["BEL"] = parseFloat(
    ethers.utils.formatUnits(await bel.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["CEL"] = parseFloat(
    ethers.utils.formatUnits(await cel.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["DG"] = parseFloat(
    ethers.utils.formatUnits(await dg.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["XDG"] = parseFloat(
    ethers.utils.formatUnits(await xdg.balanceOf(polygonERC20Bridge), 18)
  );

  bridgeTotals["MATIC"] = parseFloat(
    ethers.utils.formatUnits(await matic.balanceOf(polygonPlasmaBridge), 18)
  );

  bridgeTotals["ETH"] = parseFloat(
    ethers.utils.formatUnits(await provider.getBalance(polygonEthBridge), 18)
  );

  bridgeTotals["USD"] = daiBalance;

  return bridgeTotals;
};

const avalancheBridgeBalance = async () => {
  const avalancheBridgeAddress = "0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0";
  let bridgeTotals = {};

  bridgeTotals["ETH"] = parseFloat(
    ethers.utils.formatUnits(await weth.balanceOf(avalancheBridgeAddress), 18)
  ); //WETH

  let usdcBalance = parseFloat(
    ethers.utils.formatUnits(await usdc.balanceOf(avalancheBridgeAddress), 6)
  );
  let usdtBalance = parseFloat(
    ethers.utils.formatUnits(await usdt.balanceOf(avalancheBridgeAddress), 6)
  );
  let daiBalance = parseFloat(
    ethers.utils.formatUnits(await dai.balanceOf(avalancheBridgeAddress), 18)
  );

  bridgeTotals["WBTC"] = parseFloat(
    ethers.utils.formatUnits(await wbtc.balanceOf(avalancheBridgeAddress), 8)
  );

  bridgeTotals["LINK"] = parseFloat(
    ethers.utils.formatUnits(await link.balanceOf(avalancheBridgeAddress), 18)
  );

  bridgeTotals["AAVE"] = parseFloat(
    ethers.utils.formatUnits(await aave.balanceOf(avalancheBridgeAddress), 18)
  );
  bridgeTotals["WOO"] = parseFloat(
    ethers.utils.formatUnits(await woo.balanceOf(avalancheBridgeAddress), 18)
  );
  bridgeTotals["ALPHA"] = parseFloat(
    ethers.utils.formatUnits(await alpha.balanceOf(avalancheBridgeAddress), 18)
  );

  bridgeTotals["USD"] = usdcBalance + usdtBalance + daiBalance;
  return bridgeTotals;
};

const solanaBridgeBalance = async () => {
  const solanaSolletBridge = "0xeae57ce9cc1984F202e15e038B964bb8bdF7229a";
  const solanaWormHoleBridge = "0xf92cD566Ea4864356C5491c177A430C222d7e678";
  const solanaWormholeTokenBridge =
    "0x3ee18B2214AFF97000D974cf647E7C347E8fa585";

  let bridgeTotals = {};
  let usdtBalance = parseFloat(
    ethers.utils.formatUnits(await usdt.balanceOf(solanaSolletBridge), 6)
  );
  let usdcBalance = parseFloat(
    ethers.utils.formatUnits(await usdc.balanceOf(solanaSolletBridge), 6)
  );

  bridgeTotals["UNI"] = parseFloat(
    ethers.utils.formatUnits(await uni.balanceOf(solanaSolletBridge), 18)
  );
  bridgeTotals["LINK"] = parseFloat(
    ethers.utils.formatUnits(await link.balanceOf(solanaSolletBridge), 18)
  );

  bridgeTotals["SRM"] = parseFloat(
    ethers.utils.formatUnits(await srm.balanceOf(solanaSolletBridge), 18)
  );

  bridgeTotals["ALEPH"] = parseFloat(
    ethers.utils.formatUnits(await aleph.balanceOf(solanaSolletBridge), 18)
  );

  bridgeTotals["USD"] = usdtBalance + usdcBalance;

  return bridgeTotals;
};
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

const data = async () => {
  let bridgeTotals = {};

  let [
    arbitrumResults,
    optimismResults,
    polygonResults,
    avalancheResults,
    feedPrices,
  ] = await Promise.all([
    arbitrumBridgeBalance(),
    optimismBridgeBalance(),
    polygonBridgeBalance(),
    avalancheBridgeBalance(),
    feeds(),
  ]);
  bridgeTotals["arbitrum"] = calculateTotal(arbitrumResults, feedPrices);
  bridgeTotals["optimism"] = calculateTotal(optimismResults, feedPrices);
  bridgeTotals["polygon"] = calculateTotal(polygonResults, feedPrices);
  bridgeTotals["avalanche"] = calculateTotal(avalancheResults, feedPrices);

  console.log(bridgeTotals);
  return bridgeTotals;
};

data();
