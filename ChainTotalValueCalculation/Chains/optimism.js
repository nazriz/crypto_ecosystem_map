const { ethers } = require("ethers");
require("dotenv").config();
const { tokenTotalSupply } = require("../CalcTools");

const ALCHEMY_OPTIMISM_API_KEY = process.env.ALCHEMY_OPTIMISM_API_KEY;
const optimismProvider = new ethers.providers.AlchemyProvider("optimism", ALCHEMY_OPTIMISM_API_KEY);

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

  return tokens;
};

module.exports = { optimismTokenTotalValue };
