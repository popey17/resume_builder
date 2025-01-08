import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import Button from '../button/Button'
import LinkBtn from '../button/LinkBtn'
import { TfiAlignRight } from "react-icons/tfi";
import { useAuthStore } from '../../store/AuthStore';

const Nav = () => {
  
  const [firstLetter, setFirstLetter] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const { isAuthenticated, user, signOut } = useAuthStore()
  

  useEffect(() => {
    if (user && user.name) {
      setFirstLetter(user.name.charAt(0).toUpperCase());
    }
  }, [user]);  


  const handleSignOut = async () => {
    await signOut()
  }
  

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
            {!isAuthenticated &&
              <LinkBtn href='/login'>Login</LinkBtn>
            }
            <Button href='/resume/create' link>Create Your CV</Button>
            {
              isAuthenticated &&
                <div className='bg-primary rounded-[50em] flex-shrink-0 aspect-square w-[35px] flex justify-center items-center text-white cursor-pointer hover:bg-primaryHover relative' onMouseEnter={()=> setShowDropDown(true)} onMouseLeave={()=> setShowDropDown(false)} >
                  {firstLetter}
                  {
                  showDropDown &&
                  <div className='absolute top-[100%] w-fit right-0 bg-white shadow-lg rounded-lg p-5 text-[15px] text-black'>
                    <Link to='/profile' className='block mb-[10px] hover:text-primary'>Dashboard</Link>
                    {
                      !user.isVerified && <Link to='/verify-email' className='block whitespace-nowrap mb-[10px] hover:text-primary'>Verify Email</Link>
                    }
                    <span className='block whitespace-nowrap hover:text-primary' onClick={handleSignOut}>Logout</span>
                  </div>
                }
                </div>
            }
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