import { getAllRaspberrysByHostname as getAllRaspberrysByHostname } from "@/services/RaspberryServices";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        let body = await request.json();
        let { hostname}=body;
        console.log('hostname recibido',hostname)

        const { estatus, data, description } = await getAllRaspberrysByHostname(hostname);
        if (estatus) {
            return NextResponse.json(generateResponseFormat({ estatus: true, data: data, description: `Succesfull get all raspberrys  by hostname` }));
        } else {
            return NextResponse.json(generateResponseFormat({ data: data, description: description }));
        }
    } catch (error) {
        return NextResponse.json(generateResponseFormat({ description: `Error to  get all raspberrys by hostname ${error}` }));
    }
}