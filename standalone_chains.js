const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const erc20ABI = require("./ABI/erc20_abi.json");
const { PassThrough } = require("stream");
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const ALCHEMY_POLYGON_API_KEY = process.env.ALCHEMY_POLYGON_API_KEY;
const MORALIS_AVALANCHE = process.env.MORALIS_AVALANCHE;
const MORALIS_ARBITRUM = process.env.MORALIS_ARBITRUM;
const ALCHEMY_OPTIMISM_API_KEY = process.env.ALCHEMY_OPTIMISM_API_KEY;

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

const polygonProvider = new ethers.providers.AlchemyProvider("matic", ALCHEMY_POLYGON_API_KEY);
const optimismProvider = new ethers.providers.AlchemyProvider("optimism", ALCHEMY_OPTIMISM_API_KEY);

const avalancheProvider = new ethers.providers.JsonRpcProvider(MORALIS_AVALANCHE);
const arbitrumProvider = new ethers.providers.JsonRpcProvider(MORALIS_ARBITRUM);

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
  let lightningNetworkTVL = await lightningNetworkData["data"]["networkcapacityusd"];
  console.log(omniUSDT);
};

// Creates contract object from address and returns
// supply and ticker in object
// For EVM forks, i.e. polygon, avalanche, etc. this calculation can somewhat
// accurately calculate circulating supply of tokens and produce a circulating
// mcap result. This is because the token contracts on these chains are not the
// original contracts from Etherum. There will be some outliers, but this should
// not drastically impact calculation too much.
const tokenTotalSupply = async (chainProvider, contractAddress, decimal) => {
  let tokenContract = new ethers.Contract(contractAddress, erc20ABI, chainProvider);

  let [tokenSupply, tokenTicker] = await Promise.all([
    parseFloat(ethers.utils.formatUnits(await tokenContract.totalSupply(), decimal)),
    tokenContract.symbol(),
  ]);

  let tickerAddressObj = {};
  tickerAddressObj[[tokenTicker]] = contractAddress;
  //   console.log(tickerAddressObj);

  let array = [];

  array = [tokenTicker, tokenSupply, contractAddress];

  return array;
};

