# Homework #16

## Chainlink

* Note: We will use the Kovan testnet

1. Get some testnet LINK from the faucet: https://faucets.chain.link/

2. Link token address is `0xa36085F69e2889c224210F603D836748e7dC00881`. Create the test hardhat project and add the chainlink dependencies: https://github.com/smartcontractkit/chainlink-hardhat-box

```
cd chainlink-hardhat-box
yarn
```
3. Update the entries in the .env file

```
KOVAN_RPC_URL='www.infura.io/<YOUR INFURA KEY>'
PRIVATE_KEY=<YOUR PRIVATE KEY>
MAINNET_RPC_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key"
MUMBAI_RPC_URL='https://rpc-mumbai.maticvigil.com'
POLYGON_MAINNET_RPC_URL='https://rpc-mainnet.maticvigil.com'
```

4. Deploy

```
$ npx hardhat deploy --network kovan
Nothing to compile
----------------------------------------------------
deploying "PriceConsumerV3" (tx: 0xb33c9c0039e1683db985b044a282f74fe3fec75f0dcdacacce7f40be4764f6d9)...: deployed at 0x1C4E8d2C60213224479B6b865b9370A232900d8f with 223188 gas
Run Price Feed contract with command:
npx hardhat read-price-feed --contract 0x1C4E8d2C60213224479B6b865b9370A232900d8f --network kovan
----------------------------------------------------
deploying "APIConsumer" (tx: 0xa7aa858f0df1e2282822a1ec7ffd263118ecd6f258579d525c346813898165e0)...: deployed at 0x281AF42DAB7A1F835D0eA41312b19F3C05C67456 with 1442138 gas
Run API Consumer contract with following command:
npx hardhat request-data --contract 0x281AF42DAB7A1F835D0eA41312b19F3C05C67456 --network kovan
----------------------------------------------------
deploying "RandomNumberConsumer" (tx: 0x0d1dc0f6d02edaca4136521b4e42801a42e1b047d18e4a8a6027d5f8eb5652ba)...: deployed at 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df with 637223 gas
Run the following command to fund contract with LINK:
npx hardhat fund-link --contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df --network kovan
Then run RandomNumberConsumer contract with the following command
npx hardhat request-random-number --contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df --network kovan
----------------------------------------------------
deploying "Counter" (tx: 0xd6019f7fb4e452705d489b375368cd954fa0b32a7aa6ca60fedd2a7cb2031b3d)...: deployed at 0x5f6EF4941374778A9FD5d3E33E2913f1993Da7E9 with 318617 gas
Head to https://keepers.chain.link/ to register your contract for upkeeps. Then run the following command to track the counter updates
npx hardhat read-keepers-counter --contract 0x5f6EF4941374778A9FD5d3E33E2913f1993Da7E9 --network kovan
----------------------------------------------------
Checking to see if contract can be auto-funded with LINK:
Funding contract 0x281AF42DAB7A1F835D0eA41312b19F3C05C67456 on network kovan
Contract 0x281AF42DAB7A1F835D0eA41312b19F3C05C67456 funded with 1 LINK. Transaction Hash: 0x390e07fd74254712a48f060beb7990f6698a3cd5ac2f1b2c89c599b6db56cb7d
----------------------------------------------------
Checking to see if contract can be auto-funded with LINK:
Funding contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df on network kovan
Contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df funded with 1 LINK. Transaction Hash: 0xe8e87d20842c70c295104ef9a15381d9f4c3169f2f9fa15f360bdcad3cb60003
----------------------------------------------------
```

5. Follow the instructions in the README file to:
  * Read a data feed
  * Get a VRF derived random number

```
$ npx hardhat read-price-feed --contract 0x1C4E8d2C60213224479B6b865b9370A232900d8f --network kovan
Reading data from Price Feed consumer contract  0x1C4E8d2C60213224479B6b865b9370A232900d8f  on network  kovan
Price is:  244488962522

$ npx hardhat request-random-number --contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df --network kovan

Requesting a random number using VRF consumer contract  0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df  on network  kovan
Contract  0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df  random number request successfully called. Transaction Hash:  0xe54cf8d164110e062a47ef342b8e9d750b32ac21ddfcea571c749b2a7b29b2e8

Run the following to read the returned random number:
npx hardhat read-random-number --contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df --network kovan

$ npx hardhat read-random-number --contract 0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df --network kovan

Reading data from VRF contract  0x287F463C6dE7700eF45DC9A4eDE94b95b20e20df  on network  kovan
Random Number is:  0
```
