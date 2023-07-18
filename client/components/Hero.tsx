import Link from "next/link";
import { useFaucetContext } from "../context/DenFaucetContext";
import Owner from "./Owner";
import Image from "next/image";

const Body = () => {
  const { account, transactionHash, isLoading, requestToken } =
    useFaucetContext();

  return (
    <div className="hero min-h-[600px] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          priority
          src="/crypto.png"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="crypto"
          width={400}
          height={800}
        />
        <div>
          <h1 className="text-5xl font-bold">DEN TOKEN</h1>
          <p className="py-6 text-lg">
            DEN is deployed on the Goerli test network on November 30, 2022 in
            Johor, Malaysia. DEN implements the ERC-20 token standard with a
            capped supply of 10 million tokens and pays block reward of 50 DEN
            per transaction.
          </p>
          <div className="flex gap-4 items-center">
            <button
              onClick={requestToken}
              disabled={!account || isLoading}
              className="btn btn-primary"
            >
              {isLoading && <span className="loading loading-spinner" />}
              Send Me DEN
            </button>
            <p>Request 50 DEN per day</p>
          </div>
          {transactionHash && (
            <div className="pt-8">
              Your request is successful. You can view the transaction progress
              on{" "}
              <Link
                target={"_blank"}
                className="btn btn-sm btn-outline btn-primary"
                href={`https://goerli.etherscan.io/tx/${transactionHash}`}
              >
                Etherscan
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
