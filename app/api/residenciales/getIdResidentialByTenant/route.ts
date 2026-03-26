import { getIdResidentialByTenant } from "@/services/ResidentialsServices";
import { generateResponseFormat } from "@/helpers/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const response=await getIdResidentialByTenant(request);
      return NextResponse.json(response);
    } catch (error) {
       return NextResponse.json(generateResponseFormat({ description: `${error}` }));
    }
}


