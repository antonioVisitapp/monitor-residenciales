import { getResidentials } from "@/app/controllers/ResidentialsController";
import PostgreSQLConnection from "@/connection/PostgreSQLConnection";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextResponse } from "next/server";

export async function POST() {
let conn;
    try {
        conn=new PostgreSQLConnection();

    //    await conn.createTableIfNoExist();
    //    await conn.createTableIfNoExistRaspberrys();
    //    await conn.createTableIfNotExistUsuarios();
    // //    await conn.alterTableResidential();


        const { estatus, data, description } = await getResidentials();
        if (!estatus) {
            console.log(description)
            return NextResponse.json(generateResponseFormat({ description: description }));
        } 
        else {
            return NextResponse.json(generateResponseFormat({ estatus: true, description: "Succesfull get residentials", data:data, }));
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(generateResponseFormat({ description: `${error}`, }))


    }
}