import PostgreSQLConnection from "@/connection/PostgreSQLConnection";
import { generateResponseFormat } from "@/helpers/helpers";
import { AddNewRaspberryParams } from "@/types/raspberry/raspberryTypes";
import { FormatResponse } from "@/types/residencial/residencialTypes";

export const addNewRaspberry = async ({
  timeStamp = undefined,
  cpuUsage = undefined,
  memoryUsagePercentage = undefined,
  temperature = undefined,
  powerUsage = undefined,
  isConnected = undefined,
  hostName = undefined,
  offLineCounter = undefined,
}: AddNewRaspberryParams) => {
  try {
    if (
      timeStamp === undefined ||
      cpuUsage === undefined ||
      memoryUsagePercentage === undefined ||
      temperature === undefined ||
      powerUsage === undefined ||
      isConnected === undefined ||
      hostName === undefined ||
      offLineCounter === undefined
    ) {
      return generateResponseFormat({ data:{
        timeStamp,
        cpuUsage,
        memoryUsagePercentage,
        temperature,
        powerUsage,
        isConnected,
        hostName,
        offLineCounter,
      }, description: "bad request" });
    }
    const db = new PostgreSQLConnection();
    const sqlQuery = `INSERT INTO raspberrys(
          timestamp,
          cpuUsage,
          memoryUsagePercentage,
          temperature,
          powerUsage,
          isConnected,
          hostname,
          offlineCounter)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`;
    const values = [
      timeStamp,
      cpuUsage,
      memoryUsagePercentage,
      temperature,
      powerUsage,
      isConnected,
      hostName,
      offLineCounter,
    ];
    const resp = await db.executeQuery(sqlQuery, values);
    if (resp && resp.rowCount && resp.rowCount > 0) {
      return generateResponseFormat({
        estatus: true,
        data: resp.rows,
        description: "Successfully insert raspberry data",
      });
    } else {
      return generateResponseFormat({
        description: "Failed to insert a raspberry data",
      });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ data: 500, description: `${error}` });
  }
};

export const getAllRaspberriesExist = async (): Promise<FormatResponse> => {
  try {
    const limit = 100;
    const db = new PostgreSQLConnection();
    const sqlQuery = `SELECT DISTINCT hostname FROM raspberrys WHERE hostname LIKE '% %'  ORDER BY hostname ASC;`;

    const resp = await db.executeQuery(sqlQuery);
    if (resp && resp.rows) {
      return generateResponseFormat({
        estatus: true,
        data: resp.rows,
        description: "successfully get raspberry's data",
      });
    } else {
      return generateResponseFormat({ description: `${resp}` });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ data: 500, description: `${error}` });
  }
};

export const getAllRaspberrysByHostname = async (hostname:string): Promise<FormatResponse> => {
  try {
console.log('getAllRaspberrysByHostname=>raspberryId',hostname)
    if (!hostname || hostname==='') {
      return generateResponseFormat({description:` hostname is :${hostname}`})
    }
    const limit = 100;
    const db = new PostgreSQLConnection();
    const values=[`%${hostname.replaceAll('-'," ")}%`];
    const sqlQuery = `SELECT * FROM raspberrys WHERE hostname ILIKE $1 ORDER BY id_raspberry DESC LIMIT ${limit};`;
    const resp = await db.executeQuery(sqlQuery,values);
    if (resp && resp.rows) {
      return generateResponseFormat({
        estatus: true,
        data: resp.rows,
        description: "successfully get raspberry's data",
      });
    } else {
      return generateResponseFormat({ description: `${resp}` });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ data: 500, description: `${error}` });
  }
};

// //TODO obtener la info de una raspberry por id
export const getRaspberrysById = async (
  id: number
): Promise<FormatResponse> => {
  try {
    if (!id) {
      return generateResponseFormat({
        description: `Bad request, id is ${id}`,
      });
    }
    const limit = 1;
    const db = new PostgreSQLConnection();
    const sqlQuery = `SELECT * FROM raspberrys WHERE id_raspberry=$1 LIMIT $2;`;

    const values = [id, limit];
    const result = await db.executeQuery(sqlQuery, values);
    if (result && result.rows) {
      return generateResponseFormat({
        estatus: true,
        data: result.rows,
        description: "Succesfully get information",
      });
    } else {
      return generateResponseFormat({
        description: `Error to search a raspberry with id ${id}`,
      });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ description: `${error}` });
  }
};
// * get raspberry information by tenant
export const getRaspberrysByHostname = async (
  hostname: string
): Promise<FormatResponse> => {
  try {
    if (!hostname) {
      return generateResponseFormat({
        description: `Bad request, hostname is ${hostname}`,
      });
    }
    const limit = 1;
    const db = new PostgreSQLConnection();
    const sqlQuery = `SELECT * FROM raspberrys WHERE hostname=$1 LIMIT $2 ;`;

    const values = [hostname, limit];
    const result = await db.executeQuery(sqlQuery, values);
    if (result && result.rows) {
      return generateResponseFormat({
        estatus: true,
        data: result.rows,
        description: "Succesfully get raspberry´s information by hostname",
      });
    } else {
      return generateResponseFormat({
        description: `Error to search a raspberry with hostname ${hostname}`,
      });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ description: `${error}` });
  }
};
export const getRaspberrysByResidential = async (
  tenant: string
): Promise<FormatResponse> => {
  try {
    if (!tenant) {
      return generateResponseFormat({
        description: `Bad request, tenant is ${tenant}`,
      });
    }
    const limit = 100;
    const db = new PostgreSQLConnection();
    const sqlQuery = `SELECT DISTINCT ON (hostname) * FROM raspberrys WHERE hostname ILIKE $1 ORDER BY hostname,id_raspberry DESC LIMIT $2;`;

    const values = [`%${tenant}%`, limit];
    const result = await db.executeQuery(sqlQuery, values);
    if (result && result.rows) {
      return generateResponseFormat({
        estatus: true,
        data: result.rows,
        description: "Succesfully get raspberrys by residential",
      });
    } else {
      return generateResponseFormat({
        description: `Error to search a raspberry with tenant ${tenant}`,
      });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ description: `${error}` });
  }
};
export const getRaspberrysByTyAccess = async (
  typeAccess: string
): Promise<FormatResponse> => {
  try {
    if (!typeAccess || typeAccess === "") {
      return generateResponseFormat({
        description: `Bad request, typeAccess is ${typeAccess}`,
      });
    }
    const limit = 100;
    const db = new PostgreSQLConnection();
    const sqlQuery = `SELECT * FROM raspberrys WHERE hostname LIKE $1 LIMIT $2;`;

    const values = [`%${typeAccess}%`, limit];
    const result = await db.executeQuery(sqlQuery, values);
    if (result && result.rows) {
      return generateResponseFormat({
        estatus: true,
        data: result.rows,
        description: `Succesfully get raspberrys by ${typeAccess} `,
      });
    } else {
      return generateResponseFormat({
        description: `Error to search a raspberry with typeAccess ${typeAccess}`,
      });
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ description: `${error}` });
  }
};
