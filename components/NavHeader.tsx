'use client'
import IGlogo from '@/assets/IG-text-logo.png'
import { OpenPostModal } from '@/redux/features/PostModalSlice'
import { AppDispatch } from '@/redux/store'
import { SidebarLinks } from '@/utils/Sidebar'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { HeartIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import DefaultUserImage from '@/assets/Default-User-Image.png'

function NavHeader() {
  const {data: session} = useSession()
  const dispatch = useDispatch<AppDispatch>()
  const OpenModal = () => {
    dispatch(OpenPostModal())
  }
  return (
   <>
    <nav className = 'flex md:hidden fixed top-0 left-0 right-0 w-full border-y-gray-200 border'>
        <div className  = 'w-full flex items-center justify-between space-x-5 px-5'>
            <Image src = {IGlogo} alt = 'Instagram logo' width={100} height = {30} className  ='object-contain' />
            <form className = 'flex items-center bg-gray-100 max-w-[350px] py-2 px-3 rounded-lg space-x-2 flex-1'>
                <MagnifyingGlassIcon className = 'w-5 h-5 text-gray-500' />
                <input type = 'text' placeholder = 'Search' className  = 'font-normal text-base bg-transparent outline-none text-gray-800 placeholder:font-light placeholder:text-gray-500 flex-1 px-2' />
            </form>
            <div className   = 'relative'>
            <HeartIcon className  = 'relative w-8  h-8 text-black cursor-pointer duration-100 transition transform hover:scale-105 ease-in-out' />
            <span className = 'bg-red-500 absolute w-[9px] h-[9px] rounded-full top-[2px] z-10 right-[2px]' />
            </div>
        </div>
    </nav>
    <nav className = 'flex md:hidden fixed bottom-0 left-0 right- w-full z-10 backdrop-blur-sm bg-white/80'>
      <div className='flex items-center justify-evenly space-x-2 py-3 w-full'>
      {SidebarLinks.map((link, indx) => 
        <link.Icon key = {indx} className='hover:scale-110 duration-100 transform transition ease-in cursor-pointer w-7 h-7 text-black' />
        )}
          {session && <PlusCircleIcon onClick={OpenModal} className='hover:scale-10510 duration-100 transform transition ease-in cursor-pointer w-7 h-7 text-black' />}
          {session ? (
            <Image
              src={session?.user?.image as string}
              alt='Sign Out'
              onClick={() => signOut()}
              width={30}
              height={30}
              className='hover:scale-110 duration-100 transform transition ease-in cursor-pointer rounded-full'
            />
          ) : (
            <Image
              src={DefaultUserImage}
              alt='Sign In'
              onClick={() => signIn()}
              width={40}
              height={40}
              className='hover:scale-110 duration-100 transform transition ease-in cursor-pointer rounded-full'
            />
          )}
      </div>
    </nav>
    </>
  )
}

export default NavHeader