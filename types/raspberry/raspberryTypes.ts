
export interface Raspberry {
    id_raspberry: number,
    timestamp: string,
    cpuusage: number,
    memoryusagepercentage: number,
    temperature: number,
    powerusage: number,
    isconnected: boolean,
    hostname: string,
    offlinecounter: number
}



export interface RaspberryProps {
    id_raspberry: number,
    timestamp: string,
    cpuusage: number,
    memoryusagepercentage: number,
    temperature: number,
    powerusage: number,
    isconnected: boolean,
    hostname: string,
    offlinecounter: number,
    idx: number,
    getRaspberryInformation:(idRaspberry:number)=>{}
}

export interface AddNewRaspberryParams {
    timeStamp: string | undefined,
    cpuUsage: number | undefined,
    memoryUsagePercentage: number | undefined,
    temperature: number | undefined,
    powerUsage: number | undefined,
    isConnected: boolean | undefined,
    hostName: string | undefined,
    offLineCounter: number | undefined,
}