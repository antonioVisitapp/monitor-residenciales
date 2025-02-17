"use client";

import CardRaspberry from "@/components/CardRaspberry";
import { RaspberryDetails } from "@/components/RaspberryDetails";
import { Raspberry } from "@/types/raspberry/raspberryTypes";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function RaspberrysList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const [params, setParams] = useState<any>(useParams());
  const [raspberrys, setRaspBerrys] = useState<Raspberry[]>([]);
  const [raspberryInformation, setRaspberryInformation] = useState<Raspberry | undefined>();

  const handleRaspberrysByResidential = async () => {
    try {
      const { data } = await axios.post(
        `/api/raspberrys/getAllRasberrysByTenant`,
        {
          tenant: params.tenant,
        }
      );
      console.log(data)

      if (!data.estatus) {
        console.log(data);
      } else {
        setRaspBerrys(data.data);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {

    if (params.tenant==="login") {
      console.log('redireccion al login');
      
    }

    handleRaspberrysByResidential();
  }, [params.tenant]);

  const getRaspberryInformation = async (idRaspberry: number) => {
    try {
      console.log('getRaspberryInformation')
      const { data } = await axios.post(`/api/raspberrys/getRaspberryById`, {
        idRaspberry,
      });
console.log(data)
      if (!data.estatus) {
        console.log(data.description);
      } else {
        setIsOpen(true)
        setRaspberryInformation(data.data[0]);
        return data.data[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-full min-w-full z-0">
      <div className=" text-6xl font-bold text-gray-500 text-center p-8">{`Raspberrys de ${params?.tenant}`}</div>

      <div className="flex flex-row flex-wrap  mx-auto items-center justify-center">
        {raspberrys.length ? (
          raspberrys.map((raspberry: Raspberry, idx) => (
            <CardRaspberry
            getRaspberryInformation={getRaspberryInformation}
              key={raspberry.id_raspberry}
              idx={idx}
              {...raspberry}
            />
          ))
        ) : (
          <div className="w-full h-screen flex items-center justify-center">

          <p className="text-3xl font-bold">Residencial sin raspberrys...</p>
          </div>
        )}
      </div>

      {isOpen && (
        <RaspberryDetails
          raspberryInformation={raspberryInformation}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default RaspberrysList;
