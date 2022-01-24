# Homework 12

## Upgrading Contracts
1. Take your existing Volcano coin contract and add a constant to hold a version number (set it to 1).
2. Write a unit test in hardhat or truffle to test the version number.
3. Make your contract upgradeable by inheriting from Open Zeppelin UUPSUpgradeable
4. Make the necessary changes to your contract
    * Replace a contructor with an initialize function
    * Ensure that all necessary initialisation is being done that function
    * Change any other contracts you inherit from to use the upgradeable version
5. Use the relevant plugin to deploy your contract.
6. Rerun the unit tests to ensure your contract still works.
7. Change the version number in your contract, and use the plugin to upgrade the contract.
8. Rerun the unit tests, and check that the version number has increased.
9. Write a unit test to test the upgrade process.

--------------------------------

# Setup

* Install necessary libs:

```
$ npm install
```

* Open a terminal and bring up a hardhat node:

```
$ npx hardhat node
```

* On another terminal, run the sample script:

```
$ npx hardhat run scripts/deploy.js
```

* Run the tests (populated and fixed):

```
$ npx hardhat test --network hardhat
```

