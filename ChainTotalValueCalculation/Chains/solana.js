const axios = require("axios");

const solanaTokenValue = async () => {
  const getSolscanData = async (limit, offset) => {
    let returnedData = await axios.get(
      `https://public-api.solscan.io/token/list?sortBy=market_cap&direction=desc&limit=${limit}&offset=${offset}`
    );

    let solscanTokenData = returnedData["data"]["data"];
    let solTickerMcap = {};

    for (let i = 0; i < solscanTokenData.length; i++) {
      let tempToken = solscanTokenData[i]["tokenSymbol"];
      let marketCapFD = solscanTokenData[i]["marketCapFD"];
      let marketCap = solscanTokenData[i]["coingeckoInfo"]["marketData"]["marketCap"];
      if (marketCapFD < marketCap) {
        solTickerMcap[tempToken] = marketCapFD;
      } else {
        solTickerMcap[tempToken] = marketCap;
      }
    }
    return solTickerMcap;
  };

  let [solscanData1, solscanData2, solscanData3, solscanData4, solscanData5, solscanData6, solscanData7, solscanData8] =
    await Promise.all([
      await getSolscanData(50, 0),
      await getSolscanData(50, 50),
      await getSolscanData(50, 100),
      await getSolscanData(50, 150),
      await getSolscanData(50, 200),
      await getSolscanData(50, 250),
      await getSolscanData(50, 300),
      await getSolscanData(50, 350),
    ]);

  let solanaTickerMcap = {
    ...solscanData1,
    ...solscanData2,
    ...solscanData3,
    ...solscanData4,
    ...solscanData5,
    ...solscanData6,
    ...solscanData7,
    ...solscanData8,
  };

  let tempAuditString = "";
  let tempAuditArray = [];
  console.log(solanaTickerMcap);
  let solanaTokenValueGrandTotal = 0;
  for (const [key, value] of Object.entries(solanaTickerMcap)) {
    solanaTokenValueGrandTotal += solanaTickerMcap[key];
    tempAuditArray.push(solanaTickerMcap[key]);
    tempAuditString += solanaTickerMcap[key] + ",";
  }

  return solanaTokenValueGrandTotal;
};

module.exports = { solanaTokenValue };
