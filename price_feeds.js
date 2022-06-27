const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;

// const provider = new ethers.providers.AlchemyProvider(
//   (network = "homestead"),
//   process.env.ALCHEMY_API_KEY
// );

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

const {
  ethUsdPriceContract,
  btcUsdPriceContract,
  feedRegistry,
} = require("./contract_objects");

const addresses = require("./contract_objects");

const ethUsdPriceFeed = ethUsdPriceContract();
const btcUsdPriceFeed = btcUsdPriceContract();
let feedingRegistry = feedRegistry();
const USD = "0x0000000000000000000000000000000000000348";
const aaveTokenAddress = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
const crvTokenAddress = "0xd533a949740bb3306d119cc777fa900ba034cd52";
const manaTokenAddress = "0x0f5d2fb29fb7d3cfee444a200298f468908cc942";
const balTokenAddress = "0xba100000625a3754423978a60c9317c58a424e3d";
const maticTokenAddress = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
const fttTokenAddress = "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9";
const sushiTokenAddress = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";
const yfiTokenAddress = "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e";
const fxsTokenAddress = "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0";
const axsTokenAddress = "0xBB0E17EF65F82Ab018d8EDd776e8DD940327B28b";
const snxTokenAddress = "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F";
const wbtcTokenAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
const uniTokenAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const linkTokenAddress = "0x514910771af9ca656af840dff83e8264ecf986ca";
const lrcTokenAddress = "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD";
const imxTokenAddress = "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF";
const omgTokenAddress = "0xd26114cd6ee289accf82350c8d8487fedb8a0c07";

