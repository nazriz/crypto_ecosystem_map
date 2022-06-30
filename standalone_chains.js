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

    let [tokenSupply, tokenTicker, coingeckoData] = await Promise.all([
      parseFloat(
        ethers.utils.formatUnits(await tokenContract.totalSupply(), decimal)
      ),
      tokenContract.symbol(),
      await axios.get(
        `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${contractAddress}&vs_currencies=usd`
      ),
    ]);

    let data = await coingeckoData["data"];

    let obj = {};
    let emptyObj = {};

    if (Object.keys(data).length !== 0) {
      let gecko = Object.values(data);
      let geckoPrice = gecko[0]["usd"];
      let tokenValue = tokenSupply * geckoPrice;
      tokenValue = `$${tokenValue}`;
      obj = { [tokenTicker]: tokenValue };
    } else {
      obj = { [tokenTicker]: tokenSupply };
    }

    console.log(obj);

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
    klima,
    o3,
    bwo,
    naka,
    zkp,
    dg,
    rise,
    route,
    gfi,
    ocean,
    kasta,
    mhunt,
    frax,
    cel,
    gns,
    jrt,
    gaj,
    woo,
    usdPlus,
    quick,
    tusd,
    dubi,
    sdo,
    defit,
    chi,
    get,
    pop,
    jchf,
    tidal,
    qwla,
    jpyc,
    lime,
    fxs,
    ioi,
    pay,
    renbtc,
    kitty,
    oorc,
    awx,
    orbs,
    cerby,
    eurs,
    erp,
    aws,
    cher,
    swd,
    snp,
    owl,
    lfi,
    // cxo,
    fin,
    usds,
    gbyte,
    cti,
    spice,
    gm,
    iusds,
    usx,
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
    await tokenTotalSupply("0x4e78011Ce80ee02d2c3e649Fb657E45898257815", 9),
    await tokenTotalSupply("0xEe9801669C6138E84bD50dEB500827b776777d28", 18),
    await tokenTotalSupply("0xC1543024DC71247888a7e139c644F44E75E96d38", 18),
    await tokenTotalSupply("0x311434160D7537be358930def317AfB606C0D737", 18),
    await tokenTotalSupply("0x9A06Db14D639796B25A6ceC6A1bf614fd98815EC", 18),
    await tokenTotalSupply("0xef938b6da8576a896f6E0321ef80996F4890f9c4", 18),
    await tokenTotalSupply("0xC17c30e98541188614dF99239cABD40280810cA3", 18),
    await tokenTotalSupply("0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4", 18),
    await tokenTotalSupply("0x874e178A2f3f3F9d34db862453Cd756E7eAb0381", 18),
    await tokenTotalSupply("0x282d8efCe846A88B159800bd4130ad77443Fa1A1", 18),
    await tokenTotalSupply("0x235737dBb56e8517391473f7c964DB31fA6ef280", 18),
    await tokenTotalSupply("0x61f95bd637e3034133335C1baA0148E518D438ad", 18),
    await tokenTotalSupply("0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89", 18),
    await tokenTotalSupply("0xD85d1e945766Fea5Eda9103F918Bd915FbCa63E6", 4),
    await tokenTotalSupply("0xE5417Af564e4bFDA1c483642db72007871397896", 18),
    await tokenTotalSupply("0x596eBE76e2DB4470966ea395B0d063aC6197A8C5", 18),
    await tokenTotalSupply("0xF4B0903774532AEe5ee567C02aaB681a81539e92", 18),
    await tokenTotalSupply("0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603", 18),
    await tokenTotalSupply("0x236eeC6359fb44CCe8f97E99387aa7F8cd5cdE1f", 6),
    await tokenTotalSupply("0xB5C064F955D8e7F38fE0460C556a72987494eE17", 18),
    await tokenTotalSupply("0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756", 18),
    await tokenTotalSupply("0x950e1561B7A7dEB1A32A6419FD435410daf851B0", 18),
    await tokenTotalSupply("0x66C59Dded4EF01a3412a8B019B6e41D4a8C49A35", 18),
    await tokenTotalSupply("0x428360b02C1269bc1c79fbC399ad31d58C1E8fdA", 18),
    await tokenTotalSupply("0x0000000000004946c0e9F43F4Dee607b0eF1fA1c", 0),
    await tokenTotalSupply("0xdb725f82818De83e99F1dAc22A9b5B51d3d04DD4", 18),
    await tokenTotalSupply("0xC5B57e9a1E7914FDA753A88f24E5703e617Ee50c", 18),
    await tokenTotalSupply("0xbD1463F02f61676d53fd183C2B19282BFF93D099", 18),
    await tokenTotalSupply("0xB41EC2c036f8a42DA384DDE6ADA79884F8b84b26", 18),
    await tokenTotalSupply("0x4FAfad147c8Cd0e52f83830484d164e960BdC6C3", 18),
    await tokenTotalSupply("0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB", 18),
    await tokenTotalSupply("0x7f67639Ffc8C93dD558d452b8920b28815638c44", 18),
    await tokenTotalSupply("0x1a3acf6D19267E2d3e7f898f42803e90C9219062", 18),
    await tokenTotalSupply("0xAF24765F631C8830B5528B57002241eE7eef1C14", 18),
    await tokenTotalSupply("0xe580074A10360404AF3ABfe2d524D5806D993ea3", 18),
    await tokenTotalSupply("0xDBf31dF14B66535aF65AaC99C32e9eA844e14501", 8),
    await tokenTotalSupply("0x182dB1252C39073eeC9d743F13b5eeb80FDE314e", 18),
    await tokenTotalSupply("0x12c9FFE6538f20A982FD4D17912f0ca00fA82D30", 18),
    await tokenTotalSupply("0x56A0eFEFC9F1FBb54FBd25629Ac2aA764F1b56F7", 18),
    await tokenTotalSupply("0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff", 18),
    await tokenTotalSupply("0xdef1fac7Bf08f173D286BbBDcBeeADe695129840", 18),
    await tokenTotalSupply("0xE111178A87A3BFf0c8d18DECBa5798827539Ae99", 2),
    await tokenTotalSupply("0x28accA4ed2F6186c3D93e20e29e6e6a9Af656341", 18),
    await tokenTotalSupply("0xA96D47c621a8316d4F9539E3B38180C7067e84CA", 18),
    await tokenTotalSupply("0x8f36Cc333F55B09Bb71091409A3d7ADE399e3b1C", 18),
    await tokenTotalSupply("0xaeE24d5296444c007a532696aaDa9dE5cE6caFD0", 18),
    await tokenTotalSupply("0x6911F552842236bd9E8ea8DDBB3fb414e2C5FA9d", 18),
    await tokenTotalSupply("0x9085B4d52c3e0B8B6F9AF6213E85A433c7D76f19", 18),
    await tokenTotalSupply("0xCa7BF3C514d412AC12D10Eff302301A81153F557", 18),
    // await tokenTotalSupply("0xf2ae0038696774d65E67892c9D301C5f2CbbDa58", 18),
    await tokenTotalSupply("0x576c990A8a3E7217122e9973b2230A3be9678E94", 18),
    await tokenTotalSupply("0x2f1b1662A895C6Ba01a99DcAf56778E7d77e5609", 18),
    await tokenTotalSupply("0xAB5F7a0e20b0d056Aed4Aa4528C78da45BE7308b", 18),
    await tokenTotalSupply("0x8Ba941b64901E306667a287A370F145d98811096", 18),
    await tokenTotalSupply("0x66e8617d1Df7ab523a316a6c01D16Aa5beD93681", 18),
    await tokenTotalSupply("0x6a335AC6A3cdf444967Fe03E7b6B273c86043990", 8),
    await tokenTotalSupply("0x66F31345Cb9477B427A1036D43f923a557C432A4", 18),
    await tokenTotalSupply("0xCf66EB3D546F0415b368d98A95EAF56DeD7aA752", 18),
  ]));

  const allTokens = Object.assign({}, ...tokens);
  console.log(allTokens);
  return allTokens;
};

// polygonTokenPriceFeed = async () => {
//   getCoingeckoPrice = async (contractAddress) => {

//     // let data = await axios.get(
//     //   `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
//     // );

//     // priceFeeds["xDVF"] = parseFloat(dvf["data"]["dvf"]["usd"]);
//   };

// };

// polygonTotalTokenValue();

let tickerAddressObj = {};

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

  tickerAddressObj[[tokenTicker]] = contractAddress;
  //   console.log(tickerAddressObj);

  let array = [];

  array = [tokenTicker, tokenSupply, contractAddress];

  return array;
};

let temp = tokenTotalSupply("0xc2132D05D31c914a87C6611C10748AEb04B58e8F", 6);

test = async () => {
  //   let temp = await tickerAddressObj;
  let test = await temp;

  console.log(await test[0]);
  let testObj = {};
  testObj[test[0]] = test[2];
  console.log(testObj);
};

test();

// let testArray = ["ETH", 1000, "0x00000"];

// let newObj = {};

// newObj[testArray[0]] = testArray[2];

// console.log(newObj);
