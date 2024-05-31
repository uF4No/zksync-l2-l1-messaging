
import * as ethers from "ethers";
import { Provider, utils } from "zksync-ethers";

const l2Provider = new Provider("https://sepolia.era.zksync.dev");
// const l1Provider = new ethers.JsonRpcProvider("https://zksync-sepolia.drpc.org");
const l1Provider = ethers.getDefaultProvider("sepolia");

export async function proveL2MessageInclusion(l1BatchNumber: ethers.BigNumberish, proof: any, l1BatchTxIndex: number, sender: string, message: string) {
  const zkAddress = await l2Provider.getMainContractAddress();

  const mailboxL1Contract = new ethers.Contract(zkAddress, utils.ZKSYNC_MAIN_ABI, l1Provider);
  // all the information of the message sent from L2
  const messageInfo = {
    txNumberInBatch: l1BatchTxIndex,
    sender: sender,
    data: ethers.toUtf8Bytes(message),
  };

  console.log(`Retrieving proof for batch ${l1BatchNumber}, transaction index ${l1BatchTxIndex} and proof id ${proof.id}`);

  const res = await mailboxL1Contract.proveL2MessageInclusion(l1BatchNumber, proof.id, messageInfo, proof.proof);

  console.log("Is proof valid?: ", res)
  return res;
}

try {
  // To run this script on stand alone mode, you need to provide the following details
  const SENDER = "";
  // The same message we sent in step 1
  const MESSAGE = "Some L2->L1 message";
  // Retrieved in step 2
  const L1_BATCH_NUMBER = 9132;
  const L1_BATCH_TX_INDEX = 754;
  // The full proof object, including root, proof and id
  const PROOF = {
    id: 10,
    proof: [
      '0xc8ba63d1ad18e4a3af9a4d3e22895a6e04bf83a752a218e43a7fd68cc255781a',
      '0x1d15357502663a39002274be0063a90d7b7103d380209ef4cab8faec4d174df7',
      '0xe3bd47ec9f32a19425d6b91402d3d6ab3f6b06d9a443244e2a6d31ed65996591',
      '0x218ebe16120861bbb675bae95991a9b05763766a62f81cc554f494727e36c934',
      '0x1bb208977c3f09d4693e0f3ddf95d16f4041ff018d05abcb2cbd03d80827cbf7',
      '0x1798a1fd9c8fbb818c98cff190daa7cc10b6e5ac9716b4a2649f7c2ebcef2272',
      '0x66d7c5983afe44cf15ea8cf565b34c6c31ff0cb4dd744524f7842b942d08770d',
      '0xb04e5ee349086985f74b73971ce9dfe76bbed95c84906c5dffd96504e1e5396c',
      '0xac506ecb5465659b3a927143f6d724f91d8d9c4bdb2463aee111d9aa869874db',
      '0x124b05ec272cecd7538fdafe53b6628d31188ffb6f345139aac3c3c1fd2e470f',
      '0xc3be9cbd19304d84cca3d045e06b8db3acd68c304fc9cd4cbffe6d18036cb13f',
      '0xfef7bd9f889811e59e4076a0174087135f080177302763019adaf531257e3a87',
      '0xa707d1c62d8be699d34cb74804fdd7b4c568b6c1a821066f126c680d4b83e00b',
      '0xf6e093070e0389d2e529d60fadb855fdded54976ec50ac709e3a36ceaa64c291'
    ],
    root: '0xd00359405fb3d62474f73f8bbaa06acebec19296e2c7bb9ccc26b0a16c07ac71'
  };

  proveL2MessageInclusion(L1_BATCH_NUMBER, PROOF, L1_BATCH_TX_INDEX, SENDER, MESSAGE);
} catch (error) {
  console.error(error);
}
