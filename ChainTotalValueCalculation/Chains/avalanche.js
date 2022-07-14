const { ethers } = require("ethers");
const { tokenTotalSupply } = require("../CalcTools");
const avalancheProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche");

// not including wavax
// Only calculate for Avax c-chain
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

  return tokens;
};

module.exports = { avalancheTokenTotalValue };
