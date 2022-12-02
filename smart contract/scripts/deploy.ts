import { ethers } from "hardhat";

async function main() {
  const Den = await ethers.getContractFactory("Den");
  const den = await Den.deploy(10000000, 50)

  await den.deployed();

  console.log(`Den Token deployed to ${den.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

