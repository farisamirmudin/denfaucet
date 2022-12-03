import Link from 'next/link'
const Footer = () => {
  return (
    <footer className="text-sm text-white text-center mt-8">
      <Link className='hover:underline' target={'_blank'} href={'mailto: farisamirmudin@gmail.com'}>Email</Link>{" | "}
      <Link className='hover:underline' target={'_blank'} href={'https://www.linkedin.com/in/farisamirmudin'}>Linkedin</Link>{" | "}
      <Link className='hover:underline' target={'_blank'} href={'https://github.com/farisamirmudin'}>Github</Link>{" | "}
      <Link className='hover:underline' target={'_blank'} href={'https://twitter.com/DenTokenFaucet'}>Twitter</Link>
      <p>© 2022 Den Token</p>
    </footer>
  )
}

export default Footer

