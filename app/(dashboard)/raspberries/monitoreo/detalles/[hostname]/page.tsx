import { formatDate } from "@/app/utils/utils";
import BlueSpinner from "@/components/spinner/BlueSpinner";
import { getAllRaspberrysByHostname } from "@/services/RaspberryServices";
import { Raspberry } from "@/types/raspberry/raspberryTypes";

const getLogsByRaspberriyByHostname = async (hostname: string) => {

  try {
    // console.log('getLogsByRaspberriyByHostname hostname',hostname)
    const { estatus, data, description } = await getAllRaspberrysByHostname(hostname);
    if (!estatus) return
    return data
  } catch (error) {
    console.log(error)
  }
}

type Props = {
  params: {
    hostname: string;
  }
}
async function page({ params }: Props) {
  // console.log('params',params)


  const logs = await getLogsByRaspberriyByHostname(params.hostname);


  return (
      <div className=" w-full h-full flex bg-slate-400 overflow-scroll">
          {logs?
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ID
                </th> */}
                <th  className="">
                  Nombre
                </th>
                <th  className="">
                  Fecha
                </th>
                <th  className="">
                  CPU
                </th>
                <th  className="">
                  Memoria
                </th><th  className="">
                  Temperatura
                </th><th  className="">
                  Energia
                </th>
                <th  className="">
                  Desconexiones
                </th>
                <th  className="">
                  Estatus
                </th>

              </tr>
            </thead>
            <tbody>
              {logs && logs.length > 0 &&
                logs.map(log =>
                  <tr key={`${log.hostname}${log.timestamp}`} className="bg-white border-b dark:bg-gray-800 ">
                    {/* <td className="px-6 py-4">{log.id_raspberry}</td> */}
                    <td className="">{log.hostname}</td>
                    <td className="">{formatDate(log.timestamp)?.stringDate}</td>
                    <td className="">{log.cpuusage.toFixed(2)}</td>
                    <td className="">{`${log.memoryusagepercentage.toFixed(2)}%`}</td>
                    <td className="">{log.temperature}</td>
                    <td className="">{log.powerusage.toFixed(2)}</td>
                    <td className=" text-center">{log.offlinecounter}</td>
                    <td className={` text-center text-white${log.isconnected ? 'bg-green-600 ' : 'bg-red-600 '}`}>{log.isconnected ? 'Online' : 'Offline'}</td>
                  </tr>
                )
                
                // <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                //   <td className="px-6 py-4">{'na'}</td>
                //   <td className="px-6 py-4">{'na'}</td>
                //   <td className="px-6 py-4">{'na'}</td>
                //   <td className="px-6 py-4">{'na'}</td>
                //   <td className="px-6 py-4">{'na'}</td>
                //   <td className="px-6 py-4">{'na'}</td>
                //   <td className="px-6 py-4">{'na'}</td>

                // </tr>
               
              }


            </tbody>
          </table>
          :
            <BlueSpinner/>
            }
      </div>
  )
}

export default page