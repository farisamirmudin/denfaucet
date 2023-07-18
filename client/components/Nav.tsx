import React from "react";
import Owner from "./Owner";
import { useFaucetContext } from "../context/DenFaucetContext";

export default function Nav() {
  const { connectWallet, account } = useFaucetContext();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DEN FAUCET</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <div className="flex gap-4">
            <button
              onClick={connectWallet}
              className="btn btn-outline btn-primary"
            >
              {account
                ? account.slice(0, 4) + "..." + account.slice(-4)
                : "Connect Wallet"}
            </button>
            <Owner />
          </div>
        </ul>
      </div>
    </div>
  );
}
