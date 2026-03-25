import { getAllRaspberriesExist } from "@/app/controllers/RaspberrysController";
import { NextResponse } from "next/server";

export async function POST() {


    const response = await getAllRaspberriesExist();

    
    return NextResponse.json(response);
}