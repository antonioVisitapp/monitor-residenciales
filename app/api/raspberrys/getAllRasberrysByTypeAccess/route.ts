import {  getRaspberrysByTyAccess } from "@/app/controllers/RaspberrysController";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        let body = await request.json();

        let {typeAccess}=body;
        

        const { estatus, data, description } = await getRaspberrysByTyAccess(typeAccess);
        if (estatus) {
            return NextResponse.json(generateResponseFormat({ estatus: true, data: data, description: `Succesfull get raspberry information by type access` }));
        } else {
            return NextResponse.json(generateResponseFormat({ data: data, description: `Problem to get raspberrys for ${typeAccess} , ${description}` }));
        }
    } catch (error) {
        return NextResponse.json(generateResponseFormat({ description: `Error to  get raspberry data by type access ${error}` }));
    }
}