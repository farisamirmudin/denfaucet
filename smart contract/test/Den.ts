import { expect } from "chai";
import { ethers } from "hardhat";
import { Den } from "../typechain-types";

describe("Den", () => {
  let den: Den;
  let owner: Awaited<ReturnType<typeof ethers.getSigner>>;
  let address1: Awaited<ReturnType<typeof ethers.getSigner>>;
  let address2: Awaited<ReturnType<typeof ethers.getSigner>>;
  let cap = 10000000;
  let reward = 50;

  beforeEach(async () => {
    den = await ethers.deployContract("Den", [cap, reward]);
    [owner, address1, address2] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set to the right owner", async () => {
      expect(await den.getOwner()).to.equal(owner.address);
    });
    it("Should assign the total supply to the owner", async () => {
      expect(await den.totalSupply()).to.equal(
        await den.balanceOf(owner.address)
      );
    });
    it("Should set the max cap during deployment", async () => {
      expect(Number(await den.cap()) / 10 ** 18).to.equal(cap);
    });
    it("Should set the block reward during deployment", async () => {
      expect(Number(await den.getBlockReward()) / 10 ** 18).to.equal(reward);
    });
  });
  describe("Transaction", () => {
    it("Owner should transfer 100 tokens to address1, 50 tokens to address2 and balance is 150 lesser", async () => {
      const initialBalance = await den.balanceOf(owner.address);
      await den.transfer(address1.address, 100);
      expect(await den.balanceOf(address1.address)).to.equal(100);
      await den.transfer(address2.address, 50);
      expect(await den.balanceOf(address2.address)).to.equal(50);
      expect(await den.balanceOf(owner.address)).to.equal(
        initialBalance - BigInt(150)
      );
    });
  });
});
