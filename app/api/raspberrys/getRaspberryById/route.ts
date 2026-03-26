import { getRaspberrysById } from "@/services/RaspberryServices";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        let body = await request.json();
        let { idRaspberry}=body;

        const { estatus, data, description } = await getRaspberrysById(idRaspberry);
        if (estatus) {
            return NextResponse.json(generateResponseFormat({ estatus: true, data: data, description: `Succesfull get raspberry information by id` }));
        } else {
            return NextResponse.json(generateResponseFormat({ data: data, description: `Succesfull get raspberry information by id` }));
        }
    } catch (error) {
        return NextResponse.json(generateResponseFormat({ description: `Error to  get raspberry data y id ${error}` }));
    }
}