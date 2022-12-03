import Link from 'next/link'

const QuickLink = () => {
  return (
    <div className='text-sm text-center text-white mt-4'>
      <Link className='hover:underline' href={'#top'}>Back to top</Link>{" | "}
      <Link className='hover:underline' href={'#about'}>About</Link>{" | "}
      <Link className='hover:underline' target={'_blank'} href={'https://goerli.etherscan.io/address/0x7C622077887E60259a4131b9287EbA5c014f716C'}>View on Etherscan</Link>{" | "}
      <Link className='hover:underline' href={'#faqs'}>FAQs</Link>
    </div>
  )
}

export default QuickLink