

import { formatDate } from "@/app/utils/utils";
import { Raspberry } from "@/types/raspberry/raspberryTypes";
import Link from "next/link";
import CloseButton from "../buttons/CloseButton";

interface RaspberryDetailsProps {
  closeModal: () => void;
  raspberryInformation: Raspberry;
}

export const RaspberryDetails = ({
  closeModal,
  raspberryInformation: {
    cpuusage,
    hostname,
    id_raspberry,
    isconnected,
    memoryusagepercentage,
    offlinecounter,
    powerusage,
    temperature,
    timestamp },
}: RaspberryDetailsProps) => {
  return (
    <div
      className={`max-w-[90%] h-full  flex items-center justify-center z-50 overflow-scroll m-4 `}
    >

      <div className="w-full  p-2 min-h-min flex flex-col text-xl font-semibold bg-black bg-opacity-35 shadow-2xl outline text-slate-100 
          items-center  rounded-3xl">
        <div  className=" w-full flex flex-row justify-end ">
          <CloseButton onClick={closeModal} />
        </div>
        <div className="w-[90%] h-full flex flex-col items-start md:items-center">
          <p className="p-2">{``} <span className="font-normal md:text-3xl">{hostname}</span> </p>
          <p className="p-2">{`CPU: `} <span className="font-normal">{cpuusage.toFixed(2)}</span> </p>
          <p className="p-2">{`Status: `} <span className="font-normal">{isconnected ? 'Online' : 'Offline'}</span> </p>
          <p className="p-2">{`RAM: `} <span className="font-normal">{`${memoryusagepercentage.toFixed(2)}%`}</span> </p>
          <p className="p-2">{`Desconexiones: `} <span className="font-normal">{offlinecounter}</span> </p>
          <p className="p-2">{`Energia: `} <span className="font-normal">{`${powerusage.toFixed(2)}/V`}</span> </p>
          <p className="p-2">{`Temperatura: `} <span className="font-normal">{temperature.toFixed(2)}(°C)</span> </p>
          <p className="p-2">{`Fecha: `} <span className="font-normal">{formatDate(timestamp || '')?.stringDate}</span> </p>
        </div>
        <div className="w-[90%] h-full flex flex-col md:flex-row items-center justify-center gap-8 p-4">

          <Link
            href={`/raspberries/monitoreo/detalles/${hostname.replaceAll(' ', '-')}`}
            className="p-4  bg-red-500 rounded-2xl cursor-pointer
          hover:bg-black hover:scale-110 ">Información Avanzada</Link>
          <Link href={`/raspberrys/monitoreo/detalles/${hostname.replaceAll(' ', '-')}`}
            className="p-4  bg-blue-700 rounded-2xl cursor-pointer
          hover:bg-black hover:scale-110 ">Historial de Qrs</Link>
        </div>
      </div>
    </div>
  );
};
