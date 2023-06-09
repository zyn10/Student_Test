require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_API_KEY = "o23j4mAaCghRM4Mo0tkoEXTTN3nFLFc3";
const PRIVATE_KEY =
  "fd169f694252086bfd5564783f2bbec5af9290608dcb4bc682b3eac4e7ce2ed6";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    ETH_SEPOLIA: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};
