import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export const Login = () => {

    return (
        <>

            <div className="w-full h-screen flex  justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 ">
                <div className="flex flex-col items-center justify-center mx-auto gap-4 p-4 min-w-[40%] h-2/3 rounded-3xl overflow-auto bg-white  shadow-2xl ">
                <Image src={`/assets/svg/login.svg`} width={300} height={200}  alt='login image' />
                    <p className='font-bold text-black text-2xl'>Sign In</p>
                    <p className=' text-black text-base'>{`Don't have a account?`} <span className='text-violet-700 cursor-pointer hover:underline'>Sign Up</span></p>
                    <input className='bg-slate-300 min-w-[50%] rounded-lg p-2 focus:outline-none' type='email' placeholder='Email' />
                    <input className='bg-slate-300 min-w-[50%] rounded-lg p-2 focus:outline-none' type='password' placeholder='Password' />
                    <div className='flex flex-row justify-end'>
                        <p className=' text-violet-700 cursor-pointer hover:underline  text-base'>Forgot your password? </p>
                    </div>

                    <Link href={`/dashboard`} className='text-center min-w-[40%] bg-[#1d6ff1] p-2 rounded-xl text-white font-bold hover:bg-[#00d4ff]' type='submit'>Sign In</Link>

                    <div className='flex flex-row justify-evenly min-w-[40%]'>
                        <div className='flex flex-row w-full justify-center items-center  bg-gray-500 p-2 rounded-xl text-white  hover:bg-[#00d4ff]'><FcGoogle />oogle</div>
                    </div>
                </div>
            </div>
            <div>
            </div>






        </>
    )
}
