import { sendNotificactionRedidentialIsDown } from "@/services/ResidentialsServices";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextResponse } from "next/server";

export async function POST() {
    try {

        const { estatus, data, description } = await sendNotificactionRedidentialIsDown();
        if (!estatus) {
            console.log(description)
            return NextResponse.json(generateResponseFormat({ description: description }));
        }
        else {
            return NextResponse.json(generateResponseFormat({ estatus: true, description: description, data: data, }));
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(generateResponseFormat({ description: `${error}` }));
    }
}

