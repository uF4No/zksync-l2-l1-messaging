# zkSync L2->L1 Messaging

This repo contains scripts to send an arbitrary message from L2 to L1. It uses the zkSync system contracts to:

1. Send the message
2. Get the L2 block and L1 batch details
3. Get a proof of the message
4. Verify the proof in L1

## Setup

Install dependencies with:

```shell
yarn 
```

## Instructions

Create a `.env` file in the root folder with the wallet private key.

```shell
WALLET_PRIVATE_KEY=...
```

Run each script in sequential order with `ts-node`. Example:

```shell
ts-node 1.send-message.ts
```

Each step will output some information required for the next script. Just update the required variables.
