const { ethers } = require("ethers");
require("dotenv").config();
const axios = require("axios");
const API_KEY = process.env.API_KEY;
const PRIV_KEY = process.env.PRIV_KEY;

const provider = new ethers.providers.InfuraProvider("homestead", {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

const signer = new ethers.Wallet(PRIV_KEY, provider);

const bitcoinMcapTvl = async () => {
  const [bitcoinData, lightningNetworkData] = await Promise.all([
    await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    ),
    await axios.get(`https://1ml.com/statistics?json=true`),
  ]);

  let bitcoinMcap = await bitcoinData["data"][0]["market_cap"];
  let lightningNetworkTVL = await lightningNetworkData["data"][
    "networkcapacityusd"
  ];
};

bitcoinMcapTvl();
