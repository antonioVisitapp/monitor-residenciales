import {  getRaspberrysByResidential } from "@/services/RaspberryServices";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        let body = await request.json();
        let {tenant}=body;
        const { estatus, data, description } = await getRaspberrysByResidential(tenant);
        if (estatus) {
            return NextResponse.json(generateResponseFormat({ estatus: true, data: data, description: `Succesfull get raspberrys by residential` }));
        } else {
            return NextResponse.json(generateResponseFormat({ data: data, description: `Problem to get raspberrys for ${tenant} , ${description}` }));
        }
    } catch (error) {
        return NextResponse.json(generateResponseFormat({ description: `Error to  get raspberrys by residential ${error}` }));
    }
}
