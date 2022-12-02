import Link from 'next/link'
import {GoMail} from 'react-icons/go'
import { GrLinkedin, GrGithub, GrTwitter, GrMail } from 'react-icons/gr'

const Contact = () => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <Link target={'_blank'} href={'mailto: farisamirmudin@gmail.com'}><GoMail className='text-3xl hover:text-slate-200' /></Link>
      <Link target={'_blank'} href={'https://www.linkedin.com/in/farisamirmudin'}><GrLinkedin className='text-xl hover:text-slate-200' /></Link>
      <Link target={'_blank'} href={'https://github.com/farisamirmudin'}><GrGithub className='text-xl hover:text-slate-200' /></Link>
      <Link target={'_blank'} href={'https://twitter.com/farisamirmudin'}><GrTwitter className='text-xl hover:text-slate-200' /></Link>
    </div>
  )
}

export default Contact