const polygonTotalTokenValue = async () => {
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
    cxo,
    fin,
    usds,
    gbyte,
    cti,
    spice,
    gm,
    iusds,
    usx,
  ] = await Promise.all([
    await tokenTotalSupply(polygonProvider, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", 6),
    await tokenTotalSupply(polygonProvider, "0x1a13F4Ca1d028320A707D99520AbFefca3998b7F", 6),
    await tokenTotalSupply(polygonProvider, "0x60D55F02A771d515e077c9C2403a1ef324885CeC", 6),
    await tokenTotalSupply(polygonProvider, "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", 18),
    await tokenTotalSupply(polygonProvider, "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", 18),
    await tokenTotalSupply(polygonProvider, "0x8dF3aad3a84da6b69A4DA8aeC3eA40d9091B2Ac4", 18),
    await tokenTotalSupply(polygonProvider, "0x28424507fefb6f7f8E9D3860F56504E4e5f5f390", 18),
    await tokenTotalSupply(polygonProvider, "0x8A953CfE442c5E8855cc6c61b1293FA648BAE472", 18),
    await tokenTotalSupply(polygonProvider, "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", 18),
    await tokenTotalSupply(polygonProvider, "0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7", 18),
    await tokenTotalSupply(polygonProvider, "0x27F8D03b3a2196956ED754baDc28D73be8830A6e", 18),
    await tokenTotalSupply(polygonProvider, "0x1d2a0E5EC8E5bBDCA5CB219e649B565d8e5c3360", 18),
    await tokenTotalSupply(polygonProvider, "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", 8),
    await tokenTotalSupply(polygonProvider, "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683", 18),
    await tokenTotalSupply(polygonProvider, "0xf28164A485B0B2C90639E47b0f377b4a438a16B1", 18),
    await tokenTotalSupply(polygonProvider, "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a", 18),
    await tokenTotalSupply(polygonProvider, "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39", 18),
    await tokenTotalSupply(polygonProvider, "0xC004e2318722EA2b15499D6375905d75Ee5390B8", 8),
    await tokenTotalSupply(polygonProvider, "0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4", 18),
    await tokenTotalSupply(polygonProvider, "0xEFeE2de82343BE622Dcb4E545f75a3b9f50c272D", 18),
    await tokenTotalSupply(polygonProvider, "0x172370d5Cd63279eFa6d502DAB29171933a610AF", 18),
    await tokenTotalSupply(polygonProvider, "0xcf32822ff397Ef82425153a9dcb726E5fF61DCA7", 18),
    await tokenTotalSupply(polygonProvider, "0xb33EaAd8d922B1083446DC23f610c2567fB5180f", 18),
    await tokenTotalSupply(polygonProvider, "0xd6A5aB46ead26f49b03bBB1F9EB1Ad5c1767974a", 18),
    await tokenTotalSupply(polygonProvider, "0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32", 2),
    await tokenTotalSupply(polygonProvider, "0x580A84C73811E1839F75d86d75d88cCa0c241fF4", 18),
    await tokenTotalSupply(polygonProvider, "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3", 18),
    await tokenTotalSupply(polygonProvider, "0xC168E40227E4ebD8C1caE80F7a55a4F0e6D66C97", 18),
    await tokenTotalSupply(polygonProvider, "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1", 18),
    await tokenTotalSupply(polygonProvider, "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", 6),
    await tokenTotalSupply(polygonProvider, "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", 18),
    await tokenTotalSupply(polygonProvider, "0x4e78011Ce80ee02d2c3e649Fb657E45898257815", 9),
    await tokenTotalSupply(polygonProvider, "0xEe9801669C6138E84bD50dEB500827b776777d28", 18),
    await tokenTotalSupply(polygonProvider, "0xC1543024DC71247888a7e139c644F44E75E96d38", 18),
    await tokenTotalSupply(polygonProvider, "0x311434160D7537be358930def317AfB606C0D737", 18),
    await tokenTotalSupply(polygonProvider, "0x9A06Db14D639796B25A6ceC6A1bf614fd98815EC", 18),
    await tokenTotalSupply(polygonProvider, "0xef938b6da8576a896f6E0321ef80996F4890f9c4", 18),
    await tokenTotalSupply(polygonProvider, "0xC17c30e98541188614dF99239cABD40280810cA3", 18),
    await tokenTotalSupply(polygonProvider, "0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4", 18),
    await tokenTotalSupply(polygonProvider, "0x874e178A2f3f3F9d34db862453Cd756E7eAb0381", 18),
    await tokenTotalSupply(polygonProvider, "0x282d8efCe846A88B159800bd4130ad77443Fa1A1", 18),
    await tokenTotalSupply(polygonProvider, "0x235737dBb56e8517391473f7c964DB31fA6ef280", 18),
    await tokenTotalSupply(polygonProvider, "0x61f95bd637e3034133335C1baA0148E518D438ad", 18),
    await tokenTotalSupply(polygonProvider, "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89", 18),
    await tokenTotalSupply(polygonProvider, "0xD85d1e945766Fea5Eda9103F918Bd915FbCa63E6", 4),
    await tokenTotalSupply(polygonProvider, "0xE5417Af564e4bFDA1c483642db72007871397896", 18),
    await tokenTotalSupply(polygonProvider, "0x596eBE76e2DB4470966ea395B0d063aC6197A8C5", 18),
    await tokenTotalSupply(polygonProvider, "0xF4B0903774532AEe5ee567C02aaB681a81539e92", 18),
    await tokenTotalSupply(polygonProvider, "0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603", 18),
    await tokenTotalSupply(polygonProvider, "0x236eeC6359fb44CCe8f97E99387aa7F8cd5cdE1f", 6),
    await tokenTotalSupply(polygonProvider, "0xB5C064F955D8e7F38fE0460C556a72987494eE17", 18),
    await tokenTotalSupply(polygonProvider, "0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756", 18),
    await tokenTotalSupply(polygonProvider, "0x950e1561B7A7dEB1A32A6419FD435410daf851B0", 18),
    await tokenTotalSupply(polygonProvider, "0x66C59Dded4EF01a3412a8B019B6e41D4a8C49A35", 18),
    await tokenTotalSupply(polygonProvider, "0x428360b02C1269bc1c79fbC399ad31d58C1E8fdA", 18),
    await tokenTotalSupply(polygonProvider, "0x0000000000004946c0e9F43F4Dee607b0eF1fA1c", 0),
    await tokenTotalSupply(polygonProvider, "0xdb725f82818De83e99F1dAc22A9b5B51d3d04DD4", 18),
    await tokenTotalSupply(polygonProvider, "0xC5B57e9a1E7914FDA753A88f24E5703e617Ee50c", 18),
    await tokenTotalSupply(polygonProvider, "0xbD1463F02f61676d53fd183C2B19282BFF93D099", 18),
    await tokenTotalSupply(polygonProvider, "0xB41EC2c036f8a42DA384DDE6ADA79884F8b84b26", 18),
    await tokenTotalSupply(polygonProvider, "0x4FAfad147c8Cd0e52f83830484d164e960BdC6C3", 18),
    await tokenTotalSupply(polygonProvider, "0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB", 18),
    await tokenTotalSupply(polygonProvider, "0x7f67639Ffc8C93dD558d452b8920b28815638c44", 18),
    await tokenTotalSupply(polygonProvider, "0x1a3acf6D19267E2d3e7f898f42803e90C9219062", 18),
    await tokenTotalSupply(polygonProvider, "0xAF24765F631C8830B5528B57002241eE7eef1C14", 18),
    await tokenTotalSupply(polygonProvider, "0xe580074A10360404AF3ABfe2d524D5806D993ea3", 18),
    await tokenTotalSupply(polygonProvider, "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501", 8),
    await tokenTotalSupply(polygonProvider, "0x182dB1252C39073eeC9d743F13b5eeb80FDE314e", 18),
    await tokenTotalSupply(polygonProvider, "0x12c9FFE6538f20A982FD4D17912f0ca00fA82D30", 18),
    await tokenTotalSupply(polygonProvider, "0x56A0eFEFC9F1FBb54FBd25629Ac2aA764F1b56F7", 18),
    await tokenTotalSupply(polygonProvider, "0x614389EaAE0A6821DC49062D56BDA3d9d45Fa2ff", 18),
    await tokenTotalSupply(polygonProvider, "0xdef1fac7Bf08f173D286BbBDcBeeADe695129840", 18),
    await tokenTotalSupply(polygonProvider, "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99", 2),
    await tokenTotalSupply(polygonProvider, "0x28accA4ed2F6186c3D93e20e29e6e6a9Af656341", 18),
    await tokenTotalSupply(polygonProvider, "0xA96D47c621a8316d4F9539E3B38180C7067e84CA", 18),
    await tokenTotalSupply(polygonProvider, "0x8f36Cc333F55B09Bb71091409A3d7ADE399e3b1C", 18),
    await tokenTotalSupply(polygonProvider, "0xaeE24d5296444c007a532696aaDa9dE5cE6caFD0", 18),
    await tokenTotalSupply(polygonProvider, "0x6911F552842236bd9E8ea8DDBB3fb414e2C5FA9d", 18),
    await tokenTotalSupply(polygonProvider, "0x9085B4d52c3e0B8B6F9AF6213E85A433c7D76f19", 18),
    await tokenTotalSupply(polygonProvider, "0xCa7BF3C514d412AC12D10Eff302301A81153F557", 18),
    await tokenTotalSupply(polygonProvider, "0xf2ae0038696774d65E67892c9D301C5f2CbbDa58", 18),
    await tokenTotalSupply(polygonProvider, "0x576c990A8a3E7217122e9973b2230A3be9678E94", 18),
    await tokenTotalSupply(polygonProvider, "0x2f1b1662A895C6Ba01a99DcAf56778E7d77e5609", 18),
    await tokenTotalSupply(polygonProvider, "0xAB5F7a0e20b0d056Aed4Aa4528C78da45BE7308b", 18),
    await tokenTotalSupply(polygonProvider, "0x8Ba941b64901E306667a287A370F145d98811096", 18),
    await tokenTotalSupply(polygonProvider, "0x66e8617d1Df7ab523a316a6c01D16Aa5beD93681", 18),
    await tokenTotalSupply(polygonProvider, "0x6a335AC6A3cdf444967Fe03E7b6B273c86043990", 8),
    await tokenTotalSupply(polygonProvider, "0x66F31345Cb9477B427A1036D43f923a557C432A4", 18),
    await tokenTotalSupply(polygonProvider, "0xCf66EB3D546F0415b368d98A95EAF56DeD7aA752", 18),
  ]));

  //   const allTokens = Object.assign({}, ...tokens);
  //   console.log(allTokens);
  //   console.log(tokens);
  return tokens;
};

let fileData = fs.readFileSync("eth_circulating_token_supply_data.json");
let circSupplyData = JSON.parse(fileData);
const ethTokenTotalSupply = async (chainProvider, circSupplyFile, contractAddress, decimal) => {
  let tokenContract = new ethers.Contract(contractAddress, erc20ABI, chainProvider);

  let [tokenSupply, tokenTicker] = await Promise.all([
    parseFloat(ethers.utils.formatUnits(await tokenContract.totalSupply(), decimal)),
    tokenContract.symbol(),
  ]);

  //   console.log(tokenSupply);
  let tickerAddressObj = {};
  tickerAddressObj[[tokenTicker]] = contractAddress;
  //   console.log(tickerAddressObj);

  if (!(tokenTicker in circSupplyFile)) {
    let tickerLower = tokenTicker.toLowerCase();
    try {
      let data = await axios.get(`https://data.messari.io/api/v1/assets/${tickerLower}/metrics`);
      let circSupply = data["data"]["data"]["supply"]["circulating"];
      if (circSupply != null) {
        tokenSupply = circSupply;
        circSupplyFile[tokenTicker] = tokenSupply;
        let dataToWrite = JSON.stringify(circSupplyFile);
        fs.writeFileSync("eth_circulating_token_supply_data.json", dataToWrite);
      }
    } catch (error) {
      tokenSupply = tokenSupply;
    }
  } else {
    tokenSupply = parseFloat(circSupplyFile[tokenTicker]);
  }

  let array = [];

  array = [tokenTicker, tokenSupply, contractAddress];
  return array;
};

