import abi from "./DenFaucet.json";
import { ethers } from 'ethers'

const contractAbi = abi.abi;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

const getDenFaucetContract = () => {
  if (typeof window !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const DenFaucetContract = new ethers.Contract(contractAddress, contractAbi, signer);
    return DenFaucetContract;
  }
}

const DenFaucetContract = getDenFaucetContract();

export { DenFaucetContract }