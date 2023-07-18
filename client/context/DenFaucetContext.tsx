import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  BrowserProvider,
  ContractTransactionResponse,
  Eip1193Provider,
  ethers,
} from "ethers";
import abi from "../utils/DenFaucet.json";
import toast from "react-hot-toast";
import { z } from "zod";

declare global {
  interface Window {
    ethereum: BrowserProvider & Eip1193Provider;
    owner_modal: HTMLDialogElement;
  }
}

const Web3Error = z.object({
  code: z.string(),
  message: z.string(),
});

interface ContextProps {
  account?: string;
  transactionHash?: string;
  isLoading: boolean;
  connectWallet: () => void;
  withdraw: () => void;
  requestToken: () => void;
  setLockTime: (duration: number) => void;
  setWithdrawal: (amount: number) => void;
  getContractBalance: () => Promise<number>;
}

type State = {
  contract?: ethers.Contract;
  provider?: ethers.BrowserProvider;
  signer?: ethers.JsonRpcSigner;
  connectedWalletAddress?: string;
  transactionHash?: string;
};

export const DenFaucetContext = createContext<ContextProps | undefined>(
  undefined
);
export const DenFaucetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useReducer(
    (prev: State, next: State) => ({
      ...prev,
      ...next,
    }),
    {
      contract: undefined,
      provider: undefined,
      signer: undefined,
      connectedWalletAddress: undefined,
      transactionHash: undefined,
    }
  );

  useEffect(() => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return;
    }
    const populateState = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
          abi.abi,
          signer
        );
        dispatch({ contract, provider, signer });
      } catch (error: unknown) {
        const parsedError = Web3Error.parse(error);
        toast.error(parsedError.message.split("(")[0].trim());
      }
    };
    populateState();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return;
    }
    if (!state.provider) return;
    try {
      const wallets = (await state.provider.send(
        "eth_requestAccounts",
        []
      )) as string[];
      dispatch({ connectedWalletAddress: wallets?.[0] });
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      toast.error(parsedError.message.split("(")[0].trim());
    }
  };

  const getContractBalance = async () => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return 0;
    }
    if (!state.contract) return 0;
    try {
      const balance = (await state.contract.getBalance()) as BigInt;
      return Number(balance) / 10 ** 18;
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      toast.error(parsedError.message.split("(")[0].trim());
      return 0;
    }
  };

  const withdraw = async () => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return;
    }
    if (!state.contract) return;
    try {
      const res =
        (await state.contract.withdraw()) as ContractTransactionResponse;
      const data = await res.wait();
      console.log(data);
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      toast.error(parsedError.message.split("(")[0].trim());
    }
  };
  const setLockTime = async (duration: number) => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return;
    }
    if (!state.contract) return;
    try {
      const res = (await state.contract.setLockTime(
        duration
      )) as ContractTransactionResponse;
      const data = await res.wait();
      console.log(data);
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      toast.error(parsedError.message.split("(")[0].trim());
    }
  };
  const setWithdrawal = async (amount: number) => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return;
    }
    if (!state.contract) return;
    try {
      const res = (await state.contract.setWithdrawalAmount(
        amount
      )) as ContractTransactionResponse;
      const data = await res.wait();
      console.log(data);
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      toast.error(parsedError.message.split("(")[0].trim());
    }
  };

  const requestToken = async () => {
    if (!window.ethereum) {
      toast.error("Metamask is not installed.");
      return;
    }
    if (!state.contract) return;
    setIsLoading(true);
    try {
      const res =
        (await state.contract.requestToken()) as ContractTransactionResponse;
      dispatch({ transactionHash: res.hash });
      const data = await res.wait();
      console.log(data);
    } catch (error: unknown) {
      const parsedError = Web3Error.parse(error);
      toast.error(parsedError.message.split("(")[0].trim());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DenFaucetContext.Provider
      value={{
        account: state.connectedWalletAddress,
        transactionHash: state.transactionHash,
        isLoading,
        connectWallet,
        withdraw,
        requestToken,
        setLockTime,
        setWithdrawal,
        getContractBalance,
      }}
    >
      {children}
    </DenFaucetContext.Provider>
  );
};

export const useFaucetContext = () => {
  const context = useContext(DenFaucetContext);
  if (!context) {
    throw new Error("Context is undefined");
  }
  return context;
};
