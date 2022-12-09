import { createContext, useContext, useEffect, useState } from "react";
import { contractAbi, contractAddress } from '../utils/smartcontract'
import { ethers } from "ethers";
import toast from 'react-hot-toast'

declare global {
  interface Window {
    ethereum: any
  }
}

export interface ContextProps {
  account: string
  transactionHash: string
  isLoading: boolean
  connectWallet: () => void
  withdraw: () => void
  requestToken: () => void
  setLockTime: () => void
  setWithdrawal: () => void
  getContractBalance: () => void
}

export const DenFaucetContext = createContext<ContextProps | undefined>(undefined);
export const DenFaucetProvider = ({ children }: { children: React.ReactNode }) => {
  let DenFaucetContract: ethers.Contract
  if (typeof window !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    DenFaucetContract = new ethers.Contract(contractAddress, contractAbi, signer)
  }

  const [account, setAccount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const connectWallet = async () => {
    if (!window.ethereum) return
    const reqAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (reqAccounts.length) {
      setAccount(reqAccounts[0]);
    }
  }

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setAccount(accounts[0]);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])


  const getContractBalance = async () => {
    let balance = await DenFaucetContract.getBalance();
    balance = parseInt(balance._hex) / (10 ** 18)
  }

  const withdraw = async () => {
    try {
      const res = await DenFaucetContract.withdraw();
      const data = await res.wait()
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }
  const setLockTime = async () => {
    try {
      const res = await DenFaucetContract.setLockTime(1440)
      const data = await res.wait()
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }
  const setWithdrawal = async () => {
    try {
      const res = await DenFaucetContract.setWithdrawalAmount(50)
      const data = await res.wait()
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }

  const requestToken = async () => {
    const notification = toast.loading('Sending...')
    try {
      const res = await DenFaucetContract.requestToken();
      setIsLoading(true)
      const data = await res.wait()
      setIsLoading(false)
      toast.dismiss(notification)
      toast.success('50 DEN has been successfully sent to you!', {
        duration: 5000
      })
      setTransactionHash(res.hash)
    } catch (error) {
      toast.dismiss(notification)
      toast.error(error.reason, {
        duration: 5000,
        style: {
          textTransform: 'capitalize'
        }
      })
    }
  }

  useEffect(() => {
    if (!window.ethereum) return
    window.ethereum.on('accountsChanged', checkIfWalletIsConnected)
  }, [account])

  return (
    <DenFaucetContext.Provider value={
      {
        account,
        transactionHash,
        isLoading,
        connectWallet,
        withdraw,
        requestToken,
        setLockTime,
        setWithdrawal,
        getContractBalance
      }}>
      {children}
    </DenFaucetContext.Provider>
  )
}

export const useFaucetContext = () => {
  const context = useContext(DenFaucetContext);
  if (context === undefined) {
    throw new Error("Context is undefined");
  }
  return context;
}

