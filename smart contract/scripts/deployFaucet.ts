import { ethers } from "hardhat";

async function main() {
  const DenFaucet = await ethers.getContractFactory("DenFaucet");
  const denFaucet = await DenFaucet.deploy("0x975651f39Ed7e1380aC6d969F8a61A36f7Efa048")

  await denFaucet.deployed();

  console.log(`Den Faucet deployed to ${denFaucet.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

