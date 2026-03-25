import Image from 'next/image'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export const Login = () => {

    return (
        <>

            <div className="w-full h-screen flex  justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 p-4
             ">

                <div className="flex flex-col items-center  h-full rounded-3xl overflow-scroll bg-white  shadow-2xl 
                md:w-[85%] 
                
                ">
                    <div className=' w-[90%]  flex  items-start rounded-xl p-8  '>
                        <label className='font-bold text-black text-2xl'>Sign In</label>
                    </div>

                    <Image src={`/assets/svg/login.svg`}
                        width={400}
                        height={400}
                        priority alt='login image'
                    />

                    <p 
                    className=' text-black text-base
                     lg:w-1/2 lg:gap-8 lg:text-2xl lg:text-center
                    '
                    >{`Don't have a account?`} 
                        <span className='text-violet-700  cursor-pointer hover:underline  xl:font-semibold'> Sign Up</span>
                        </p>
                    <div className=' w-[90%]   flex flex-col justify-center items-start  rounded-xl p-8 gap-4 font-semibold 
                    xl:w-1/2 xl:gap-8 xl:text-2xl 
                    
                    '>
                        <label htmlFor="email" className="text-start">Email</label>
                        <input className='w-full bg-slate-300   rounded-lg p-4 focus:outline-none text-start'
                            type='email'
                            placeholder='Email' />
                        <label htmlFor="password" className="">Password</label>

                        <input className='w-full bg-slate-300 min-w-[50%] rounded-lg p-4 focus:outline-none text-start'
                            type='password'
                            placeholder='Password' />
                        <div className='flex flex-row justify-end'>
                            <label className=' text-violet-700 cursor-pointer hover:underline  text-base lg:font-semibold lg:text-xl underline'>Forgot your password? </label>

                        </div>
                    </div>

                    <div className=' w-[90%] xl:w-1/2 xl:gap-12 xl:text-2xl   flex flex-col justify-center items-start bg-leyyow-400 rounded-xl p-8 gap-6 font-semibold  '>
                        <Link 
                        href={`/dashboard`} 
                        className='text-center w-full bg-[#1d6ff1] p-6 rounded-xl text-white font-bold hover:bg-[#00d4ff]
                       
                        ' 
                        type='submit'>Sign In</Link>

                        <div className='flex flex-row justify-evenly w-full'>
                            <div className='flex flex-row w-full justify-center items-center  bg-gray-500 p-6 rounded-xl text-white  hover:bg-[#00d4ff]
                           
                            '><FcGoogle />oogle</div>
                        </div>

                    </div>
                </div>

            </div>

            <div>

            </div>






        </>
    )
}
