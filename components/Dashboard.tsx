'use client'

import axios from "axios";
import {  useEffect, useState } from "react";
import { ResidentialInformation } from "@/types/residencial/residencialTypes";
import CardResidential from "./CardResidential";



export const Dashboard = () => {


  const [data, setData] = useState<ResidentialInformation[]>([])

  const handleResidentials = async () => {
    try {
      const { data } = await axios.post(`/api/residenciales/getAllResidentials`,{});
      if (!data.estatus) {
        console.log(data);
        return;
      }
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setStatusDisabledToResidentials = async () => {
    try {
      const { data } = await axios.post(`/api/residenciales/setDownStatusToResidentials`,{});
      if (!data.estatus) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendNotificationsByResidentialStatus = async () => {
    try {
      const { data } = await axios.post(`/api/residenciales/sendPushNotification`,{});
      if (!data.estatus) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendEmailByResidentialStatus = async () => {
    try {

      const { data } = await axios.post(`/api/residenciales/sendEmail`,{});
      if (!data.estatus) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  
useEffect(  () => {
  handleResidentials()

  const intervalId1 = setInterval(() => {
     setStatusDisabledToResidentials();
  }, 1000*60*15);

  const intervalId2 = setInterval(() => {
    handleResidentials();
  }, 1000*60*0.20);
  const intervalId3 = setInterval(() => {
    sendNotificationsByResidentialStatus();
    sendEmailByResidentialStatus();
  }, 1000*60*10);

  // Limpia los intervalos al desmontar el componente
  return () => {

    clearInterval(intervalId1);
    clearInterval(intervalId2);
    clearInterval(intervalId3);
    
  };
}, [])


  return (
    <div
      className="w-full h-full text-black text-center bg-gradient-to-r bg-zinc-250"
    >
      <h1 className="text-3xl m-4 pt-4 font-bold">Monitoreo de residenciales</h1>
      <div className="w-full h-screen bg-blue-700">
        <div
          id="container"
          className="w-full  h-screen flex flex-row flex-wrap p-8 "
        >
          {data && data.length ?

            data.map((residential: ResidentialInformation) => (
              <CardResidential key={residential.tenant} {...residential} />
            )
            )
            :
            <p className='text-3xl'>Sin residenciales</p>
          }
        </div>
      </div>
    </div>
  )
}
