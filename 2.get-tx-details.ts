// The following retrieves an L2-L1 transaction details
import { Provider } from "zksync-ethers";

const l2Provider = new Provider("https://sepolia.era.zksync.dev");

export async function getTransactionDetails(hash: string) {
  console.log(`Getting L2 tx details for transaction ${hash}`);
  const l2Receipt = await l2Provider.getTransactionReceipt(hash);
  console.log(`L2 transaction included in block ${l2Receipt.blockNumber} with index ${l2Receipt.index}`);
  console.log(`L1 batch number is ${l2Receipt.l1BatchNumber} and tx index in L1 batch is ${l2Receipt.l1BatchTxIndex}`);
  console.log(`Check https://sepolia.explorer.zksync.io/tx/${hash} for more details`);
  return l2Receipt;
}

try {
  // To run this script on stand alone mode, you need to provide the tx hash
  const TX_HASH = 
  "0x926efb47c374478191645a138c5d110e6a6a499ea542e14bcb583918646f7db5"
  getTransactionDetails(TX_HASH);
} catch (error) {
  console.error(error);
}
