const { ethers } = require("ethers");
require("dotenv").config();

// const provider = new ethers.providers.InfuraProvider("homestead", {
//   projectId: process.env.INFURA_PROJECT_ID,
//   projectSecret: process.env.INFURA_PROJECT_SECRET,
// });

const provider = new ethers.providers.InfuraProvider("homestead", process.env.INFURA_API_KEY);

// const provider = new ethers.providers.AlchemyProvider((network = "homestead"), process.env.ALCHEMY_API_KEY_ONE);

const {
  usdc,
  usdt,
  frax,
  // lusd,
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
  // nexm,
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
} = require("./contractObjects");

const getBridgeBalanceInfura = async (bridgeAddress) => {
  let bridgeTotals = {};
  const [
    usdcBalance,
    usdtBalance,
    daiBalance,
    fraxBalance,
    // lusdBalance,
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
    // nexmBalance,
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
    // parseFloat(ethers.utils.formatUnits(await lusd.balanceOf(bridgeAddress), 18)),
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
    // parseFloat(ethers.utils.formatUnits(await srm.balanceOf(bridgeAddress), 18)),
    // parseFloat(ethers.utils.formatUnits(await nexm.balanceOf(bridgeAddress), 18)),
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
  // bridgeTotals["NEXM"] = nexmBalance;
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
    // lusdBalance +
    husdBalance +
    busdBalance +
    dolaBalance +
    ausdcBalance +
    ausdtBalance;

  return bridgeTotals;
};

module.exports = { getBridgeBalanceInfura };
