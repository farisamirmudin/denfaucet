import { ethers } from "hardhat";

async function main() {
  const denFaucet = await ethers.deployContract("DenFaucet", [
    process.env.TOKEN_ADDRESS,
  ]);
  await denFaucet.waitForDeployment();
  console.log(`Den Faucet deployed to ${denFaucet.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
