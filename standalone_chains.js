const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const erc20ABI = require("./ABI/erc20_abi.json");
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ALCHEMY_POLYGON_API_KEY = process.env.ALCHEMY_POLYGON_API_KEY;

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

const polygonProvider = new ethers.providers.AlchemyProvider(
  "matic",
  ALCHEMY_POLYGON_API_KEY
);

const signer = new ethers.Wallet(PRIV_KEY, provider);

const defiLlamaChainTVLData = async () => {
  const [chainData] = await Promise.all([
    await axios.get(
      `https://api.llama.fi/chains
        `
    ),
  ]);

  let newChainData = chainData["data"];

  const getChainTVL = (chainName, data) => {
    for (let i = 0; i < data.length; i++) {
      let tempData = data[i];
      if (tempData["name"] === chainName) {
        return tempData["tvl"];
      } else {
        continue;
      }
    }
  };

  let chainTVL = {};

  chainTVL["Ethereum"] = getChainTVL("ETH", newChainData);
  chainTVL["OptimismTVL"] = getChainTVL("Optimism", newChainData);

  console.log(optimismTVL);

  return chainData;
};

const bitcoinMcapTvl = async () => {
  const [bitcoinData, lightningNetworkData, omniAssets] = await Promise.all([
    await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    ),
    await axios.get(`https://1ml.com/statistics?json=true`),
    await axios.get(`https://api.omniexplorer.info/v1/properties/list`),
  ]);

  let omniProperties = await omniAssets["data"]["properties"];
  let omniUSDT;
  for (let i = 0; i < omniProperties.length; i++) {
    let omniPropertiesTemp = omniProperties[i];
    if (omniPropertiesTemp["propertyid"] === 31) {
      omniUSDT = parseFloat(omniPropertiesTemp["totaltokens"]);
    }
  }

  let bitcoinMcap = await bitcoinData["data"][0]["market_cap"];
  let lightningNetworkTVL = await lightningNetworkData["data"][
    "networkcapacityusd"
  ];
  console.log(omniUSDT);
};

const polygonTotalTokenValue = async () => {
  // Creates contract object from address and returns
  // supply and ticker in object
  // For EVM forks, i.e. polygon, avalanche, etc. this calculation can somewhat
  // accurately calculate circulating supply of tokens and produce a circulating
  // mcap result. This is because the token contracts on these chains are not the
  // original contracts from Etherum. There will be some outliers, but this should
  // not drastically impact calculation too much.
  const tokenTotalSupply = async (contractAddress, decimal) => {
    let tokenContract = new ethers.Contract(
      contractAddress,
      erc20ABI,
      polygonProvider
    );

    let [tokenSupply, tokenTicker] = await Promise.all([
      parseFloat(
        ethers.utils.formatUnits(await tokenContract.totalSupply(), decimal)
      ),
      tokenContract.symbol(),
    ]);

    let obj = { [tokenTicker]: tokenSupply };
    return obj;
  };

  const tokens = ([
    usdt,
    amusdc,
    amusdt,
    dai,
    wmatic,
    amwmatic,
    amweth,
    polyDoge,
    aave,
    ghst,
    amdai,
    amaave,
    wbtc,
    sand,
    dquick,
    sushi,
    link,
    kom,
    mana,
    trytoken,
    crv,
    gmee,
    uni,
    emon,
    tel,
    qi,
    bal,
    dfyn,
    mimatic,
    usdc,
    weth,
  ] = await Promise.all([
    await tokenTotalSupply("0xc2132D05D31c914a87C6611C10748AEb04B58e8F", 6),
    await tokenTotalSupply("0x1a13F4Ca1d028320A707D99520AbFefca3998b7F", 6),
    await tokenTotalSupply("0x60D55F02A771d515e077c9C2403a1ef324885CeC", 6),
    await tokenTotalSupply("0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", 18),
    await tokenTotalSupply("0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", 18),
    await tokenTotalSupply("0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4", 18),
    await tokenTotalSupply("0x28424507fefb6f7f8E9D3860F56504E4e5f5f390", 18),
    await tokenTotalSupply("0x8A953CfE442c5E8855cc6c61b1293FA648BAE472", 18),
    await tokenTotalSupply("0xD6DF932A45C0f255f85145f286eA0b292B21C90B", 18),
    await tokenTotalSupply("0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7", 18),
    await tokenTotalSupply("0x27F8D03b3a2196956ED754baDc28D73be8830A6e", 18),
    await tokenTotalSupply("0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360", 18),
    await tokenTotalSupply("0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", 8),
    await tokenTotalSupply("0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683", 18),
    await tokenTotalSupply("0xf28164A485B0B2C90639E47b0f377b4a438a16B1", 18),
    await tokenTotalSupply("0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a", 18),
    await tokenTotalSupply("0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", 18),
    await tokenTotalSupply("0xC004e2318722EA2b15499D6375905d75Ee5390B8", 8),
    await tokenTotalSupply("0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4", 18),
    await tokenTotalSupply("0xEFeE2de82343BE622Dcb4E545f75a3b9f50c272D", 18),
    await tokenTotalSupply("0x172370d5Cd63279eFa6d502DAB29171933a610AF", 18),
    await tokenTotalSupply("0xcf32822ff397Ef82425153a9dcb726E5fF61DCA7", 18),
    await tokenTotalSupply("0xb33EaAd8d922B1083446DC23f610c2567fB5180f", 18),
    await tokenTotalSupply("0xd6A5aB46ead26f49b03bBB1F9EB1Ad5c1767974a", 18),
    await tokenTotalSupply("0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32", 2),
    await tokenTotalSupply("0x580A84C73811E1839F75d86d75d88cCa0c241fF4", 18),
    await tokenTotalSupply("0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3", 18),
    await tokenTotalSupply("0xC168E40227E4ebD8C1caE80F7a55a4F0e6D66C97", 18),
    await tokenTotalSupply("0xa3Fa99A148fA48D14Ed51d610c367C61876997F1", 18),
    await tokenTotalSupply("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", 6),
    await tokenTotalSupply("0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", 18),
  ]));

  const allTokens = Object.assign({}, ...tokens);
  console.log(allTokens);
  return allTokens;
};

polygonTotalTokenValue();
