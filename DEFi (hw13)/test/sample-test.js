const { expect, use } = require("chai");
const { ethers } = require("hardhat");

const { solidity } = require("ethereum-waffle");
use(solidity);

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const UNIAddress = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";

describe("DeFi", () => {
  let owner;
  let DAI_TokenContract;
  let USDC_TokenContract;
  let DeFi_Instance;
  const INITIAL_AMOUNT = 999999999000000;

  before(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
    const whale = await ethers.getSigner(
      "0x503828976D22510aad0201ac7EC88293211D23Da"
    );
    console.log("Owner account is ", owner.address);

    DAI_TokenContract = await ethers.getContractAt("ERC20", DAIAddress);
    USDC_TokenContract = await ethers.getContractAt("ERC20", USDCAddress);
    UNI_TokenContract = await ethers.getContractAt("ERC20", UNIAddress);
    AAVE_TokenContract = await ethers.getContractAt("ERC20", AAVEAddress);

    const symbol = await DAI_TokenContract.symbol();
    console.log(symbol);
    const DeFi = await ethers.getContractFactory("DeFi");

    await DAI_TokenContract.connect(whale).transfer(
      owner.address,
      BigInt(INITIAL_AMOUNT)
    );

    DeFi_Instance = await DeFi.deploy();
  });

  it("should check transfer succeeded", async () => {
    const balance = await DAI_TokenContract.balanceOf(owner.address);
    console.log(`DAI Balance: ${balance}`);
    console.log(`Amount: ${INITIAL_AMOUNT}`);
    expect(balance >= INITIAL_AMOUNT);
  });

  it("should sendDAI to contract", async () => {
    await DAI_TokenContract.transfer(DeFi_Instance.address, BigInt(INITIAL_AMOUNT), {
      from: owner.address,
      gasPrice: 0,
    })
  });

  it("should make a swap", async () => {
    let initialUSDC = await USDC_TokenContract.balanceOf(owner.address);
    console.log(`Initial USDC balance: ${initialUSDC}`);

    let swapReceived = await DeFi_Instance.swapDAItoUSDC(99999999900000, {
      from: owner.address,
      gasPrice: 0,
    });
    console.log(`Transfered ${swapReceived}`);

    let finalUSDC = await USDC_TokenContract.balanceOf(owner.address);
    console.log(`Amount remaining: ${finalUSDC.toNumber()}`);
  });

  it("should swap DAI for UNI", async () => {
    let initialUNI = await UNI_TokenContract.balanceOf(owner.address);
    console.log(`Initial UNI balance: ${initialUNI}`);

    let swapReceived = await DeFi_Instance.swapDAItoToken(
      99999999900000,
      UNIAddress,
      {
        from: owner.address,
        gasPrice: 0,
    });
    console.log(`Transfered ${swapReceived}`);

    let finalUNI = await UNI_TokenContract.balanceOf(owner.address);
    console.log(`Amount UNI remaining: ${finalUNI.toNumber()}`);
  });
});
