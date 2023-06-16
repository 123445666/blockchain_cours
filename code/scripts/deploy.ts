import { ethers } from "hardhat";

async function main() {
  const VietContract = await ethers.getContractFactory("VietContract");
  const contractInstance = await VietContract.deploy();

  await contractInstance.deployed();

  console.log(`VietContract deployed to ${contractInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
