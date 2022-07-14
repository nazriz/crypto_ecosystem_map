const axios = require("axios");

// Retrieves the token price of token based on contract address
// and coingecko network-id, using the coingecko api
// Output of function returns the final calculation in USD
// Tokens that do not return a price from the coingecko API are
// ommitted from the final calculation
const getPrices = async (networkId, array) => {
  let tickerSupply = {};
  let tickerAddress = {};
  for (let i = 0; i < array.length; i++) {
    temp = array[i];
    tickerSupply[temp[0]] = temp[1];
    tickerAddress[temp[0]] = temp[2];
  }
  let payload = "";
  let geckoPriceOutput = {};
  let payloadArray = [];
  for (const [key1, value1] of Object.entries(tickerAddress)) {
    payloadArray.push(value1);
  }

  while (payloadArray.length > 0) {
    let tempArray = [];
    payload = "";
    for (let i = 0; i < 100; i++) {
      let tempItem = payloadArray.pop();
      tempArray.push(tempItem);
    }

    for (item in tempArray) {
      payload += tempArray[item] + ",";
    }

    let geckoData = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${networkId}?contract_addresses=${payload}&vs_currencies=usd`
    );

    let cleanData = geckoData["data"];

    geckoPriceOutput = Object.assign(geckoPriceOutput, cleanData);
  }

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

  // make final calculation
  // This excludes tokens that do not return a coingecko price
  let totalWithPrices = {};
  for (const [ykey1, yvalue1] of Object.entries(tickerSupply)) {
    for (const [ykey2, yvalue2] of Object.entries(tickerPrice)) {
      if (ykey1 === ykey2) {
        let amount = yvalue1 * yvalue2;
        totalWithPrices[ykey1] = amount;
      }
    }
  }

  // Calculate grand total
  let grandTotal = 0;
  for (const [jkey1, jvalue2] of Object.entries(totalWithPrices)) {
    grandTotal += jvalue2;
  }

  //Returns final total, rounded to 0 places
  return grandTotal.toFixed(0);
};

module.exports = { getPrices };
