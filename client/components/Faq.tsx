import Link from 'next/link'
import { BsTwitter } from 'react-icons/bs'
import { faqs } from '../utils/faqs'

const Faq = () => {
  const shareTweet = `https://twitter.com/intent/tweet?text=Just receive my DEN Token. Get yours now at&url=${process.env.NEXT_PUBLIC_URI}.%0A%0A&screen_name=DenTokenFaucet&hashtags=dentokenfaucet,blockchain,erc20`
  const style = {
    container: "mb-10",
    title: "text-2xl mb-4"
  }
  return (
    <div id='faqs' className='my-6'>
      <p className='text-3xl mb-4'>FAQs</p>
      {faqs.slice(1, -2).map((faq, i) =>
        <div className={style.container} key={i}>
          <p className={style.title}>{faq.question}</p>
          <p>{faq.answer}</p>
        </div>
      )}
      <div className={style.container}>
        <p className={style.title}>{faqs[faqs.length - 2].question}</p>
        <p className='address'>In order to see and use DEN token, you first need to import the token in your wallet by pasting the token address <span className='underline decoration-orange-400 decoration-2 text-sm'>0x975651f39Ed7e1380aC6d969F8a61A36f7Efa048</span> in {`Asset > Import tokens > Token`} contract address.</p>
      </div>
      <div className={style.container}>
        <p className={style.title}>{faqs[faqs.length - 1].question}</p>
        <p>Support DEN Token by sharing your experience with <Link className='underline decoration-orange-400 decoration-2' target={'_blank'} href={shareTweet}><BsTwitter className='inline-block align-text-top'/> Tweet</Link></p>
      </div>
    </div>
  )
}

export default Faq