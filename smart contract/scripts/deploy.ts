import { ethers } from "hardhat";

async function main() {
  const den = await ethers.deployContract("Den", [10000000, 50]);
  await den.waitForDeployment();
  console.log(`Den Token deployed to ${den.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
