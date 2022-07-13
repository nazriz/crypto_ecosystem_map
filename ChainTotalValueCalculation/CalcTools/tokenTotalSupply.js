const { ethers } = require("ethers");
const erc20ABI = require("../../ABI/erc20_abi.json");

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

  let array = [];

  array = [tokenTicker, tokenSupply, contractAddress];

  return array;
};

module.exports = { tokenTotalSupply };
