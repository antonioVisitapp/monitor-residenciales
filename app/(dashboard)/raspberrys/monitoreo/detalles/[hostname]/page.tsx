'use client'

import { formatDate } from "@/app/utils/utils";
import { Raspberry } from "@/types/raspberry/raspberryTypes";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";


function DetailRaspberrysScreen() {

  let params = useParams();
  const [logs, setLogs] = useState<Raspberry[] | undefined>(undefined)

  const getLogsByRaspberryHostname = async (hostname: string) => {
    try {
      const { data } = await axios.post(`/api/raspberrys/getAllRaspberrysByHostname`, {
        hostname: hostname
      })

      if (data.estatus) {
        console.log(data.data)
        setLogs(data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let hostname=`${params.hostname}`
    hostname.replaceAll('-',' ')
    getLogsByRaspberryHostname(`${hostname}`);
  }, [params])

  return (
    <>
      <div className=" w-full h-full flex flex-col bg-slate-400">
        <div className=" w-full h-full mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  CPU
                </th>
                <th scope="col" className="px-6 py-3">
                  Memoria
                </th><th scope="col" className="px-6 py-3">
                  Temperatura
                </th><th scope="col" className="px-6 py-3">
                  Energia
                </th>
                <th scope="col" className="px-6 py-3">
                  Desconexiones
                </th>
                <th scope="col" className="px-6 py-3">
                  Estatus
                </th>
                
              </tr>
            </thead>
            <tbody>
              {logs ?
                logs.map(log =>
                  <tr key={`${log.hostname}${log.timestamp}`} className="bg-white border-b dark:bg-gray-800 ">
                    <td className="px-6 py-4">{log.id_raspberry}</td>
                    <td className="px-6 py-4">{log.hostname}</td>
                    <td className="px-6 py-4">{formatDate(log.timestamp)?.stringDate}</td>
                    <td className="px-6 py-4">{log.cpuusage.toFixed(2)}</td>
                    <td className="px-6 py-4">{`${log.memoryusagepercentage.toFixed(2)}%`}</td>
                    <td className="px-6 py-4">{log.temperature}</td>
                    <td className="px-6 py-4">{log.powerusage.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">{log.offlinecounter}</td>
                    <td className={`px-6 py-4 text-center text-white${log.isconnected?'bg-green-600 ':'bg-red-600 '}`}>{log.isconnected? 'Online' : 'Offline'}</td>
                  </tr>
                )
                :
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{'na'}</td>
                  <td className="px-6 py-4">{'na'}</td>
                  <td className="px-6 py-4">{'na'}</td>
                  <td className="px-6 py-4">{'na'}</td>
                  <td className="px-6 py-4">{'na'}</td>
                  <td className="px-6 py-4">{'na'}</td>
                  <td className="px-6 py-4">{'na'}</td>
                  
                </tr>
              }


            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DetailRaspberrysScreen