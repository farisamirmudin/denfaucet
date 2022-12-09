import Link from 'next/link';
import { useFaucetContext } from '../context/DenFaucetContext'

const Body = () => {
  const { account, transactionHash, isLoading, requestToken, connectWallet } = useFaucetContext()
  
  return (
    <>
      <div className='text-center pt-24'>
        <p className='text-5xl'>DEN FAUCET</p>
        <p className='text-lg'>Request 50 DEN per day</p>
        <p className='my-8' id='about'>DEN is a crypto token released on November 30, 2022 in Johor, Malaysia. The name is inspired by a dialect in Malaysia which means I. DEN implements the ERC-20 token standard, runs on the Goerli test network and possibly on Ethereum mainnet in the future. It has a limited, capped supply of 10 million tokens and pays a block reward of 50 DEN per transaction.</p>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          <button onClick={connectWallet} className="md:col-start-2 px-4 py-2 bg-gray-100 rounded-lg text-zinc-900">{account ? account.slice(0, 4) + '...' + account.slice(-4) : 'Connect Wallet'}</button>
          <button onClick={requestToken} disabled={!account || isLoading} className='px-4 py-2 rounded-lg bg-gray-100 disabled:cursor-not-allowed text-zinc-900'>
            {isLoading ? <div className="animate-spin mx-auto w-6 h-6 rounded-full border-b-2 border-zinc-900"></div> : 'Send Me DEN'}
          </button>
        </div>
      </div>
      <div className='my-16'>
        <p className='text-3xl'>Transaction <span className='underline text-sm italic decoration-orange-400 decoration-2'><Link target={'_blank'} href={'https://goerli.etherscan.io/address/0x7C622077887E60259a4131b9287EbA5c014f716C'}>View on Etherscan</Link></span></p>
        {transactionHash ? <Link target={'_blank'} className="text-gray-100 hash" href={`https://goerli.etherscan.io/tx/${transactionHash}`}>Transaction Hash: {transactionHash}</Link> : 'No Transaction'}
      </div>
    </>
  )
}

export default Body