export interface Residencial {
    idResidencial: number,
    tenant: string,
    estatus: boolean,
}

export interface ResidentialInformation {
    tenant: string,
    estatus: number,
    api_server: string,
    lastconnection:string,
}

export interface GenerateResponseFormatProps {
    estatus?: boolean,
    data?: any,
    description: string,
}

export interface ResponseGenerateResponse {

    estatus: boolean,
    data: any,
    description: string,
}

export interface FormatResponse {
    estatus: boolean,
    data: [] | null,
    description: string,
}

export interface UpdateStatusResidentialResponse {
    estatus: boolean,
    data: Residencial[] | null,
    description: string,
}

export interface AddResidentialResponse {
    estatus: boolean,
    data: [] | null,
    description: string,
}

export interface AddResidentialParams {
    tenant: string | undefined,
    apiServer: string | undefined,
    estatus: number | undefined
}

export interface UpdateStatusResidentialParams {
    idResidencial: string,
    apiServer: string,
    lastConnection:string,
}

