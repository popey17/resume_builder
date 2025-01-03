import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import Button from '../button/Button'
import LinkBtn from '../button/LinkBtn'
import { TfiAlignRight } from "react-icons/tfi";



const Nav = () => {
  return (
    <nav className='left-0 w-full fixed top-0 z-50'>
      <div className='max-w-[95%] mx-auto flex justify-between items-center py-3 relative'>
        <Link to='/' className='w-[100%] max-w-[100px] lg:max-w-[120px] '>
          <img className='w-[100%]' src={assets.logo} alt="logo" width={120} loading='eager' />
        </Link>

        <div className='hidden lg:flex gap-5 text-[15px] absolute left-1/2 transform -translate-x-1/2'>
          <LinkBtn href='/'>Home</LinkBtn>
          <LinkBtn href='/about'>About</LinkBtn>
          <LinkBtn href='/Contact'>Contact</LinkBtn>
        </div>

        <div className='flex justify-between items-center gap-5 text-[15px]'>
          <div className='hidden justify-between items-center gap-5 lg:flex'>
            <LinkBtn href='/login'>Login</LinkBtn>
            <Button href='/resume/create' link>Create Your CV</Button>
          </div>
          <button className='lg:hidden'>
            <TfiAlignRight className='text-[20px] text-primary' />
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Nav