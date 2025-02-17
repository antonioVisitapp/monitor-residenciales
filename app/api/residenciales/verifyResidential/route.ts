import { addResidential, getResidentials, updateStatusResidential } from "@/app/controllers/ResidentialsController";
import { generateResponseFormat } from "@/helpers/helpers";
import { ResidentialInformation } from "@/types/residencial/residencialTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {

        const body = await request.json();
        const { tenant, apiServer, estatus,idResidencial,lastConnection} = body;
        let respResidencials = await getResidentials()
        //en caso de que no existan residenciales, lo damos de alta
        if (respResidencials && respResidencials.data && respResidencials.data.length === 0) {
            if (!tenant || !apiServer || estatus === undefined) {
                const response=generateResponseFormat({ description: "bad request" })
              return NextResponse.json(response)
            }
            const response=await addResidential({tenant,apiServer,estatus});
            return NextResponse.json(response);
        }
        else {
            //en caso que si existan rsidenciales
            //validamos que la respuesta de los residenciales no sea undefined
            if (respResidencials && respResidencials.data) {
                //validamos si existe algun residencial con ese tenant
                let id = respResidencials.data.filter((residencial: ResidentialInformation) => residencial.tenant === tenant)
                //en caso de que no lo damos de alta
                if (id.length === 0) {
                    const response=await addResidential({tenant,apiServer,estatus});
                    return NextResponse.json(response);
                }
                else {
                    const response=await updateStatusResidential({idResidencial,apiServer,lastConnection})
                    return NextResponse.json(response);
                }
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(generateResponseFormat({description: `${error}` }))

    }
}