import { setStatusDownToAllResidentials } from "@/app/controllers/ResidentialsController";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextResponse } from "next/server";

export async function POST() {
    try {

        console.log('metodo GET para bajar los residenciales')
        const { estatus, data, description } = await setStatusDownToAllResidentials();
        if (!estatus) {
            console.log(description)
            return NextResponse.json(generateResponseFormat({ description: description }));
        }
        else {
            return NextResponse.json(generateResponseFormat({ estatus: true, description: "Succesfull change status of residentials", data: data, }));
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(generateResponseFormat({ description: `${error}` }));
    }
}

