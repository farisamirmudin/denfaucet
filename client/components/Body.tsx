import Link from 'next/link';
import { FormEvent } from 'react'
import { useFaucetContext } from '../context/DenFaucetContext'
import { SlClose } from 'react-icons/sl'

const Body = () => {
  const { account, failMsg, transactionHash, successMsg, isLoading, requestToken, setFailMsg, setSuccessMsg } = useFaucetContext()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestToken();
  }
  const popup = (msg: string, color: string) => {
    return (
      <div className={`flex items-center px-4 rounded-lg ${color} text-white py-2 my-4`}>
        <p className='mr-auto'>{msg}</p>
        <SlClose className="cursor-pointer hover:text-slate-200" onClick={() => { setFailMsg(""); setSuccessMsg(""); }} />
      </div>
    )
  }
  return (
    <div className='mt-16 mb-8'>
      {/* top section */}
      <div className="text-center text-white">
        <p className='text-4xl'>DEN FAUCET</p>
        <p className='my-4'>Get yours now! 50 DEN/day</p>
        {failMsg && popup(failMsg, 'bg-red-600')}
        {successMsg && popup(successMsg, 'bg-green-600')}
      </div>

      {/* middle section */}
      <div className="rounded-lg p-6 bg-white">
        {/* address field and button */}
        <form className='flex flex-col lg:grid lg:grid-cols-6 gap-2 mb-2' onSubmit={handleSubmit}>
          <input className='col-span-5 px-4 py-2 rounded-lg outline-none border' defaultValue={account} type="text" placeholder='Enter Your Wallet Address (0x...) or ENS Domain' />
          <button disabled={!account || isLoading} className='col-span-1 px-4 py-2 rounded-lg text-white bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'>
            {isLoading ? <div className="animate-spin mx-auto w-6 h-6 rounded-full border-b-2 border-[#22C1C3]"></div> : 'Send Me DEN'}
          </button>
        </form>

        {/* message shown if account connected */}
        {account && <p>✅ Alchemy account connected, receive 50 DEN!</p>}
        {/* show transaction hash */}
        <div className='bg-gradient-to-r from-[#7D77FF] to-[#FF9482] text-white py-2 px-4 rounded-t-lg mt-4'>Transaction</div>
        <div className="rounded-b-lg px-4 py-2 border">
          {transactionHash &&
            <div>
              <Link target={'_blank'} className="after:content-['_↗'] hover:text-gray-600 text-sm" style={{overflowWrap: 'break-word'}} href={`https://goerli.etherscan.io/tx/${transactionHash}`}>Transaction Hash: {transactionHash}</Link>
            </div>}
        </div>
      </div>

    </div>
  )
}

export default Body