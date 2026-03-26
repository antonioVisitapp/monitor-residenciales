import PostgreSQLConnection from "@/connection/PostgreSQLConnection";
import { generateResponseFormat } from "@/helpers/helpers";

interface AddNewQrScan {
    userName: string;
    tenant: string;
    qr_code: string;
    desc_visitapp: string;
    liberacion_pulso: boolean;
    fecha: string;
    hostName: string;
    id_raspberry: string;
}

export const addQrScan = async ({
    userName = '',
    tenant = '',
    qr_code = '',
    desc_visitapp = '',
    liberacion_pulso = false,
    fecha = '',
    hostName = '',
    id_raspberry = '',
}: AddNewQrScan) => {
    try {
        if (
            userName === '' ||
            tenant === '' ||
            qr_code === '' ||
            desc_visitapp === '' ||
            fecha === '' ||
            hostName === '' ||
            id_raspberry === ''
        ) {
            return generateResponseFormat({
                data: {
                    userName,
                    tenant,
                    qr_code,
                    desc_visitapp,
                    liberacion_pulso,
                    fecha,
                    hostName,
                    id_raspberry,
                }, description: "bad request"
            });
        }
        const db = new PostgreSQLConnection();
        const sqlQuery = `INSERT INTO qr_scans(
        userName
        tenant
        qr_code
        desc_visitapp
        liberacion_pulso
        fecha
        hostName
        id_raspberry 
        )
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`;
        const values = [
            userName,
            tenant,
            qr_code,
            desc_visitapp,
            liberacion_pulso,
            fecha,
            hostName,
            id_raspberry,
        ];
        const resp = await db.executeQuery(sqlQuery, values);
        if (resp && resp.rowCount && resp.rowCount > 0) {
            return generateResponseFormat({
                estatus: true,
                data: resp.rows,
                description: "Successfully insert qr_scan data",
            });
        } else {
            return generateResponseFormat({
                description: "Failed to insert a qr_scan data",
            });
        }
    } catch (error) {
        console.log(error);
        return generateResponseFormat({ data: 500, description: `${error}` });
    }
};