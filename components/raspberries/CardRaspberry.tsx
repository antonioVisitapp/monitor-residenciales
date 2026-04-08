"use client";

import { RaspberryCardProps } from "@/types/raspberry/raspberryTypes";
import Image from "next/image";

const CardRaspberry = ({
  hostname,
  idx,
  getRaspberryInformationByHostname
}: RaspberryCardProps) => {
  const isPar = idx % 2 === 0;
  const backgroundColor = isPar ? "bg-white" : "bg-[#1D6FF1]";
  const textColor = isPar ? "text-slate-700" : "text-white";

  return (
  
      <div className={`min-w-min max-h-min  shadow-xl ${isPar ? "flex-row" : "flex-row-reverse"} p-4
         rounded-xl  cursor-pointer   ${backgroundColor} ${textColor} 
         transform hover:scale-110 transition duration-300 ease-in-out 
         hover:z-50 hover:bg-[#FFB100]
         `}
        onClick={() => {
          console.log('click raspberry ', hostname)
          getRaspberryInformationByHostname(hostname)
        }}
      >
        <div className={`flex justify-between `}>
          <div
            className={`min-w-max flex rounded-full p-2  
              selection:bg-[#006C67]
              shadow-3xl ${isPar ? "bg-[#1D6FF1]" : "bg-white"
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
          <div className="text-3xl p-2 flex-nowrap">{hostname}</div>
         
        </div>
      </div>
    
  );
};

export default CardRaspberry;
