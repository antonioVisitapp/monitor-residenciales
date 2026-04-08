import os from "os";

export const formatDate = (stringDate: string) => {
    let resp = {
        estatus: false,
        stringDate: "",
        description: ""
    }
    try {
        if (!stringDate) {
            resp.estatus=false;
            resp.description = `Error to set format stringDate id :${stringDate}`
        }
        let date = new Date(stringDate);

        resp.stringDate = date.toLocaleString('es-MX', {
            timeZone: "America/Mexico_City",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
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