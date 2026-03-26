import Image from 'next/image'
import Link from 'next/link'

interface CardResidentialProps {
  tenant: string,
  estatus: number,
  api_server: string,
  lastconnection: string,
}


function CardResidential({ tenant, estatus, api_server, lastconnection }: CardResidentialProps) {


  return (

    <Link href={`/${tenant}`} className="w-full   h-full
    flex flex-col justify-center items-center lg:p-8
    rounded-2xl  bg-[#1D6FF1] cursor-pointer
    hover:bg-[#FFB100] text-white 
    ">

      <div className="w-full flex justify-around items-center  p-2 ">
        <Image priority width={60} height={55} alt='image' src='/assets/images/monitor.png' />

        <p className="text-xl md:text-3xl font-semibold p-4">
          {tenant.toUpperCase()}
        </p>
      </div>
      <Image priority width={60} height={55} alt='image' src={estatus ? '/assets/images/correct.png' : '/assets/images/incorrect.png'} />
      <div className="w-full min-h-min flex flex-col justify-center items-center">
        <p className="lg:text-2xl text-xl font-semibold text-white">
          Conectado a: 
        </p>
        <p className="lg:text-2xl text-xl" >
          {api_server}
        </p>
        <p className="lg:text-2xl text-xl font-semibold text-white">
          Ultima conexion
        </p>
        <p className="lg:text-xl text-xl ">
          {lastconnection}
        </p>

      </div>

    </Link>
  )
}

export default CardResidential