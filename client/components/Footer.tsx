import Link from 'next/link'
import Contact from '../components/Contact'
import { Link as ScrollLink } from 'react-scroll'
const Footer = () => {
  return (
    <footer className="text-sm text-center text-white mt-6 space-y-2">
      <Contact />
      <div>
        <ScrollLink className='hover:underline hover:cursor-pointer' to={'top'} spy={true} smooth={true} duration={500}>Back to top</ScrollLink>{" | "}
        <ScrollLink className='hover:underline hover:cursor-pointer' to={'about'} spy={true} smooth={true} duration={500}>About</ScrollLink>{" | "}
        <Link className='hover:underline hover:cursor-pointer' target={'_blank'} href={'https://goerli.etherscan.io/address/0x7C622077887E60259a4131b9287EbA5c014f716C'}>View on Etherscan</Link>{" | "}
        <ScrollLink className='hover:underline hover:cursor-pointer' to={'faqs'} spy={true} smooth={true} duration={500}>FAQs</ScrollLink>
      </div>
      © 2022 Den Token
    </footer>
  )
}

export default Footer