const getPrices = async (networkId, array) => {
  let tickerSupply = {};
  let tickerAddress = {};
  for (let i = 0; i < array.length; i++) {
    temp = array[i];
    tickerSupply[temp[0]] = temp[1];
    tickerAddress[temp[0]] = temp[2];
  }

  let payload = "";
  for (const [key1, value1] of Object.entries(tickerAddress)) {
    payload += value1 + ",";
  }

  let geckoData = await axios.get(
    `https://api.coingecko.com/api/v3/simple/token_price/${networkId}?contract_addresses=${payload}&vs_currencies=usd`
  );

  let geckoPriceOutput = geckoData["data"];

  let tickerPrice = {};

  for (const [xkey1, xvalue1] of Object.entries(geckoPriceOutput)) {
    for (const [xkey2, xvalue2] of Object.entries(tickerAddress)) {
      if (xkey1 === xvalue2.toLowerCase()) {
        let temp = geckoPriceOutput[xkey1];
        let price = temp["usd"];
        tickerPrice[xkey2] = price;
      }
    }
  }

  //   console.log(tickerPrice);

  // make final calculation
  // This excludes tokens that do not return a coingecko price
  let totalWithPrices = {};
  for (const [ykey1, yvalue1] of Object.entries(tickerSupply)) {
    for (const [ykey2, yvalue2] of Object.entries(tickerPrice)) {
      if (ykey1 === ykey2) {
        let amount = yvalue1 * yvalue2;
        // totalWithPrices[ykey1] = `$${amount}`;
        totalWithPrices[ykey1] = amount;
      }
    }
  }

  console.log(totalWithPrices);

  // Calculate grand total
  let grandTotal = 0;
  for (const [jkey1, jvalue2] of Object.entries(totalWithPrices)) {
    grandTotal += jvalue2;
  }

  console.log(grandTotal);
};

