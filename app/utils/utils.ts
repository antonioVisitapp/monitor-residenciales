import os from "os";

export const formatDate = (stringDate: string) => {
    let resp = {
        estatus: false,
        stringDate: "",
        description: ""
    }
    try {
        if (!stringDate) {
            resp.description = `Error to set format stringDate id :${stringDate}`
        }
        else {
            let date = new Date(stringDate);
            resp.estatus = true;
            resp.description = "success";
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const seconds = date.getUTCSeconds();
            resp.stringDate = `${date.toLocaleDateString()} a las ${hours}:${minutes}:${seconds}`;
        }
        return resp
    } catch (error) {
        resp.description = `${error}`
    }
}


//get ram ram information
export const getRamInformation = () => {
    try {

        // Memoria total en bytes
        const totalMemory = os.totalmem();

        // Memoria libre en bytes
        const freeMemory = os.freemem();

        // Memoria usada en bytes
        const usedMemory = totalMemory - freeMemory;

        // Convertir de bytes a megabytes para mayor legibilidad
        const totalMemoryMB = (totalMemory / 1024 / 1024).toFixed(2);
        const usedMemoryMB = (usedMemory / 1024 / 1024).toFixed(2);
        const freeMemoryMB = (freeMemory / 1024 / 1024).toFixed(2);

        return [totalMemoryMB, usedMemoryMB, freeMemoryMB]
    } catch (error) {

        console.log(`Error in getRamInformation ${error}`)
    }

}