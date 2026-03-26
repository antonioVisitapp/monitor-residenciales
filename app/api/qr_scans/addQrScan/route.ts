import { addQrScan } from "@/services/QrScanController";
import { NextResponse } from "next/server";




export async function POST(request:NextResponse) {
    const body=await request.json();
    const response=await addQrScan({...body});
    return NextResponse.json(response)
    
}