// not including wavax
const avalancheTokenTotalValue = async () => {
  const tokens = ([
    usdte,
    usdt,
    usdc,
    usdce,
    busde,
    daie,
    shibe,
    wbtce,
    unie,
    linke,
    frax,
    tusd,
    mkre,
    aavee,
    grte,
    bate,
    oneinche,
    compe,
    zrx,
    crve,
    snxe,
    yfie,
    knc,
    sushie,
    orbs,
    spell,
    fxs,
    sure,
    xjoe,
    joe,
    alphae,
    rise,
    bifi,
    wxt,
    swape,
    walbt,
    insur,
    pendle,
    ooe,
    dyp,
    qi,
    png,
    uncl,
    acre,
    oddz,
    klo,
    ime,
    vso,
    tus,
    shibx,
    melt,
    boofi,
    snob,
    more,
    avxt,
    btcb,
    yak,
    wshare,
    time,
    piggy,
    wlrs,
    mim,
    h2o,
    xava,
    syn,
    xptp,
    elk,
    cly,
    tryb,
    pefi,
    hon,
    teddy,
    hct,
    jpeg,
    bpt,
    cnr,
    vee,
    orbit,
    blzz,
    smrt,
    tractor,
    smrtr,
    husky,
    alpha,
  ] = await Promise.all([
    await tokenTotalSupply(avalancheProvider, "0xc7198437980c041c805A1EDcbA50c1Ce5db95118", 6),
    await tokenTotalSupply(avalancheProvider, "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 6),
    await tokenTotalSupply(avalancheProvider, "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", 6),
    await tokenTotalSupply(avalancheProvider, "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664", 6),
    await tokenTotalSupply(avalancheProvider, "0x19860CCB0A68fd4213aB9D8266F7bBf05A8dDe98", 18),
    await tokenTotalSupply(avalancheProvider, "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70", 18),
    await tokenTotalSupply(avalancheProvider, "0x02D980A0D7AF3fb7Cf7Df8cB35d9eDBCF355f665", 18),
    await tokenTotalSupply(avalancheProvider, "0x50b7545627a5162F82A992c33b87aDc75187B218", 8),
    await tokenTotalSupply(avalancheProvider, "0x8eBAf22B6F053dFFeaf46f4Dd9eFA95D89ba8580", 18),
    await tokenTotalSupply(avalancheProvider, "0x5947BB275c521040051D82396192181b413227A3", 18),
    await tokenTotalSupply(avalancheProvider, "0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64", 18),
    await tokenTotalSupply(avalancheProvider, "0x1C20E891Bab6b1727d14Da358FAe2984Ed9B59EB", 18),
    await tokenTotalSupply(avalancheProvider, "0x88128fd4b259552A9A1D457f435a6527AAb72d42", 18),
    await tokenTotalSupply(avalancheProvider, "0x63a72806098Bd3D9520cC43356dD78afe5D386D9", 18),
    await tokenTotalSupply(avalancheProvider, "0x8a0cAc13c7da965a312f08ea4229c37869e85cB9", 18),
    await tokenTotalSupply(avalancheProvider, "0x98443B96EA4b0858FDF3219Cd13e98C7A4690588", 18),
    await tokenTotalSupply(avalancheProvider, "0xd501281565bf7789224523144Fe5D98e8B28f267", 18),
    await tokenTotalSupply(avalancheProvider, "0xc3048E19E76CB9a3Aa9d77D8C03c29Fc906e2437", 18),
    await tokenTotalSupply(avalancheProvider, "0x596fA47043f99A4e0F122243B841E55375cdE0d2", 18),
    await tokenTotalSupply(avalancheProvider, "0x249848BeCA43aC405b8102Ec90Dd5F22CA513c06", 18),
    await tokenTotalSupply(avalancheProvider, "0xBeC243C995409E6520D7C41E404da5dEba4b209B", 18),
    await tokenTotalSupply(avalancheProvider, "0x9eAaC1B23d935365bD7b542Fe22cEEe2922f52dc", 18),
    await tokenTotalSupply(avalancheProvider, "0x39fC9e94Caeacb435842FADeDeCB783589F50f5f", 18),
    await tokenTotalSupply(avalancheProvider, "0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76", 18),
    await tokenTotalSupply(avalancheProvider, "0x340fE1D898ECCAad394e2ba0fC1F93d27c7b717A", 18),
    await tokenTotalSupply(avalancheProvider, "0xCE1bFFBD5374Dac86a2893119683F4911a2F7814", 18),
    await tokenTotalSupply(avalancheProvider, "0x214DB107654fF987AD859F34125307783fC8e387", 18),
    await tokenTotalSupply(avalancheProvider, "0x5fC17416925789E0852FBFcd81c490ca4abc51F9", 18),
    await tokenTotalSupply(avalancheProvider, "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", 18),
    await tokenTotalSupply(avalancheProvider, "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", 18),
    await tokenTotalSupply(avalancheProvider, "0x2147EFFF675e4A4eE1C2f918d181cDBd7a8E208f", 18),
    await tokenTotalSupply(avalancheProvider, "0xC17c30e98541188614dF99239cABD40280810cA3", 18),
    await tokenTotalSupply(avalancheProvider, "0xd6070ae98b8069de6B494332d1A1a81B6179D960", 18),
    await tokenTotalSupply(avalancheProvider, "0xfcDe4A87b8b6FA58326BB462882f1778158B02F1", 18),
    await tokenTotalSupply(avalancheProvider, "0xc7B5D72C836e718cDA8888eaf03707fAef675079", 18),
    await tokenTotalSupply(avalancheProvider, "0x9E037dE681CaFA6E661e6108eD9c2bd1AA567Ecd", 18),
    await tokenTotalSupply(avalancheProvider, "0x544c42fBB96B39B21DF61cf322b5EDC285EE7429", 18),
    await tokenTotalSupply(avalancheProvider, "0xfB98B335551a418cD0737375a2ea0ded62Ea213b", 18),
    await tokenTotalSupply(avalancheProvider, "0x0ebd9537A25f56713E34c45b38F421A1e7191469", 18),
    await tokenTotalSupply(avalancheProvider, "0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17", 18),
    await tokenTotalSupply(avalancheProvider, "0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5", 18),
    await tokenTotalSupply(avalancheProvider, "0x60781C2586D68229fde47564546784ab3fACA982", 18),
    await tokenTotalSupply(avalancheProvider, "0x7D86F1eafF29F076576b2Ff09CE3bcC7533fD2C5", 18),
    await tokenTotalSupply(avalancheProvider, "0x00EE200Df31b869a321B10400Da10b561F3ee60d", 18),
    await tokenTotalSupply(avalancheProvider, "0xB0a6e056B587D0a85640b39b1cB44086F7a26A1E", 18),
    await tokenTotalSupply(avalancheProvider, "0xb27c8941a7Df8958A1778c0259f76D1F8B711C35", 18),
    await tokenTotalSupply(avalancheProvider, "0xF891214fdcF9cDaa5fdC42369eE4F27F226AdaD6", 18),
    await tokenTotalSupply(avalancheProvider, "0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a", 18),
    await tokenTotalSupply(avalancheProvider, "0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172", 18),
    await tokenTotalSupply(avalancheProvider, "0x440aBbf18c54b2782A4917b80a1746d3A2c2Cce1", 18),
    await tokenTotalSupply(avalancheProvider, "0x47EB6F7525C1aA999FBC9ee92715F5231eB1241D", 18),
    await tokenTotalSupply(avalancheProvider, "0xB00F1ad977a949a3CCc389Ca1D1282A2946963b0", 18),
    await tokenTotalSupply(avalancheProvider, "0xC38f41A296A4493Ff429F1238e030924A1542e50", 18),
    await tokenTotalSupply(avalancheProvider, "0xd9D90f882CDdD6063959A9d837B05Cb748718A05", 18),
    await tokenTotalSupply(avalancheProvider, "0x397bBd6A0E41bdF4C3F971731E180Db8Ad06eBc1", 6),
    await tokenTotalSupply(avalancheProvider, "0x152b9d0FdC40C096757F570A51E494bd4b943E50", 8),
    await tokenTotalSupply(avalancheProvider, "0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7", 18),
    await tokenTotalSupply(avalancheProvider, "0xe6d1aFea0B76C8f51024683DD27FA446dDAF34B6", 18),
    await tokenTotalSupply(avalancheProvider, "0xb54f16fB19478766A268F172C9480f8da1a7c9C3", 9),
    await tokenTotalSupply(avalancheProvider, "0x1a877B68bdA77d78EEa607443CcDE667B31B0CdF", 18),
    await tokenTotalSupply(avalancheProvider, "0x395908aeb53d33A9B8ac35e148E9805D34A555D3", 18),
    await tokenTotalSupply(avalancheProvider, "0x130966628846BFd36ff31a822705796e8cb8C18D", 18),
    await tokenTotalSupply(avalancheProvider, "0x026187BdbC6b751003517bcb30Ac7817D5B766f8", 18),
    await tokenTotalSupply(avalancheProvider, "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4", 18),
    await tokenTotalSupply(avalancheProvider, "0x1f1E7c893855525b303f99bDF5c3c05Be09ca251", 18),
    await tokenTotalSupply(avalancheProvider, "0x060556209E507d30f2167a101bFC6D256Ed2f3e1", 18),
    await tokenTotalSupply(avalancheProvider, "0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C", 18),
    await tokenTotalSupply(avalancheProvider, "0xec3492a2508DDf4FDc0cD76F31f340b30d1793e6", 18),
    await tokenTotalSupply(avalancheProvider, "0x564A341Df6C126f90cf3ECB92120FD7190ACb401", 6),
    await tokenTotalSupply(avalancheProvider, "0xe896CDeaAC9615145c0cA09C8Cd5C25bced6384c", 18),
    await tokenTotalSupply(avalancheProvider, "0xEd2b42D3C9c6E97e11755BB37df29B6375ede3EB", 18),
    await tokenTotalSupply(avalancheProvider, "0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC", 18),
    await tokenTotalSupply(avalancheProvider, "0x45C13620B55C35A5f539d26E88247011Eb10fDbd", 18),
    await tokenTotalSupply(avalancheProvider, "0x6241af3817Db48a7F9E19FD9446d78E50936d275", 18),
    await tokenTotalSupply(avalancheProvider, "0x1111111111182587795eF1098ac7da81a108C97a", 18),
    await tokenTotalSupply(avalancheProvider, "0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf", 18),
    await tokenTotalSupply(avalancheProvider, "0x3709E8615E02C15B096f8a9B460ccb8cA8194e86", 18),
    await tokenTotalSupply(avalancheProvider, "0x4bf5cd1AC6FfF12E88AEDD3c70EB4148F90F8894", 18),
    await tokenTotalSupply(avalancheProvider, "0x0f34919404a290e71fc6A510cB4a6aCb8D764b24", 18),
    await tokenTotalSupply(avalancheProvider, "0xCC2f1d827b18321254223dF4e84dE399D9Ff116c", 18),
    await tokenTotalSupply(avalancheProvider, "0x542fA0B261503333B90fE60c78F2BeeD16b7b7fD", 9),
    await tokenTotalSupply(avalancheProvider, "0x6D923f688C7FF287dc3A5943CAeefc994F97b290", 18),
    await tokenTotalSupply(avalancheProvider, "0x65378b697853568dA9ff8EaB60C13E1Ee9f4a654", 18),
    await tokenTotalSupply(avalancheProvider, "0x325a98F258a5732c7b06555603F6aF5BC1C17F0a", 9),
  ]));

  //   console.log(tokens);

  return tokens;
};

const arbitrumTokenTotalValue = async () => {
  const tokens = ([
    usdt,
    usdc,
    dai,
    wbtc,
    link,
    uni,
    frax,
    tusd,
    grt,
    lrc,
    fxs,
    comp,
    gno,
    crv,
    sushi,
    mim,
    yfi,
    uma,
    bal,
    gmx,
    syn,
    susd,
    coti,
    spell,
    celr,
    rgt,
    perp,
    dodo,
    dvf,
    badger,
    ubt,
    math,
    lon,
    df,
    govi,
    mcb,
    cap,
    pickle,
    oxbtc,
    hnd,
    strps,
    ndx,
    alch,
    forex,
    flux,
    weth,
    dpx,
    rdpx,
    fuidfi,
    imx,
    nyan,
    zipt,
    dxd,
    ppegg,
    umami,
  ] = await Promise.all([
    await tokenTotalSupply(arbitrumProvider, "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", 6),
    await tokenTotalSupply(arbitrumProvider, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", 6),
    await tokenTotalSupply(arbitrumProvider, "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", 18),
    await tokenTotalSupply(arbitrumProvider, "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", 8),
    await tokenTotalSupply(arbitrumProvider, "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4", 18),
    await tokenTotalSupply(arbitrumProvider, "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0", 18),
    await tokenTotalSupply(arbitrumProvider, "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F", 18),
    await tokenTotalSupply(arbitrumProvider, "0x4D15a3A2286D883AF0AA1B3f21367843FAc63E07", 18),
    await tokenTotalSupply(arbitrumProvider, "0x23A941036Ae778Ac51Ab04CEa08Ed6e2FE103614", 18),
    await tokenTotalSupply(arbitrumProvider, "0x46d0cE7de6247b0A95f67b43B589b4041BaE7fbE", 18),
    await tokenTotalSupply(arbitrumProvider, "0x9d2F299715D94d8A7E6F5eaa8E654E8c74a988A7", 18),
    await tokenTotalSupply(arbitrumProvider, "0x354A6dA3fcde098F8389cad84b0182725c6C91dE", 18),
    await tokenTotalSupply(arbitrumProvider, "0xa0b862F60edEf4452F25B4160F177db44DeB6Cf1", 18),
    await tokenTotalSupply(arbitrumProvider, "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978", 18),
    await tokenTotalSupply(arbitrumProvider, "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A", 18),
    await tokenTotalSupply(arbitrumProvider, "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A", 18),
    await tokenTotalSupply(arbitrumProvider, "0x82e3A8F066a6989666b031d916c43672085b1582", 18),
    await tokenTotalSupply(arbitrumProvider, "0xd693Ec944A85eeca4247eC1c3b130DCa9B0C3b22", 18),
    await tokenTotalSupply(arbitrumProvider, "0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8", 18),
    await tokenTotalSupply(arbitrumProvider, "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a", 18),
    await tokenTotalSupply(arbitrumProvider, "0x080F6AEd32Fc474DD5717105Dba5ea57268F46eb", 18),
    await tokenTotalSupply(arbitrumProvider, "0xA970AF1a584579B618be4d69aD6F73459D112F95", 18),
    await tokenTotalSupply(arbitrumProvider, "0x6FE14d3CC2f7bDdffBa5CdB3BBE7467dd81ea101", 18),
    await tokenTotalSupply(arbitrumProvider, "0x3E6648C5a70A150A88bCE65F4aD4d506Fe15d2AF", 18),
    await tokenTotalSupply(arbitrumProvider, "0x3a8B787f78D775AECFEEa15706D4221B40F345AB", 18),
    await tokenTotalSupply(arbitrumProvider, "0xef888bcA6AB6B1d26dbeC977C455388ecd794794", 18),
    await tokenTotalSupply(arbitrumProvider, "0x753D224bCf9AAFaCD81558c32341416df61D3DAC", 18),
    await tokenTotalSupply(arbitrumProvider, "0x69Eb4FA4a2fbd498C257C57Ea8b7655a2559A581", 18),
    await tokenTotalSupply(arbitrumProvider, "0xA7Aa2921618e3D63dA433829d448b58C9445A4c3", 18),
    await tokenTotalSupply(arbitrumProvider, "0xBfa641051Ba0a0Ad1b0AcF549a89536A0D76472E", 18),
    await tokenTotalSupply(arbitrumProvider, "0x2aD62674A64E698C24831Faf824973C360430140", 8),
    await tokenTotalSupply(arbitrumProvider, "0x99F40b01BA9C469193B360f72740E416B17Ac332", 18),
    await tokenTotalSupply(arbitrumProvider, "0x55678cd083fcDC2947a0Df635c93C838C89454A3", 18),
    await tokenTotalSupply(arbitrumProvider, "0xaE6aab43C4f3E0cea4Ab83752C278f8dEbabA689", 18),
    await tokenTotalSupply(arbitrumProvider, "0x07E49d5dE43DDA6162Fa28D24d5935C151875283", 18),
    await tokenTotalSupply(arbitrumProvider, "0x4e352cF164E64ADCBad318C3a1e222E9EBa4Ce42", 18),
    await tokenTotalSupply(arbitrumProvider, "0x031d35296154279DC1984dCD93E392b1f946737b", 18),
    await tokenTotalSupply(arbitrumProvider, "0x965772e0E9c84b6f359c8597C891108DcF1c5B1A", 18),
    await tokenTotalSupply(arbitrumProvider, "0x7cb16cb78ea464aD35c8a50ABF95dff3c9e09d5d", 8),
    await tokenTotalSupply(arbitrumProvider, "0x10010078a54396F62c96dF8532dc2B4847d47ED3", 18),
    await tokenTotalSupply(arbitrumProvider, "0x326c33FD1113c1F29B35B4407F3d6312a8518431", 18),
    await tokenTotalSupply(arbitrumProvider, "0xB965029343D55189c25a7f3e0c9394DC0F5D41b1", 18),
    await tokenTotalSupply(arbitrumProvider, "0x0e15258734300290a651FdBAe8dEb039a8E7a2FA", 18),
    await tokenTotalSupply(arbitrumProvider, "0xDb298285FE4C5410B05390cA80e8Fbe9DE1F259B", 18),
    await tokenTotalSupply(arbitrumProvider, "0xF80D589b3Dbe130c270a69F1a69D050f268786Df", 18),
    await tokenTotalSupply(arbitrumProvider, "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", 18),
    await tokenTotalSupply(arbitrumProvider, "0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55", 18),
    await tokenTotalSupply(arbitrumProvider, "0x32Eb7902D4134bf98A28b963D26de779AF92A212", 18),
    await tokenTotalSupply(arbitrumProvider, "0x876Ec6bE52486Eeec06bc06434f3E629D695c6bA", 18),
    await tokenTotalSupply(arbitrumProvider, "0x9c67eE39e3C4954396b9142010653F17257dd39C", 18),
    await tokenTotalSupply(arbitrumProvider, "0xeD3fB761414DA74b74F33e5c5a1f78104b188DfC", 18),
    await tokenTotalSupply(arbitrumProvider, "0x0F61B24272AF65EACF6adFe507028957698e032F", 18),
    await tokenTotalSupply(arbitrumProvider, "0xC3Ae0333F0F34aa734D5493276223d95B8F9Cb37", 18),
    await tokenTotalSupply(arbitrumProvider, "0x78055dAA07035Aa5EBC3e5139C281Ce6312E1b22", 18),
    await tokenTotalSupply(arbitrumProvider, "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3", 18),
  ]));

  //   console.log(tokens);
  return tokens;
};

const optimismTokenTotalValue = async () => {
  const tokens = ([usdt, usdc, dai, wbtc, link, frax, fxs, snx, susd, rgt, seth, sbtc, thales, dcn, slink, roobee] =
    await Promise.all([
      await tokenTotalSupply(optimismProvider, "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", 6),
      await tokenTotalSupply(optimismProvider, "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", 6),
      await tokenTotalSupply(optimismProvider, "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", 18),
      await tokenTotalSupply(optimismProvider, "0x68f180fcCe6836688e9084f035309E29Bf0A2095", 8),
      await tokenTotalSupply(optimismProvider, "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6", 18),
      await tokenTotalSupply(optimismProvider, "0x2E3D870790dC77A83DD1d18184Acc7439A53f475", 18),
      await tokenTotalSupply(optimismProvider, "0x67CCEA5bb16181E7b4109c9c2143c24a1c2205Be", 18),
      await tokenTotalSupply(optimismProvider, "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4", 18),
      await tokenTotalSupply(optimismProvider, "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9", 18),
      await tokenTotalSupply(optimismProvider, "0xB548f63D4405466B36C0c0aC3318a22fDcec711a", 18),
      await tokenTotalSupply(optimismProvider, "0xE405de8F52ba7559f9df3C368500B6E6ae6Cee49", 18),
      await tokenTotalSupply(optimismProvider, "0x298B9B95708152ff6968aafd889c6586e9169f1D", 18),
      await tokenTotalSupply(optimismProvider, "0x217D47011b23BB961eB6D93cA9945B7501a5BB11", 18),
      await tokenTotalSupply(optimismProvider, "0x1da650C3B2DaA8AA9Ff6F661d4156Ce24d08A062", 18),
      await tokenTotalSupply(optimismProvider, "0xc5Db22719A06418028A40A9B5E9A7c02959D0d08", 18),
      await tokenTotalSupply(optimismProvider, "0xb12c13e66AdE1F72f71834f2FC5082Db8C091358", 18),
    ]));

  //   console.log(tokens);
  return tokens;
};

/*Excludes: 
HEX, MKR, SAI
Need to review: 
MIM 0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3
KNC 0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202

*/
const ethereumTokenTotalValue = async () => {
  const tokens = ([
    bnb,
    usdt,
    usdc,
    busd,
    dai,
    shib,
    leo,
    theta,
    wbtc,
    steth,
    matic,
    okb,
    link,
    cro,
    uni,
    xcn,
    frax,
    mana,
    wfil,
    gala,
    tusd,
    cusdc,
    kcs,
    usdp,
    aave,
    btt,
    qnt,
    hbtc,
    usdd,
    grt,
    ht,
    bat,
    ftm,
    ceth,
    snx,
    cdai,
    paxg,
    chz,
    zil,
    lrc,
    enj,
    bit,
    xaut,
    amp,
    wcelo,
    cel,
    nexo,
    oneinch,
    xdce,
    comp,
    ohm,
    gno,
    srm,
    wqtum,
    ldo,
    psafemoon,
    iotx,
    nxm,
    zrx,
    omg,
    iost,
    ceek,
    mco,
    glm,
    lpt,
    one,
    sushi,
    ens,
    wax,
    woo,
    yfi,
    dydx,
    sxp,
    mim,
    chsb,
    mxc,
    rpl,
    apenft,
    uma,
    elon,
    poly,
    gusd,
    bal,
    ogn,
    knc,
    syn,
    rndr,
    rsr,
    pltc,
    eurs,
    orbs,
    snt,
    husd,
    cet,
    fx,
    storj,
    rev,
    nmr,
    chr,
    pundix,
    keep,
    mvl,
    oxt,
    dawn,
    nkn,
    ant,
    aurora,
    susd,
    renbtc,
    powr,
    tel,
    spell,
    augur,
    prom,
    xsgd,
    celr,
    dent,
    auto,
    xyo,
    inj,
    elf,
    mtl,
    fun,
    ilv,
    any,
    zeon,
    medx,
    ocean,
    ewtb,
    rlc,
    trac,
    rbn,
    mask,
    qkc,
    tribe,
    rgt,
    stmx,
    ousd,
    stpt,
    boba,
    aurora,
    ant,
    nkn,
    divx,
    oxt,
    dawn,
    repv2,
    uqc,
    bfc,
    floki,
    alchemy,
    aethc,
    veri,
    tru,
    band,
    kp3r,
    fet,
    aioz,
    ads,
    alpha,
    aergo,
    dusk,
    beta,
    dodo,
    pro,
    idex,
    cocos,
    pond,
    ata,
    musd,
    agix,
    usdk,
    cqt,
    alice,
    pre,
    bmc,
    cre,
    xpr,
    mln,
    btmx,
    rise,
    hoo,
    gtc,
    torn,
    lit,
    mft,
    lcx,
    box,
    dia,
    nct,
    idrt,
    rsv,
    rfr,
    trb,
    cdt,
    dg,
    math,
    fox,
    stc,
    wnxm,
    hopr,
    ctxc,
    lend,
    upp,
    thor,
    kin,
    btrfly,
    wxt,
    ovr,
    key,
    bzrx,
    cxo,
    icn,
    loc,
    rari,
    bz,
    bond,
    om,
    prq,
    btm,
    cube,
    qanx,
    feg,
    xdg,
    get,
    front,
    swftc,
    qsp,
    krl,
    net,
    df,
    ult,
    mdt,
    lon,
    grid,
    ngc,
    pnk,
    ngc,
    ult,
    fsn,
    fuse,
    plu,
    route,
    boa,
    sdt,
    dock,
    tone,
    inst,
    dext,
    wic,
    uft,
    qrl,
    hoge,
    gto,
    avt,
    ast,
    crpt,
    civ,
    rhoc,
    pnt,
    utnp,
    bepro,
    ycc,
    radar,
    abt,
    met,
    psp,
    insur,
    eden,
    bpt,
    visr,
    occ,
    uncx,
    stack,
  ] = await Promise.all([
    await ethTokenTotalSupply(provider, circSupplyData, "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4Fabb145d64652a948d72533023f6E7A623C7C53", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x3883f5e181fccaF8410FA61e12b59BAd963fb645", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x75231F58b43240C9718Dd58B4967c5114342a86c", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x514910771AF9Ca656af840dff83E8264EcF986CA", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xA2cd3D43c775978A96BdBf12d733D5A1ED94fb18", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x853d955aCEf822Db058eb8505911ED77F175b99e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6e1A19F235bE7ED8E3369eF73b196C07257494DE", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0000000000085d4780B73119b644AE5ecd22b376", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x39AA39c021dfbaE8faC545936693aC917d5E7563", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xf34960d9d60be18cC1D5Afc1A6F012A723a28811", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8E870D67F660D95d5be530380D0eC0bd388289E1", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC669928185DbCE49d2230CC9B0979BE6DC797957", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4a220E6096B25EADb88358cb44068A3248254675", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0316EB71485b0Ab14103307bf65a021042c6d380", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xc944E90C64B2c07662A292be6244BDf05Cda44a7", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6f259637dcD74C767781E37Bc6133cd6A68aa161", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0D8775F648430679A709E98d2b0Cb6250d2887EF", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4E15361FD6b4BB609Fa63C81A2be19d873717870", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x45804880De22913dAFE09f4980848ECE6EcbAf78", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x3506424F91fD33084466F402d5D97f05F8e3b4AF", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x05f4a42e251f2d52b8ed15E9FEdAacFcEF1FAD27", 12),
    await ethTokenTotalSupply(provider, circSupplyData, "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x68749665FF8D2d112Fa859AA293F07A622782F38", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0xfF20817765cB7f73d4bde2e66e067E58D11095C2", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE452E6Ea2dDeB012e20dB73bf5d3863A3Ac8d77a", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d", 4),
    await ethTokenTotalSupply(provider, circSupplyData, "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x111111111117dC0aa78b770fA6A738034120C302", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x41AB1b6fcbB2fA9DCEd81aCbdeC13Ea6315F2Bf2", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xc00e94Cb662C3520282E6f5717214004A7f26888", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5", 9),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6810e776880C02933D47DB1b9fc05908e5386b96", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x476c5E26a75bd202a9683ffD34359C0CC15be0fF", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x3103dF8F05c4D8aF16fD22AE63E406b97FeC6938", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x16631e53C20Fd2670027C6D53EfE2642929b285C", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6fB3e0A217407EFFf7Ca062D46c26E5d60a14d69", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xd7c49CEE7E9188cCa6AD8FF264C1DA2e69D4Cf3B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE41d2489571d322189246DaFA5ebDe1F4699F498", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xFA1a856Cfa3409CFa145Fa4e20Eb270dF3EB21ab", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xb056c38f6b7Dc4064367403E26424CD2c60655e1", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xB63B606Ac810a52cCa15e44bB630fd42D8d1d83d", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x58b6A8A3302369DAEc383334672404Ee733aB239", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x799a4202c12ca952cB311598a024C80eD371a41e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x39Bb259F66E1C59d5ABEF88375979b4D20D98022", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4691937a7508860F876c9c0a2a617E7d9E945D4B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x92D6C1e31e14520e676a687F0a93788B716BEff5", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xba9d4199faB4f26eFE3551D490E3821486f135Ba", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5Ca381bBfb58f0092df149bD3D243b08B9a8386e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD33526068D116cE69F19A9ee46F0bd304F21A51f", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x198d14F2Ad9CE69E76ea330B374DE4957C3F850a", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x761D38e5ddf6ccf6Cf7c55759d5210750B5D60F3", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x9992eC3cF6A55b00978cdDF2b27BC6882d88D1eC", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd", 2),
    await ethTokenTotalSupply(provider, circSupplyData, "0xba100000625a3754423978a60c9317c58a424e3D", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0f2D719407FdBeFF09D87557AbB7232601FD9F29", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x320623b8E4fF03373931769A31Fc52A4E78B5d70", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x429D83Bb0DCB8cdd5311e34680ADC8B12070a07f", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xdB25f211AB05b1c97D595516F45794528a807ad8", 2),
    await ethTokenTotalSupply(provider, circSupplyData, "0xff56Cc6b1E6dEd347aA0B7676C85AB0B3D08B0FA", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x744d70FDBE2Ba4CF95131626614a1763DF805B9E", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xdF574c24545E5FfEcb9a659c229253D4111d87e1", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x081F67aFA0cCF8c7B17540767BBe95DF2bA8D97F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8c15Ef5b4B21951d50E53E4fbdA8298FFAD25057", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x2ef52Ed7De8c5ce03a4eF0efbe9B7450F2D7Edc9", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8A2279d4A90B6fe1C4B30fa660cC9f926797bAA2", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0FD10b9899882a6f2fcb5c371E17e70FdEe00C38", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xA849EaaE994fb86Afa73382e9Bd88c2B6b18Dc71", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x580c8520dEDA0a441522AEAe0f9F7A5f29629aFa", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5Cf04716BA20127F1E2297AdDCf4B5035000c9eb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xa117000000f279D81A1D3cc75430fAA017FA5A2e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xAaAAAA20D9E0e2461697782ef11675f668207961", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x595832F8FC6BF59c85C527fEC3740A1b7a361269", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x467Bccd9d29f223BcE8043b84E8C8B282827790F", 2),
    await ethTokenTotalSupply(provider, circSupplyData, "0x090185f2135308BaD17527004364eBcC2D37e5F6", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x221657776846890989a759BA2973e427DfF5C9bB", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xfc82bb4ba86045Af6F327323a46E80412b91b27d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x70e8dE73cE538DA2bEEd35d14187F6959a8ecA96", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4F9254C83EB525f9FCf346490bbb3ed28a81C667", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x3597bfD533a99c9aa083587B074434E61Eb0A258", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x622dFfCc4e83C64ba959530A5a5580687a57581b", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x55296f69f40Ea6d20E478533C15A6B08B654E758", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xF433089366899D83a9f26A773D59ec7eCF30355e", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x419D0d8BdD9aF5e606Ae2232ed285Aff190E711b", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xf99d58e463A2E07e5692127302C20A191861b4D6", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE5B826Ca2Ca02F09c1725e9bd98d9a8874C30532", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xfd1e80508F243E64CE234eA88A5Fd2827c71D4b7", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x967da4048cD07aB37855c090aAF366e4ce1b9F48", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x178c820f862B14f316509ec36b13123DA19A6054", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x607F4C5BB672230e8672085532f7e901544a7375", 9),
    await ethTokenTotalSupply(provider, circSupplyData, "0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6123B0049F904d730dB3C36a31167D9d4121fA6B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xEA26c4aC16D4a5A106820BC8AEE85fd0b7b2b664", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD291E7a03283640FDc51b121aC401383A46cC623", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xbE9375C6a420D2eEB258962efB95551A5b722803", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xDe7D85157d9714EADf595045CC12Ca4A5f3E2aDb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xAaAAAA20D9E0e2461697782ef11675f668207961", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xa117000000f279D81A1D3cc75430fAA017FA5A2e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5Cf04716BA20127F1E2297AdDCf4B5035000c9eb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x13f11C9905A08ca76e3e853bE63D4f0944326C72", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4575f41308EC1483f3d399aa9a2826d74Da13Deb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x580c8520dEDA0a441522AEAe0f9F7A5f29629aFa", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x221657776846890989a759BA2973e427DfF5C9bB", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8806926Ab68EB5a7b909DcAf6FdBe5d93271D6e2", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0c7D5ae016f806603CB1782bEa29AC69471CAb9c", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xcf0C122c6b73ff809C693DB761e7BaeBe62b6a2E", 9),
    await ethTokenTotalSupply(provider, circSupplyData, "0xEd04915c23f00A313a544955524EB7DBD823143d", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8f3470A7388c05eE4e7AF3d01D8C722b0FF52374", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4C19596f5aAfF459fA38B0f7eD92F11AE6543784", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x626E8036dEB333b408Be468F951bdB42433cBF18", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xcfcEcFe2bD2FED07A9145222E8a7ad9Cf1Ccd22A", 11),
    await ethTokenTotalSupply(provider, circSupplyData, "0xa1faa113cbE53436Df28FF0aEe54275c13B40975", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x91Af0fBB28ABA7E31403Cb457106Ce79397FD4E6", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x940a2dB1B7008B6C776d4faaCa729d6d4A4AA551", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xBe1a001FE942f96Eea22bA08783140B9Dcc09D28", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x226bb599a12C826476e3A771454697EA52E9E220", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xB705268213D593B8FD88d3FDEFF93AFF5CbDcfAE", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0C6f5F7D555E7518f6841a79436BD2b1Eef03381", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x57B946008913B82E4dF85f501cbAeD910e58D26C", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xA2120b9e674d3fC3875f415A7DF52e382F141225", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5B7533812759B45C2B44C19e320ba2cD2681b542", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x1c48f86ae57291F7686349F12601910BD8D470bb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD417144312DbF50465b1C641d016962017Ef6240", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xAC51066d7bEC65Dc4589368da368b212745d63E8", 6),
    await ethTokenTotalSupply(provider, circSupplyData, "0xEC213F83defB583af3A000B1c0ada660b1902A0F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x986EE2B944c42D017F52Af21c4c69B84DBeA35d8", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x115eC79F1de567eC68B7AE7eDA501b406626478e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD7EFB00d12C2c13131FD319336Fdf952525dA2af", 4),
    await ethTokenTotalSupply(provider, circSupplyData, "0xec67005c4E498Ec7f55E092bd1d35cbC47C91892", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xcca0c9c383076649604eE31b20248BC04FdF61cA", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC17c30e98541188614dF99239cABD40280810cA3", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD241D7b5cb0eF9fC79D9e4eb9e21F5e209f52f7D", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x77777FeDdddFfC19Ff86DB637967013e6C6A116C", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xDF2C7238198Ad8B389666574f2d8bc411A4b7428", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x037A54AaB062628C9Bbae1FDB1583c195585fe41", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xe1A178B681BD05964d3e3Ed33AE731577d9d96dD", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x9E46A38F5DaaBe8683E10793b06749EEF7D733d1", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x998FFE1E43fAcffb941dc337dD0468d52bA5b48A", 2),
    await ethTokenTotalSupply(provider, circSupplyData, "0x196f4727526eA7FB1e17b2071B3d8eAA38486988", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xd0929d411954c47438dc1d871dd6081F5C5e149c", 4),
    await ethTokenTotalSupply(provider, circSupplyData, "0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x177d39AC676ED1C67A2b268AD7F1E58826E5B0af", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4b520c812E8430659FC9f12f6d0c39026C83588D", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x08d967bb0134F2d07f7cfb6E246680c53927DD30", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x15B543e986b8c34074DFc9901136d9355a537e7E", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0d438F3b5175Bebc262bF23753C1E53d03432bDE", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xF5581dFeFD8Fb0e4aeC526bE659CFaB1f8c781dA", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xEa11755Ae41D889CeEc39A63E6FF75a02Bc1C00d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC86D054809623432210c107af2e3F619DcFbf652", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xa5f2211B9b8170F694421f2046281775E8468044", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x818Fc6C2Ec5986bc6E2CBf00939d90556aB12ce5", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC0d4Ceb216B3BA9C3701B291766fDCbA977ceC3A", 9),
    await ethTokenTotalSupply(provider, circSupplyData, "0xa02120696c7B8fE16C09C749E4598819b2B0E915", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x21BfBDa47A0B4B5b1248c767Ee49F7caA9B23697", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4CC19356f2D37338b9802aa8E8fc58B0373296E7", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x56d811088235F11C8920698a204A5010a788f4b3", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xb6EE9668771a79be7967ee29a63D4184F8097143", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x888666CA69E0f178DED6D75b5726Cee99A87D698", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x5e3346444010135322268a4630d2ED5F8D09446c", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4375E7aD8A01B8eC3Ed041399f62D9Cd120e0063", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0391D2021f89DC339F60Fff84546EA23E337750f", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x3593D125a4f7849a1B059E64F4517A86Dd60c95d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x362bc847A3a9637d3af6624EeC853618a43ed7D2", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xcB97e65F07DA24D46BcDD078EBebd7C6E6E3d750", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xDf801468a808a32656D2eD2D2d80B72A129739f4", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xAAA7A10a8ee237ea61E8AC46C50A8Db8bCC1baaa", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x389999216860AB8E0175387A0c90E5c52522C945", 9),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4f81C790581b240A5C948Afd173620EcC8C71c8d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x8a854288a5976036A725879164Ca3e91d30c6A1B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xf8C3527CC04340b208C854E985240c02F7B7793f", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0bb217E40F8a5Cb79Adf04E1aAb60E5abd0dfC1e", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x99ea4dB9EE77ACD40B119BD1dC4E33e1C070b80d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x464eBE77c293E473B48cFe96dDCf88fcF7bFDAC0", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xcfb98637bcae43C13323EAa1731cED2B716962fD", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE884cc2795b9c45bEeac0607DA9539Fd571cCF85", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x814e0908b12A99FeCf5BC101bB5d0b8B5cDf7d26", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0000000000095413afC295d19EDeb1Ad7B71c952", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x12B19D3e2ccc14Da04FAe33e63652ce469b3F2FD", 12),
    await ethTokenTotalSupply(provider, circSupplyData, "0x72dD4b6bd852A3AA172Be4d6C5a6dbEc588cf131", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x93ED3FBe21207Ec2E8f2d3c3de6e058Cb73Bc04d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x72dD4b6bd852A3AA172Be4d6C5a6dbEc588cf131", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE884cc2795b9c45bEeac0607DA9539Fd571cCF85", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD0352a019e9AB9d757776F532377aAEbd36Fd541", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x970B9bB2C0444F5E81e9d0eFb84C8ccdcdcAf84d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xD8912C10681D8B21Fd3742244f44658dBA12264E", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x16ECCfDbb4eE1A85A33f3A9B21175Cd7Ae753dB4", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x746DdA2ea243400D5a63e0700F190aB79f06489e", 7),
    await ethTokenTotalSupply(provider, circSupplyData, "0x73968b9a57c6E53d41345FD57a6E6ae27d6CDB2F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xE5Dada80Aa6477e85d09747f2842f7993D0Df71C", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x2Ab6Bb8408ca3199B8Fa6C92d5b455F820Af03c4", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x6f40d4A6237C257fff2dB00FA0510DeEECd303eb", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xfB7B4564402E5500dB5bB6d63Ae671302777C75a", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x4f878C0852722b0976A955d68B376E4Cd4Ae99E5", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0202Be363B8a4820f3F4DE7FaF5224fF05943AB1", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x697beac28B09E122C4332D163985e8a73121b97F", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0xfAd45E47083e4607302aa43c65fB3106F1cd7607", 9),
    await ethTokenTotalSupply(provider, circSupplyData, "0xC5bBaE50781Be1669306b9e001EFF57a2957b09d", 5),
    await ethTokenTotalSupply(provider, circSupplyData, "0x0d88eD6E74bbFD96B831231638b66C05571e824F", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x27054b13b1B798B345b591a4d22e6562d47eA75a", 4),
    await ethTokenTotalSupply(provider, circSupplyData, "0x08389495D7456E1951ddF7c3a1314A4bfb646d8B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x08389495D7456E1951ddF7c3a1314A4bfb646d8B", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x37fE0f067FA808fFBDd12891C0858532CFE7361d", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x168296bb09e24A88805CB9c33356536B980D3fC5", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x89Ab32156e46F46D02ade3FEcbe5Fc4243B9AAeD", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x9e3319636e2126e3c0bc9e3134AEC5e1508A46c7", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xCF3C8Be2e2C42331Da80EF210e9B1b307C03d36A", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x37E1160184F7dD29f00b78C050Bf13224780b0B0", 8),
    await ethTokenTotalSupply(provider, circSupplyData, "0x44709a920fCcF795fbC57BAA433cc3dd53C44DbE", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xB98d4C97425d9908E66E53A6fDf673ACcA0BE986", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xcAfE001067cDEF266AfB7Eb5A286dCFD277f3dE5", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x544c42fBB96B39B21DF61cf322b5EDC285EE7429", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x1559FA1b8F28238FD5D76D9f434ad86FD20D1559", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x327682779bAB2BF4d1337e8974ab9dE8275A7Ca8", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xF938424F7210f31dF2Aee3011291b658f872e91e", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x2F109021aFe75B949429fe30523Ee7C0D5B27207", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0xaDB2437e6F65682B85F814fBc12FeC0508A7B1D0", 18),
    await ethTokenTotalSupply(provider, circSupplyData, "0x56A86d648c435DC707c8405B78e2Ae8eB4E60Ba4", 18),
  ]));
  console.log(tokens);
  return tokens;
};

// ethereumTokenTotalValue();
const test = async () => {
  //   let optimismTokens = optimismTokenTotalValue();
  //   let arbitrumTokens = arbitrumTokenTotalValue();
  let ethereumTokens = ethereumTokenTotalValue();
  //   let polygonTokens = await polygonTotalTokenValue();
  //   let avaxTokens = await avalancheTokenTotalValue();
  //   getPrices("polygon-pos", polygonTokens);
  //   getPrices("avalanche", avaxTokens);
  //   getPrices("arbitrum-one", await arbitrumTokens);
  //   getPrices("optimistic-ethereum", await optimismTokens);
  getPrices("ethereum", await ethereumTokens);
};

test();

// ethTokenTotalSupply(provider, circSupplyData, "0x6e1A19F235bE7ED8E3369eF73b196C07257494DE", 18);

// ethTokenTotalSupply(provider, circSupplyData, "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", 18);
