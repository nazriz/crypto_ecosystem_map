const axios = require("axios");

const bitcoinTotalValue = async () => {
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
  let grandTotal = omniUSDT + lightningNetworkTVL;

  console.log(omniUSDT);
  return grandTotal;
};

bitcoinTotalValue();

module.exports = { bitcoinTotalValue };