const priceFeeds = async () => {
  let priceFeeds = {};

  const [
    ethPrice,
    btcPrice,
    linkPrice,
    uniPrice,
    snxPrice,
    aavePrice,
    crvPrice,
    manaPrice,
    balPrice,
    maticPrice,
    fttPrice,
    yfiPrice,
    fxsPrice,
    sushiPrice,
    lrcPrice,
    imxPrice,
    omgPrice,
    ghst,
    dg,
    xdg,
    awx,
    bel,
    cel,
    woo,
    alpha,
    aleph,
    serum,
    xcn,
    nexm,
    ldo,
    ice,
    woofy,
    axs,
    iceth,
    omi,
    dvf,
    hez,
    metis,
    boba,
  ] = await Promise.all([
    parseFloat(
      ethers.utils.formatUnits(await ethUsdPriceFeed.latestAnswer(), 8)
    ),
    parseFloat(
      ethers.utils.formatUnits(await btcUsdPriceFeed.latestAnswer(), 8)
    ),
    await feedingRegistry.latestRoundData(linkTokenAddress, USD),
    await feedingRegistry.latestRoundData(uniTokenAddress, USD),
    await feedingRegistry.latestRoundData(snxTokenAddress, USD),
    await feedingRegistry.latestRoundData(aaveTokenAddress, USD),
    await feedingRegistry.latestRoundData(crvTokenAddress, USD),
    await feedingRegistry.latestRoundData(manaTokenAddress, USD),
    await feedingRegistry.latestRoundData(balTokenAddress, USD),
    await feedingRegistry.latestRoundData(maticTokenAddress, USD),
    await feedingRegistry.latestRoundData(fttTokenAddress, USD),
    await feedingRegistry.latestRoundData(yfiTokenAddress, USD),
    await feedingRegistry.latestRoundData(fxsTokenAddress, USD),
    await feedingRegistry.latestRoundData(sushiTokenAddress, USD),
    await feedingRegistry.latestRoundData(lrcTokenAddress, USD),
    await feedingRegistry.latestRoundData(imxTokenAddress, USD),
    await feedingRegistry.latestRoundData(omgTokenAddress, USD),
    //Centralised Feeds
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=aavegotchi&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=decentral-games&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=decentral-games-governance&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=auruscoin&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=bella-protocol&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=celsius-degree-token&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=woo-network&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=alpha-finance&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=aleph&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=serum&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=chain-2&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=nexum&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=lido-dao&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ice-token&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=woofy&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=interest-compounding-eth-index&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ecomi&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=dvf&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=hermez-network-token&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=metis-token&vs_currencies=usd`
    ),
    await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=boba-network&vs_currencies=usd`
    ),
  ]);

  priceFeeds["ETH"] = ethPrice;
  priceFeeds["WETH"] = ethPrice;
  priceFeeds["rETH"] = ethPrice;
  priceFeeds["wstETH"] = ethPrice;
  priceFeeds["WBTC"] = btcPrice;
  priceFeeds["HBTC"] = btcPrice;

  priceFeeds["LINK"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(linkPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["UNI"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(uniPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );
  priceFeeds["SNX"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(snxPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["AAVE"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(aavePrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["CRV"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(crvPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["MANA"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(manaPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["BAL"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(balPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );
  priceFeeds["MATIC"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(maticPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["FTT"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(fttPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["SUSHI"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(sushiPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["YFI"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(yfiPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["FXS"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(fxsPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );
  priceFeeds["LRC"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(lrcPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );
  priceFeeds["IMX"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(imxPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  priceFeeds["OMG"] = parseFloat(
    ethers.utils.formatUnits(
      ethers.BigNumber.from(omgPrice["answer"]["_hex"]).toNumber(),
      8
    )
  );

  // Centralised Feeds
  //Aavegotchi
  priceFeeds["GHST"] = parseFloat(ghst["data"]["aavegotchi"]["usd"]);
  // Decentral Games
  priceFeeds["DG"] = parseFloat(dg["data"]["decentral-games"]["usd"]);
  // Decentral Games Governance
  priceFeeds["XDG"] = parseFloat(
    xdg["data"]["decentral-games-governance"]["usd"]
  );
  // Aurus Defi
  priceFeeds["AWX"] = parseFloat(awx["data"]["auruscoin"]["usd"]);
  // Bella Protocol
  priceFeeds["BEL"] = parseFloat(bel["data"]["bella-protocol"]["usd"]);
  // Celsius Network
  priceFeeds["CEL"] = parseFloat(cel["data"]["celsius-degree-token"]["usd"]);
  // Woo Network
  priceFeeds["WOO"] = parseFloat(woo["data"]["woo-network"]["usd"]);
  priceFeeds["ALPHA"] = parseFloat(alpha["data"]["alpha-finance"]["usd"]);
  priceFeeds["ALEPH"] = parseFloat(aleph["data"]["aleph"]["usd"]);
  priceFeeds["SRM"] = parseFloat(serum["data"]["serum"]["usd"]);
  priceFeeds["XCN"] = parseFloat(xcn["data"]["chain-2"]["usd"]);
  priceFeeds["NEXM"] = parseFloat(nexm["data"]["nexum"]["usd"]);
  priceFeeds["LDO"] = parseFloat(ldo["data"]["lido-dao"]["usd"]);
  priceFeeds["ICE"] = parseFloat(ice["data"]["ice-token"]["usd"]);
  priceFeeds["WOOFY"] = parseFloat(woofy["data"]["woofy"]["usd"]);
  priceFeeds["AXS"] = parseFloat(axs["data"]["axie-infinity"]["usd"]);
  priceFeeds["icETH"] = parseFloat(
    iceth["data"]["interest-compounding-eth-index"]["usd"]
  );
  priceFeeds["OMI"] = parseFloat(omi["data"]["ecomi"]["usd"]);
  priceFeeds["DVF"] = parseFloat(dvf["data"]["dvf"]["usd"]);
  priceFeeds["xDVF"] = parseFloat(dvf["data"]["dvf"]["usd"]);
  priceFeeds["HEZ"] = parseFloat(hez["data"]["hermez-network-token"]["usd"]);
  priceFeeds["METIS"] = parseFloat(metis["data"]["metis-token"]["usd"]);
  priceFeeds["BOBA"] = parseFloat(boba["data"]["boba-network"]["usd"]);

  // console.log(priceFeeds);
  return priceFeeds;
};

priceFeeds();

module.exports = {
  priceFeeds,
};
