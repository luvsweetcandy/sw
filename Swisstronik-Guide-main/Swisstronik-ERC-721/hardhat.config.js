require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      //2nd wallet
      accounts: ["0x......"],
	//Make sure you have enough funds in this wallet to deploy the smart contract
    },
  },
};