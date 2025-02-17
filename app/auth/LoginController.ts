import PostgreSQLConnection from "@/connection/PostgreSQLConnection";
import { generateResponseFormat } from "@/helpers/helpers";

export const verifyCredentials = async (userName: string, password: string) => {
    let db;
    try {
        db = new PostgreSQLConnection();
        const sqlQuery = `SELECT userName,email,estatus,idRol FROM usuarios WHERE userName=$1 AND password=$2;`;
        const values = [userName, password];
        const result = await db.executeQuery(sqlQuery, values);

        if (result && result.rows && result.rows.length ===0) {
            return generateResponseFormat({
                description:"Usuario no existente",
            })
        }

        if (result && result.rows && result.rows.length > 1) {
            console.log('existe mas de un usuario con las mismas credenciales');
        }
        else{
            
        }
    } catch (error) {
        console.log(error)
    }



}