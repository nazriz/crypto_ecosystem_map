const { calculateTotal } = require("./calculateTotal");
const { getBridgeBalanceAlchemy } = require("./getBridgeBalanceAlchemy");
const { getBridgeBalanceInfura } = require("./getBridgeBalanceInfura");
const { priceFeeds } = require("./priceFeeds");

module.exports = { calculateTotal, getBridgeBalanceAlchemy, getBridgeBalanceInfura, priceFeeds };
