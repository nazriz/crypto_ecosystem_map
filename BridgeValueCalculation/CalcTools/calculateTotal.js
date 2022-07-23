const calculateTotal = (inputBridge, priceFeed) => {
  let runningTotal = 0.0;
  for (const item in inputBridge) {
    if (item != "USD") {
      runningTotal += inputBridge[item] * priceFeed[item];
    }
  }
  let total = inputBridge["USD"] + runningTotal;

  total = total.toFixed(0);
  total = new Intl.NumberFormat({ style: "currency", currency: "USD" }).format(total);
  return total;
};

module.exports = { calculateTotal };
