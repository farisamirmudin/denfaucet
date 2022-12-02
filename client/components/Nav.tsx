import { useFaucetContext } from '../context/DenFaucetContext';

const Nav = () => {
  const { account, connectWallet } = useFaucetContext();

  return (
    <div className='text-center '>
      {account ? <p className='text-white'>Connected: {account.slice(0, 4) + '...' + account.slice(-4)}</p> : 
      <button onClick={connectWallet} className="px-4 py-1 bg-white rounded-lg">Login</button>}
    </div>
  )
}

export default Nav