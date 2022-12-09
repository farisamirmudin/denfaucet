import { useFaucetContext } from '../context/DenFaucetContext';

const Owner = () => {
  const { withdraw, setLockTime, setWithdrawal } = useFaucetContext();
  return (
      <div className='space-x-2'>
        <button onClick={withdraw}>Withdraw</button>
        <button onClick={setWithdrawal}>Set Withdrawal Amount</button>
        <button onClick={setLockTime}>Set Lock Time</button>
      </div>
  )
}

export default Owner