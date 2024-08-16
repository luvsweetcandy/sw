//Import necessary modules from Hardhat and SwisstronikJS

const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;
  
  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x6A506859edF63a1Ec3d80c739e830b15F902677E";

  const [signer] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory('PERC20Sample');
  const contract = contractFactory.attach(contractAddress);

  const functionName = "transfer";
  const receiptAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1"; //This is swisstronik dev address, don't modify
  const amount = 1 * 10 ** 18;
  const functionArgs = [receiptAddress, `${amount}`]
  const setMessageTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName, functionArgs),0);
  
  await setMessageTx.wait()

  console.log("Transaction hash: ", `https://explorer-evm.testnet.swisstronik.com/tx/${setMessageTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});