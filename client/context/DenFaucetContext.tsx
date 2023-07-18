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

declare global {
  interface Window {
    ethereum: BrowserProvider & Eip1193Provider;
    owner_modal: HTMLDialogElement;
  }
}

interface ContextProps {
  account?: string;
  transactionHash?: string;
  isLoading: boolean;
  connectWallet: () => void;
  withdraw: () => void;
  requestToken: () => void;
  setLockTime: () => void;
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
    const populateState = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
        abi.abi,
        signer
      );
      dispatch({ contract, provider, signer });
    };
    populateState();
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    if (!state.provider) return;
    const wallets = (await state.provider.send(
      "eth_requestAccounts",
      []
    )) as string[];
    dispatch({ connectedWalletAddress: wallets?.[0] });
  };

  const getContractBalance = async () => {
    if (!state.contract) return 0;
    const balance = (await state.contract.getBalance()) as BigInt;
    return Number(balance) / 10 ** 18;
  };

  const withdraw = async () => {
    if (!state.contract) return;
    const res = await state.contract.withdraw();
    const data = await res.wait();
    console.log(data);
  };
  const setLockTime = async () => {
    if (!state.contract) return;
    const res = await state.contract.setLockTime(1440);
    const data = await res.wait();
    console.log(data);
  };
  const setWithdrawal = async (amount: number) => {
    if (!state.contract) return;
    const res = await state.contract.setWithdrawalAmount(amount);
    const data = await res.wait();
    console.log(data);
  };

  const requestToken = async () => {
    if (!state.contract) return;
    setIsLoading(true);
    const res =
      (await state.contract.requestToken()) as ContractTransactionResponse;
    dispatch({ transactionHash: res.hash });
    const data = await res.wait();
    console.log(data);
    setIsLoading(false);
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
