import { Provider } from "zksync-ethers";

const l2Provider = new Provider("https://sepolia.era.zksync.dev");

export async function getL2LogProof(hash: string, index: number) {
  console.log(`Getting L2 message proof for transaction ${hash} and index ${index}`);
  const proof =  await l2Provider.getLogProof(hash, index);
  console.log(`Proof is: `, proof);
  return proof;
}

try {
  // To run this script on stand alone mode, you need to provide the transaction hash and L2 tx index
  const TX_HASH = "0x926efb47c374478191645a138c5d110e6a6a499ea542e14bcb583918646f7db5";
  const L2_TX_INDEX = 0

   getL2LogProof(TX_HASH, L2_TX_INDEX);
} catch (error) {
  console.error(error);
}
