// const { task } = require("hardhat/config");

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// task("balance", "Prints an account's balance").setAction(async() => {});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: process.env.RB_RPC_URL,
            accounts: [process.env.RB_PRIVATEKEY],
            chainId: 4,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_APIKEY,
    },

    solidity: "0.8.9",
};