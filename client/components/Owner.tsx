import { useFaucetContext } from '../context/DenFaucetContext';

const Owner = () => {
  const { withdraw, setLockTime, setWithdrawal } = useFaucetContext();
  return (
      <div className="fixed bottom-2 right-2 rounded-lg bg-white flex flex-col p-4 gap-2">
        <div className="text-center">Owner only</div>
        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg' onClick={withdraw}>Withdraw</button>
        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg' onClick={setWithdrawal}>Set Withdrawal Amount</button>
        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg' onClick={setLockTime}>Set Lock Time</button>
      </div>
  
  )
}

export default Owner