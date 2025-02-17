import { FormatResponse, GenerateResponseFormatProps } from "../types/residencial/residencialTypes";


export const generateResponseFormat = ( {estatus=false, data=null, description}: GenerateResponseFormatProps):FormatResponse => {
    try {

        let response = {
            estatus: false,
            data: null,
            description: ""
        }

        response.estatus = estatus;
        response.data = data;
        response.description = description;

        return response

    } catch (error) {
        console.log(error)
        return {
            estatus: false,
            data: null,
            description: `${error}`
        }
    }



}


export const EmailList:string[]=[
    "teckblendxd@gmail.com",
    "capacitacion@visitapp.la",
    "juarezalvizoa@gmail.com",
    "florian.mata@visitapp.la",
    "soporte@visitapp.la",
    "rodolfo.visitapp@gmail.com",
    
]