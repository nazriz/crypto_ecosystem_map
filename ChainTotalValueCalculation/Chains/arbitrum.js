const { ethers } = require("ethers");
require("dotenv").config();
const { tokenTotalSupply } = require("../CalcTools");
const MORALIS_ARBITRUM = process.env.MORALIS_ARBITRUM;
const arbitrumProvider = new ethers.providers.JsonRpcProvider(MORALIS_ARBITRUM);

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

  return tokens;
};

module.exports = { arbitrumTokenTotalValue };
