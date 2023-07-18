import { useState } from "react";
import { useFaucetContext } from "../context/DenFaucetContext";
import { SubmitHandler, useForm } from "react-hook-form";

const Owner = () => {
  const { withdraw, setLockTime, setWithdrawal, getContractBalance, account } =
    useFaucetContext();
  const [contractBalance, setContractBalance] = useState(0);
  const amountForm = useForm<{ amount: string }>();
  const lockTimeForm = useForm<{ lockTime: string }>();

  const onAmountSubmit: SubmitHandler<{ amount: string }> = ({ amount }) =>
    setWithdrawal(parseInt(amount));
  const onLockTimeSubmit: SubmitHandler<{ lockTime: string }> = ({
    lockTime,
  }) => setLockTime(parseInt(lockTime));
  return (
    <>
      <button
        disabled={account !== process.env.NEXT_PUBLIC_ADMIN_WALLET}
        className="btn btn-outline"
        onClick={() => window.owner_modal.showModal()}
      >
        Admin
      </button>
      <dialog id="owner_modal" className="modal">
        <div className="modal-box max-w-[400px]">
          <div className="text-2xl font-bold text-center py-4">
            <p>{!contractBalance ? "***" : contractBalance} DEN</p>
          </div>
          <div className="flex flex-col gap-4 ">
            <button
              className="btn btn-outline"
              onClick={async () => {
                const balance = await getContractBalance();
                setContractBalance(balance);
              }}
            >
              Show Balance
            </button>
            <button className="btn btn-outline" onClick={withdraw}>
              Withdraw
            </button>
            <form
              className="form-control"
              onSubmit={lockTimeForm.handleSubmit(onLockTimeSubmit)}
            >
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Duration in minutes"
                  className="input input-bordered flex-1"
                  {...lockTimeForm.register("lockTime", { required: true })}
                />
                <button className="btn min-w-[40%]">SET LOCKTIME</button>
              </label>
            </form>
            <form
              className="form-control"
              onSubmit={amountForm.handleSubmit(onAmountSubmit)}
            >
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Amount to send to user"
                  className="input input-bordered flex-1"
                  {...amountForm.register("amount", { required: true })}
                />
                <button className="btn min-w-[40%]">SET AMOUNT</button>
              </label>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setContractBalance(0)}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Owner;
