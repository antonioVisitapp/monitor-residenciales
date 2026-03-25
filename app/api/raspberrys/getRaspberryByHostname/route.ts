import { getRaspberrysByHostname as getRaspberrysByHostname } from "@/app/controllers/RaspberrysController";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        let body = await request.json();
        let {  hostname}=body;

        const { estatus, data, description } = await getRaspberrysByHostname(hostname);
        if (estatus) {
            return NextResponse.json(generateResponseFormat({ estatus: true, data: data, description: `Succesfull get raspberry information by tenant` }));
        } else {
            return NextResponse.json(generateResponseFormat({ data: data, description: description }));
        }
    } catch (error) {
        return NextResponse.json(generateResponseFormat({ description: `Error to  raspberry´s register data by tenant ${error}` }));
    }
}