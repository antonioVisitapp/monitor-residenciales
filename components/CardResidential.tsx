import Image from 'next/image'
import Link from 'next/link'

interface CardResidentialProps {
  tenant: string,
  estatus: number,
  api_server: string,
  lastconnection:string,
}


function CardResidential({ tenant, estatus, api_server,lastconnection }: CardResidentialProps) {


  return (
    
    <Link href={`/${tenant}`}  className="w-full  min-h-min  max-h-[15%] p-4 flex flex-row wrap   items-center  rounded-2xl  bg-blue-400 cursor-pointer
     hover:bg-slate-200 text-black" >
        <Image priority width={60} height={55} alt='image' src='/assets/images/monitor.png'  />
      
      <div className="w-1/4 min-h-min">
        <p className="text-3xl font-semibold">
          {tenant.toUpperCase()}
        </p>
      </div>
      <div className="w-1/4 min-h-min">
        <div className="font-semibold w-[56px] h-[56px]">
          {
            estatus
              ? <Image priority width={60} height={55} alt='image'  src='/assets/images/correct.png' />
              : <Image priority width={60} height={55} alt='image'  src='/assets/images/incorrect.png' />
          }
        </div>
      </div>
      <div className="w-1/4 min-h-min">
        <p className="text-xl font-semibold text-white">
          Conectado a 
        </p>
        <p className="  w-full" >
         {api_server}
        </p>
      
      </div>
      <div className="w-1/4 min-h-min">
        <p className="text-xl font-semibold text-white">
          Ultima conexion
        </p>
        <p className="text-xl font-semibold">
          {lastconnection}
        </p>
      </div>
      
    </Link>
  )
}

export default CardResidential