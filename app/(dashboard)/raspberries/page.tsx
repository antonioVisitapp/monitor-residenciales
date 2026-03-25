"use client";

import GridContainer from "@/components/GridContainer";
import CardRaspberry from "@/components/raspberries/CardRaspberry";
import { RaspberryDetails } from "@/components/raspberries/RaspberryDetails";
import BlueSpinner from "@/components/spinner/BlueSpinner";
import { Raspberry } from "@/types/raspberry/raspberryTypes";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type RaspberryItem = {
    hostname: string;
}
export default function page() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [params, setParams] = useState<Record<string, string>>(useParams());
    const [raspberries, setRaspBerries] = useState<RaspberryItem[]>([]);
    const [raspberryInformation, setRaspberryInformation] = useState<Raspberry>({
        cpuusage: 0,
        hostname: '-',
        id_raspberry: 0,
        isconnected: false,
        memoryusagepercentage: 0,
        offlinecounter: 0,
        powerusage: 0,
        temperature: 0,
        timestamp: '-',
    });

    const handleRaspberrysByResidential = async (hostname: string) => {
        try {
            setIsLoading(true)
            console.log('/api/raspberry/getRaspberryByHostname')
            console.log(hostname)
            const { data } = await axios.post(
                `/api/raspberrys/getRaspberryByHostname`,
                {
                    hostname: hostname,
                }
            );
            setIsOpen(true)
            setIsLoading(false)
            if (!data.estatus) {
                console.log(data);
            } else {

                console.log('handleRaspberrysByResidential')
                console.log(data)
                setRaspberryInformation(data.data[0])
            }
        } catch (error) {
            closeModal()
            console.log(error)
        }
    };

    const getAllRaspberriesExist = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`/api/raspberrys/getAllRaspberriesExist`);
            if (!data.estatus) {
                console.log(data.description);
            } else {
                // setIsOpen(true)
                setRaspBerries(data.data);
                setIsLoading(false)
                return data.data[0];
            }
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {

        if (params.tenant === "login") {
            console.log('redireccion al login');

        }

        getAllRaspberriesExist();
    }, [params.tenant]);



    return (
        <div className={`w-full h-full grid grid-cols-1  
            overflow-scroll p-8
        `}>
            {
                isOpen ?
                    <RaspberryDetails
                        raspberryInformation={raspberryInformation}
                        closeModal={closeModal}
                    />
                    :
                    !isLoading &&
                    <GridContainer
                        component={
                            raspberries.length > 0 && (
                                raspberries.map((raspberry, idx) => (
                                    <CardRaspberry
                                        getRaspberryInformationByHostname={handleRaspberrysByResidential}
                                        key={raspberry.hostname}
                                        idx={idx}
                                        {...raspberry}
                                    />
                                )))}
                    >

                    </GridContainer>
            }
            {isLoading && <BlueSpinner />}
        </div>
    );

}