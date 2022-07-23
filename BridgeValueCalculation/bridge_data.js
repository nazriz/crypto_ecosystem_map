const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const { calcRatios } = require("./calculateRatios");

// const provider = new ethers.providers.AlchemyProvider(
//   (network = "homestead"),
//   process.env.ALCHEMY_API_KEY
// );

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

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
  wsteth,
  iceth,
  lrc,
  imx,
  omi,
  dvf,
  xdvf,
  hez,
  metis,
  boba,
  omg,
  zks,
  cdai,
  ausdt,
  ausdc,
  hopr,
  dxd,
  gno,
  node,
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
    lusdBalance,
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
    wstethBalance,
    icethBalance,
    lrcBalance,
    imxBalance,
    omiBalance,
    dvfBalance,
    xdvfBalance,
    hezBalance,
    metisBalance,
    bobaBalance,
    omgBalance,
    zksBalance,
    cdaiBalance,
    ausdtBalance,
    ausdcBalance,
    hoprBalance,
    dxdBalance,
    gnoBalance,
    nodeBalance,
  ] = await Promise.all([
    parseFloat(ethers.utils.formatUnits(await usdc.balanceOf(bridgeAddress), 6)),
    parseFloat(ethers.utils.formatUnits(await usdt.balanceOf(bridgeAddress), 6)),
    parseFloat(ethers.utils.formatUnits(await dai.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await frax.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await lusd.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await husd.balanceOf(bridgeAddress), 8)),
    parseFloat(ethers.utils.formatUnits(await busd.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await tusd.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await dola.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await provider.getBalance(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await weth.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await wbtc.balanceOf(bridgeAddress), 8)),
    parseFloat(ethers.utils.formatUnits(await rEth.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await uni.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await link.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await snx.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await ghst.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await aave.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await bal.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await mana.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await crv.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await awx.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await bel.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await cel.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await dg.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await xdg.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await matic.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await woo.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await alpha.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await aleph.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await hbtc.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await ftt.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await srm.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await nexm.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await xcn.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await ldo.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await sushi.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await yfi.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await woofy.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await fxs.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await ice.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await axs.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await wsteth.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await iceth.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await lrc.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await imx.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await omi.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await dvf.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await xdvf.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await hez.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await metis.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await boba.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await omg.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await zks.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await cdai.balanceOf(bridgeAddress), 8)),
    parseFloat(ethers.utils.formatUnits(await ausdt.balanceOf(bridgeAddress), 6)),
    parseFloat(ethers.utils.formatUnits(await ausdc.balanceOf(bridgeAddress), 6)),
    parseFloat(ethers.utils.formatUnits(await hopr.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await dxd.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await gno.balanceOf(bridgeAddress), 18)),
    parseFloat(ethers.utils.formatUnits(await node.balanceOf(bridgeAddress), 18)),
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
  bridgeTotals["wstETH"] = wstethBalance;
  bridgeTotals["icETH"] = icethBalance;
  bridgeTotals["LRC"] = lrcBalance;
  bridgeTotals["IMX"] = imxBalance;
  bridgeTotals["OMI"] = omiBalance;
  bridgeTotals["DVF"] = dvfBalance;
  bridgeTotals["xDVF"] = xdvfBalance;
  bridgeTotals["HEZ"] = hezBalance;
  bridgeTotals["METIS"] = metisBalance;
  bridgeTotals["BOBA"] = bobaBalance;
  bridgeTotals["OMG"] = omgBalance;
  bridgeTotals["ZKS"] = zksBalance;
  bridgeTotals["cDAI"] = cdaiBalance;
  bridgeTotals["HOPR"] = hoprBalance;
  bridgeTotals["DXD"] = dxdBalance;
  bridgeTotals["GNO"] = gnoBalance;
  bridgeTotals["NODE"] = nodeBalance;

  bridgeTotals["USD"] =
    daiBalance +
    usdtBalance +
    usdcBalance +
    tusdBalance +
    fraxBalance +
    lusdBalance +
    husdBalance +
    busdBalance +
    dolaBalance +
    ausdcBalance +
    ausdtBalance;

  // console.log(
  //   daiBalance,
  //   usdtBalance,
  //   usdcBalance,
  //   tusdBalance,
  //   fraxBalance,
  //   lusdBalance,
  //   husdBalance,
  //   busdBalance,
  //   dolaBalance
  // );
  // console.log(bridgeTotals);
  return bridgeTotals;
};

const arbitrumBridgeBalance = async () => {
  const [arbitrumCustomGateway, arbitrumWethGateway, arbitrumERC20Gateway] = await Promise.all([
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

const optimismBridgeBalance = async () => {
  const [optimismDaiBridge, optimismBridge, optimismSnxBridge] = await Promise.all([
    getBridgeBalance("0x467194771dae2967aef3ecbedd3bf9a310c76c65"),
    getBridgeBalance("0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"),
    getBridgeBalance("0x5Fd79D46EBA7F351fe49BFF9E87cdeA6c821eF9f"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(optimismDaiBridge)) {
    for (const [key2, value2] of Object.entries(optimismBridge)) {
      for (const [key3, value3] of Object.entries(optimismSnxBridge)) {
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

const polygonBridgeBalance = async () => {
  const [polygonEthBridge, polygonPlasmaBridge, polygonERC20Bridge] = await Promise.all([
    getBridgeBalance("0x8484Ef722627bf18ca5Ae6BcF031c23E6e922B30"),
    getBridgeBalance("0x401F6c983eA34274ec46f84D70b31C151321188b"),
    getBridgeBalance("0x40ec5B33f54e0E8A33A975908C5BA1c14e5BbbDf"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(polygonEthBridge)) {
    for (const [key2, value2] of Object.entries(polygonPlasmaBridge)) {
      for (const [key3, value3] of Object.entries(polygonERC20Bridge)) {
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

const avalancheBridgeBalance = async () => {
  const avalancheBridgeAddress = "0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0";

  const [avalancheBridge] = await Promise.all([getBridgeBalance("0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0")]);

  return avalancheBridge;
};

const solanaBridgeBalance = async () => {
  const [solanaSolletBridge, solanaWormHoleBridge, solanaWormholeTokenBridge] = await Promise.all([
    getBridgeBalance("0xeae57ce9cc1984F202e15e038B964bb8bdF7229a"),
    getBridgeBalance("0xf92cD566Ea4864356C5491c177A430C222d7e678"),
    getBridgeBalance("0x3ee18B2214AFF97000D974cf647E7C347E8fa585"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(solanaSolletBridge)) {
    for (const [key2, value2] of Object.entries(solanaWormHoleBridge)) {
      for (const [key3, value3] of Object.entries(solanaWormholeTokenBridge)) {
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

const nearBridgeBalance = async () => {
  // Contract address holds the entire uncirculating supply for some projects,
  // These tokens have been omitted from the calculation:
  // Omitted tokens:
  // Aurora (AURORA)
  // Aurigami (PLY)
  // Octopus Network (OCT)
  // YouMinter (UMINT)

  const [nearRainbowBridge] = await Promise.all([getBridgeBalance("0x23Ddd3e3692d1861Ed57EDE224608875809e127f")]);

  return nearRainbowBridge;
};

const fantomBridgeBalance = async () => {
  const [fantomAnyswapBridge] = await Promise.all([getBridgeBalance("0xC564EE9f21Ed8A2d8E7e76c085740d5e4c5FaFbE")]);

  return fantomAnyswapBridge;
};

const moonriverBridgeBalance = async () => {
  const [moonRiverBridge] = await Promise.all([getBridgeBalance("0x10c6b61DbF44a083Aec3780aCF769C77BE747E23")]);

  return moonRiverBridge;
};

// I believe the bridge is still halted/might change altogether
// But including it as is, so that I don't forget about it in the future
const roninBridgeBalance = async () => {
  const [roninBridge] = await Promise.all([getBridgeBalance("0x1A2a1c938CE3eC39b6D47113c7955bAa9DD454F2")]);

  return roninBridge;
};

const zksyncBridgeBalance = async () => {
  const [zkSyncBridge] = await Promise.all([getBridgeBalance("0xaBEA9132b05A70803a4E85094fD0e1800777fBEF")]);

  return zkSyncBridge;
};

const dYdXBridgeBalance = async () => {
  const [dYdXBridge] = await Promise.all([getBridgeBalance("0xD54f502e184B6B739d7D27a6410a67dc462D69c8")]);

  return dYdXBridge;
};

const loopringBridgeBalance = async () => {
  const [loopringBridge] = await Promise.all([getBridgeBalance("0x674bdf20A0F284D710BC40872100128e2d66Bd3f")]);
  return loopringBridge;
};

const immutableXBridgeBalance = async () => {
  const [immutableXBridge] = await Promise.all([getBridgeBalance("0x5FDCCA53617f4d2b9134B29090C87D01058e27e9")]);

  return immutableXBridge;
};

const deversiFiBridgeBalance = async () => {
  const [deversiFiBridge] = await Promise.all([getBridgeBalance("0x5d22045DAcEAB03B158031eCB7D9d06Fad24609b")]);

  return deversiFiBridge;
};

const sorareBridgeBalance = async () => {
  const [sorareBridge] = await Promise.all([getBridgeBalance("0xF5C9F957705bea56a7e806943f98F7777B995826")]);

  return sorareBridge;
};

const aztecBridgeBalance = async () => {
  const [aztecBridge] = await Promise.all([getBridgeBalance("0x737901bea3eeb88459df9ef1BE8fF3Ae1B42A2ba")]);

  return aztecBridge;
};

const OMGBridgeBalance = async () => {
  const [OMGEthBridge, OMGERC20Bridge] = await Promise.all([
    getBridgeBalance("0x3Eed23eA148D356a72CA695DBCe2fceb40a32ce0"),
    getBridgeBalance("0x070cB1270A4B2bA53c81CeF89d0FD584Ed4F430B"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(OMGEthBridge)) {
    for (const [key2, value2] of Object.entries(OMGERC20Bridge)) {
      if (key1 === key2) {
        bridgeTotal[key1] = value1 + value2;
      } else {
        continue;
      }
    }
  }
  return bridgeTotal;
};

const starknetBridgeBalance = async () => {
  const [ethStarkgate, daiVault] = await Promise.all([
    getBridgeBalance("0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419"),
    getBridgeBalance("0x0437465dfb5B79726e35F08559B0cBea55bb585C"),
  ]);
  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(ethStarkgate)) {
    for (const [key2, value2] of Object.entries(daiVault)) {
      if (key1 === key2) {
        bridgeTotal[key1] = value1 + value2;
      } else {
        continue;
      }
    }
  }
  return bridgeTotal;
};

const polygonHermezBridgeBalance = async () => {
  const [polygonHermezBridge] = await Promise.all([getBridgeBalance("0xA68D85dF56E733A06443306A095646317B5Fa633")]);

  return polygonHermezBridge;
};

const metisAndromedaBridgeBalance = async () => {
  const [metisAndromedaBridge] = await Promise.all([getBridgeBalance("0x3980c9ed79d2c191A89E02Fa3529C60eD6e9c04b")]);

  return metisAndromedaBridge;
};

const bobaNetworkBridgeBalance = async () => {
  const [bobaNetworkBridge] = await Promise.all([getBridgeBalance("0xdc1664458d2f0B6090bEa60A8793A4E66c2F1c00")]);

  return bobaNetworkBridge;
};

const zkSpaceBridgeBalance = async () => {
  const [zkSpaceBridge] = await Promise.all([getBridgeBalance("0x5CDAF83E077DBaC2692b5864CA18b61d67453Be8")]);

  return zkSpaceBridge;
};

const gnosisChainBridgeBalance = async () => {
  const [xDaiBridge, OmniBridge, OmniBridgeStablecoins] = await Promise.all([
    getBridgeBalance("0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016"),
    getBridgeBalance("0x88ad09518695c6c3712AC10a214bE5109a655671"),
    getBridgeBalance("0x87D48c565D0D85770406D248efd7dc3cbd41e729"),
  ]);

  let bridgeTotal = {};
  for (const [key1, value1] of Object.entries(xDaiBridge)) {
    for (const [key2, value2] of Object.entries(OmniBridge)) {
      for (const [key3, value3] of Object.entries(OmniBridgeStablecoins)) {
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
      runningTotal += inputBridge[item] * priceFeed[item];
    }
  }
  let total = inputBridge["USD"] + runningTotal;

  total = total.toFixed(0);
  total = new Intl.NumberFormat({ style: "currency", currency: "USD" }).format(total);
  return total;
};

// // Compiles all bridge data into an object, and returns that object
const data = async () => {
  let bridgeTotals = {};
  let layer2Totals = {};
  let altL1Totals = {};
  let sidechainTotals = {};

  let [
    arbitrumResults,
    optimismResults,
    polygonResults,
    avalancheResults,
    solanaResults,
    nearResults,
    fantomResults,
    moonriverResults,
    roninResults,
    zkSyncResults,
    dYdXResults,
    loopringResults,
    immutableXResults,
    deversiFiResults,
    sorareResults,
    aztecResults,
    OMGResults,
    starknetResults,
    polygonHermezResults,
    metisAndromedaResults,
    bobaNetworkResults,
    ZKSpaceResults,
    gnosisChainResults,
    feedPrices,
  ] = await Promise.all([
    arbitrumBridgeBalance(),
    optimismBridgeBalance(),
    polygonBridgeBalance(),
    avalancheBridgeBalance(),
    solanaBridgeBalance(),
    nearBridgeBalance(),
    fantomBridgeBalance(),
    moonriverBridgeBalance(),
    roninBridgeBalance(),
    zksyncBridgeBalance(),
    dYdXBridgeBalance(),
    loopringBridgeBalance(),
    immutableXBridgeBalance(),
    deversiFiBridgeBalance(),
    sorareBridgeBalance(),
    aztecBridgeBalance(),
    OMGBridgeBalance(),
    starknetBridgeBalance(),
    polygonHermezBridgeBalance(),
    metisAndromedaBridgeBalance(),
    bobaNetworkBridgeBalance(),
    zkSpaceBridgeBalance(),
    gnosisChainBridgeBalance(),
    feeds(),
  ]);

  layer2Totals["arbitrum"] = calculateTotal(arbitrumResults, feedPrices);
  layer2Totals["optimism"] = calculateTotal(optimismResults, feedPrices);
  layer2Totals["zkSync"] = calculateTotal(zkSyncResults, feedPrices);
  layer2Totals["dYdX"] = calculateTotal(dYdXResults, feedPrices);
  layer2Totals["loopring"] = calculateTotal(loopringResults, feedPrices);
  layer2Totals["immutableX"] = calculateTotal(immutableXResults, feedPrices);
  layer2Totals["deversiFi"] = calculateTotal(deversiFiResults, feedPrices);
  layer2Totals["sorare"] = calculateTotal(sorareResults, feedPrices);
  layer2Totals["aztec"] = calculateTotal(aztecResults, feedPrices);
  layer2Totals["OMG"] = calculateTotal(OMGResults, feedPrices);
  layer2Totals["starknet"] = calculateTotal(starknetResults, feedPrices);
  layer2Totals["polygonHermez"] = calculateTotal(polygonHermezResults, feedPrices);

  layer2Totals["metisAndromeda"] = calculateTotal(metisAndromedaResults, feedPrices);

  layer2Totals["bobaNetwork"] = calculateTotal(bobaNetworkResults, feedPrices);
  layer2Totals["ZKSpace"] = calculateTotal(ZKSpaceResults, feedPrices);

  sidechainTotals["polygon"] = calculateTotal(polygonResults, feedPrices);
  sidechainTotals["ronin"] = calculateTotal(roninResults, feedPrices);
  sidechainTotals["gnosisChain"] = calculateTotal(gnosisChainResults, feedPrices);

  altL1Totals["avalanche"] = calculateTotal(avalancheResults, feedPrices);
  altL1Totals["solana"] = calculateTotal(solanaResults, feedPrices);
  altL1Totals["near"] = calculateTotal(nearResults, feedPrices);
  altL1Totals["fantom"] = calculateTotal(fantomResults, feedPrices);
  altL1Totals["moonriver"] = calculateTotal(moonriverResults, feedPrices);

  bridgeTotals["layer2"] = layer2Totals;
  bridgeTotals["sidechain"] = sidechainTotals;
  bridgeTotals["alt_l1"] = altL1Totals;

  let ecosystem = {};

  ecosystem["Ethereum"] = bridgeTotals;

  //Write data to file
  fs.writeFile("bridgedFromEth.json", JSON.stringify(ecosystem), (err) => {
    if (err) {
      console.error(err);
    }
  });

  calcRatios(await ecosystem);
  console.log(ecosystem);
  return ecosystem;
};

// Calculate Ratios of bridged data

data();

/*

MISC BRIDGES:

ZigZag: ZkSync > Polygon 0xbb256f544b8087596e8e6cdd7fe9726cc98cb400
HOP Protocol
synapseprotocol.com
bridge poly network
celer bridge
boring dao
relay chain

wanchain for xrp bridge

skale?? I don't think they have anything

Aurora Mainnet?

For BNB, Celer cBridge and Anyswap? But extremely difficult
to get data

Cronos



*/