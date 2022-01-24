# Homework #8

## Instructions

1. Develop a front-end application that can call on a smart contract to mint an ERC721 token (NFT). Include relevant metadata in the token:
    1. Owner (pubkey)
    2. Token URI (e.g. an IPFS CID)
    3. Token ID
2. Retrieve information regarding an account’s NFT’s
    1. Display NFT metadata
3. Allow transfer of NFT
    1. Apply safe transfer
    2. Trade for zero cost?
4. Use smart contract from Homework 6
5. Use front-end code from Homework 7
6. Deploy on a test net

-----

## SetUp

*Disclaimer: Beware! This is a simple frontend and definitely not meant to be a production application.*

1. In order to setup this contract __locally__, you will need to first install the necessary libraries (being oppenzeppelin):

```
$ npm install
```

2. Then, start the ganache local node and deploy the smart contract using truffle.

```
$ ganache-cli --networkId 1337
$ truffle compile
$ truffle migrate
```

3. The smart contract is now deployed on your mock node, add the contract Address to your metamask wallet and go ahead and setup the frontend:

```
$ cd volcano-token
$ npm install
$ npm start
```

4. This should open the local URL on your browser, go ahead and try minting a token, listing them or transfering to another ganache listed addresses.

![Frontpage](./doc/screenshot.png)

5. Should you need to test this on a testnet, go ahead and try it on Rinkeby with the contract address [0x5f6ef4941374778a9fd5d3e33e2913f1993da7e9](https://rinkeby.etherscan.io/address/0x5f6ef4941374778a9fd5d3e33e2913f1993da7e9).
