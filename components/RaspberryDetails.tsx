"use client";

import { formatDate } from "@/app/utils/utils";
import { Raspberry } from "@/types/raspberry/raspberryTypes";
import Link from "next/link";

interface RaspberryDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  raspberryInformation: Raspberry | undefined;
}

export const RaspberryDetails = ({
  isOpen,
  closeModal,
  raspberryInformation,
}: RaspberryDetailsProps) => {
  return (
    <div
      className={`w-full h-full fixed flex flex-col items-center top-16 z-50 overflow-scroll `}
    >

      <div className="w-[80%] p-2 min-h-min flex flex-col text-xl font-semibold bg-black bg-opacity-65 shadow-2xl outline text-slate-100 
       wrap     items-center  rounded-3xl">
        <div onClick={closeModal} className=" w-full flex flex-row justify-end p-4 text-3xl text-red-700  font-bold cursor-pointer rounded-3xl ">
          X
        </div>
        <div className="w-[90%] h-full flex flex-col items-center">
          <p className="p-2">{`Id: `} <span className="font-normal">{raspberryInformation?.id_raspberry}</span> </p>
          <p className="p-2">{``} <span className="font-normal">{raspberryInformation?.hostname}</span> </p>
          <p className="p-2">{`Uso de cpu: `} <span className="font-normal">{raspberryInformation?.cpuusage.toFixed(2)}</span> </p>
          <p className="p-2">{`Conexion: `} <span className="font-normal">{raspberryInformation?.isconnected ? 'Online' : 'Offline'}</span> </p>
          <p className="p-2">{`Memoria utilizada: `} <span className="font-normal">{`${raspberryInformation?.memoryusagepercentage.toFixed(2)}%`}</span> </p>
          <p className="p-2">{`Desconexiones: `} <span className="font-normal">{raspberryInformation?.offlinecounter}</span> </p>
          <p className="p-2">{`Energia: `} <span className="font-normal">{raspberryInformation?.powerusage.toFixed(2)}</span> </p>
          <p className="p-2">{`Temperatura: `} <span className="font-normal">{raspberryInformation?.temperature.toFixed(2)}</span> </p>
          <p className="p-2">{`Fecha: `} <span className="font-normal">{formatDate(raspberryInformation?.timestamp || '')?.stringDate}</span> </p>
        </div>
        <Link href={`/raspberrys/monitoreo/detalles/${raspberryInformation?.hostname.replaceAll(' ','-')}`} className="p-4 bg-red-500 rounded-2xl cursor-pointer hover:bg-black hover:scale-110 ">Detalles avanzados</Link>
      </div>
    </div>
  );
};
