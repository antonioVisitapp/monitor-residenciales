"use client";

import { RaspberryProps } from "@/types/raspberry/raspberryTypes";
import Image from "next/image";

const CardRaspberry = ({
  id_raspberry,
  timestamp,
  cpuusage,
  memoryusagepercentage,
  temperature,
  powerusage,
  isconnected,
  hostname,
  offlinecounter,
  idx,
  getRaspberryInformation
}: RaspberryProps) => {
  const isPar = idx % 2 === 0;
  const backgroundColor = isPar ? "bg-white" : "bg-[#1D6FF1]";
  const textColor = isPar ? "text-slate-700" : "text-white";

 

  return (
    <>
      <div
      onClick={()=>{
        getRaspberryInformation(id_raspberry)
      }}
        className={`min-w-min flex flex-row shadow-xl ${
          isPar ? "flex-row" : "flex-row-reverse"
        }
         rounded-xl  cursor-pointer   p-2 m-4 ${backgroundColor} ${textColor} transform hover:scale-110 transition duration-300 ease-in-out  `}
      >
        <div className={` flex   justify-between  gap-4 `}>
          <div
            className={`min-w-max flex rounded-full p-4 my-[30%] shadow-3xl ${
              isPar ? "bg-[#1D6FF1]" : "bg-white"
            }`}
          >
            <Image
              width={150}
              height={100}
              alt="raspberry-pi.png"
              src={"/assets/images/raspberry-pi.png"}
              priority
            />
          </div>
        </div>
        <div className="">
          <div className="text-3xl p-2">{hostname}</div>
          <div className="text-base flex items-center m-4 p-4">
            <Image
              width={25}
              height={25}
              alt="raspberry-pi.png"
              src={"/assets/images/temperatura.png"}
            />
            {temperature}
          </div>
          <div className="text-base flex items-center m-4 p-4">
            <Image
              width={25}
              height={25}
              alt="raspberry-pi.png"
              src={"/assets/images/ram.png"}
            />
            {`${"RAM"}`}
          </div>
          <div className="text-base flex items-center m-4 p-4">
            <Image
              width={25}
              height={25}
              alt="raspberry-pi.png"
              src={"/assets/images/internet.png"}
            />
            {`${"Internet"}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRaspberry;
