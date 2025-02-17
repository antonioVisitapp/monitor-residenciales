import { addNewRaspberry } from "@/app/controllers/RaspberrysController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const response = await addNewRaspberry({
        ...body,
    });
   return NextResponse.json(response);
}