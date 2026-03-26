
import GridContainer from "@/components/GridContainer";
import CardResidential from "@/components/residentials/CardResidential";
import BlueSpinner from "@/components/spinner/BlueSpinner";
import { ResidentialInformation } from "@/types/residencial/residencialTypes";
import axios from "axios";
import { useEffect, useState } from "react";

function page() {



    const [data, setData] = useState<ResidentialInformation[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleResidentials = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(`/api/residenciales/getAllResidentials`, {});
            if (!data.estatus) {
                console.log(data);
                return;
            }
            setData(data.data);
            setIsLoading(false)

        } catch (error) {
            console.log(error);
        }
    };

    const setStatusDisabledToResidentials = async () => {
        try {
            const { data } = await axios.post(`/api/residenciales/setDownStatusToResidentials`, {});
            if (!data.estatus) {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const sendNotificationsByResidentialStatus = async () => {
        try {
            const { data } = await axios.post(`/api/residenciales/sendPushNotification`, {});
            if (!data.estatus) {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };
    const sendEmailByResidentialStatus = async () => {
        try {

            const { data } = await axios.post(`/api/residenciales/sendEmail`, {});
            if (!data.estatus) {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };




    useEffect(() => {

        handleResidentials()

        const intervalId1 = setInterval(() => {
            setStatusDisabledToResidentials();
        }, 1000 * 60 * 15);

        const intervalId2 = setInterval(() => {
            handleResidentials();
        }, 1000 * 60 * 0.20);
        const intervalId3 = setInterval(() => {
            sendNotificationsByResidentialStatus();
            sendEmailByResidentialStatus();
        }, 1000 * 60 * 10);

        // Limpia los intervalos al desmontar el componente
        return () => {

            clearInterval(intervalId1);
            clearInterval(intervalId2);
            clearInterval(intervalId3);
        };
    }, [])


    return (
        <div className={`w-full h-full 
            overflow-scroll
        `}>
            {isLoading ?
                <BlueSpinner />
                : <GridContainer
                    component={
                        data && data.length > 0 &&
                        // <div className="w-full h-screen overflow-scroll bg-green-300">
                        //     {

                        data.map((residential: ResidentialInformation) => (
                            <CardResidential
                                key={residential.tenant}
                                {...residential}
                            />
                        ))
                        // }
                        //  </div>
                    }
                />
            }

        </div>
    )
}

export default page;