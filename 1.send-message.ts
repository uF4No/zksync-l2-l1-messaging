// The following script sends a message from L2 to L1
import * as ethers from "ethers";
import { Provider, utils, Wallet } from "zksync-ethers";

import dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "";

if(!PRIVATE_KEY) {
  throw new Error("Please provide WALLET_PRIVATE_KEY in .env file");
}

const l2Provider = new Provider("https://sepolia.era.zksync.dev");
const l1Provider = ethers.getDefaultProvider("sepolia");

const wallet = new Wallet(PRIVATE_KEY, l2Provider, l1Provider);

export async function sendMessageToL1(message: string): Promise<string>{
  console.log(`Sending message to L1 with text ${message}`);
  const textBytes = ethers.toUtf8Bytes(message);

  const messengerContract = new ethers.Contract(utils.L1_MESSENGER_ADDRESS, utils.L1_MESSENGER, wallet);
  const tx = await messengerContract.sendToL1(textBytes);
  await tx.wait();
  console.log("L2 trx hash is ", tx.hash);
  console.log(`Check https://sepolia.explorer.zksync.io/tx/${tx.hash}`);
  return tx.hash;
}

try {
  // To run this script on stand alone mode, you need to provide the message to send
  const MESSAGE = "Some L2->L1 message";
  sendMessageToL1(MESSAGE);
} catch (error) {
  console.error(error);
}
