import { sendEmail } from "@/app/controllers/ResidentialsController";
import { generateResponseFormat } from "@/helpers/helpers";
import { SendMailProps } from "@/types/email/emailTypes";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        let mailOptions: SendMailProps = {
            to: ``,//destinatario
            subject: `Reporte de residenciales`, //asunto
            text: `Este correo es solo informativo, no es necesario contestar.`,//cuerpo del correo en texto plano
            html: '',//cuerpo html del correo
        }
        const { estatus, data, description } = await sendEmail(mailOptions);
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

