import {  getAllRaspberrys } from "@/app/controllers/RaspberrysController";
import { NextResponse } from "next/server";

export async function POST() {


    const response = await getAllRaspberrys();

    
    return NextResponse.json(response);
}