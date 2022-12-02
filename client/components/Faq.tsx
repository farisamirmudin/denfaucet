import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import { faqs } from '../utils/faqs'

const Faq = () => {
  const shareTweet = `https://twitter.com/intent/tweet?text=Just receive my DEN Token. Get yours now at&url=${process.env.NEXT_PUBLIC_URI}.%0A%0A&screen_name=DenTokenFaucet&hashtags=dentokenfaucet,blockchain,erc20`
  const style = {
    container: "text-gray-600 mb-10",
    title: "font-semibold"
  }
  return (
    <div id='faqs' className='p-6 bg-white rounded-lg'>
      <p className='text-xl font-bold mb-2'>FAQs</p>
      {faqs.slice(0, -2).map((faq, i) =>
        <div id={i === 0 ? 'about' : ''} className={style.container} key={i}>
          <p className={style.title}>{faq.question}</p>
          <p>{faq.answer}</p>
          {i === 1 && <Link target={'_blank'} className="text-blue-600 hover:text-blue-500 after:content-['_↗']" href={'https://www.coinbase.com/learn/crypto-basics/what-is-a-token'}>Learn more</Link>}
        </div>
      )}
      <div className={style.container}>
        <p className={style.title}>{faqs.at(-2)?.question}</p>
        <p>In order to see and use DEN token, you first need to import the token in your wallet by pasting the token address <span className='bg-slate-200 px-2 py-1 rounded-lg text-sm' style={{ overflowWrap: 'break-word' }}>0x975651f39Ed7e1380aC6d969F8a61A36f7Efa048</span> in {`Asset > Import tokens > Token`} contract address.</p>
      </div>
      <div className={style.container}>
        <p className={style.title}>{faqs.at(-1)?.question}</p>
        <p>Support DEN Token by sharing your experience with a
          <span className='inline-block text-sm ml-2'>
            <Link className='flex gap-1 items-center bg-[#1d9bf0] px-3 text-white rounded-full' target={'_blank'} href={shareTweet}><BsTwitter />Tweet</Link>
          </span>.
        </p>
        <p>If you have extra DEN to donate, you can donate at <span style={{ overflowWrap: 'break-word' }} className='bg-slate-200 px-2 py-1 rounded-lg text-sm'>0x7C622077887E60509a4131b9287EbA5c014f716C</span>.</p>
      </div>

    </div>

  )
}

export default Faq