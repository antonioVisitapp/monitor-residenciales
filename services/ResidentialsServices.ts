import { NextRequest } from "next/server";
import axios from "axios";
import nodemailer from "nodemailer"
import { EmailList, generateResponseFormat } from "@/helpers/helpers";
import { AddResidentialParams, FormatResponse, ResidentialInformation, UpdateStatusResidentialParams } from "@/types/residencial/residencialTypes";
import PostgreSQLConnection from "@/connection/PostgreSQLConnection";
import { SendMailProps } from "@/types/email/emailTypes";
let intervalTime = 15//intervalo de tiempo para mandar la notificacion en caso de que no responda un residencial

export const getResidentials = async (): Promise<FormatResponse> => {
  let db;
  try {
    db = new PostgreSQLConnection();
    const sqlQuery = `SELECT * FROM residenciales;`

    const result = await db.executeQuery(sqlQuery)
    if (result) {
      return generateResponseFormat({ estatus: true, data: result.rows, description: "Successfully get all residentials" })
    } else {
      return generateResponseFormat({ description: `error al consultar residenciales ${result} .`, data: result })
    }
  } catch (error) {
    console.log(error);
    return generateResponseFormat({ description: `${error}` });

  }

};

export const addResidential = async ({ tenant, apiServer, estatus }: AddResidentialParams): Promise<FormatResponse> => {
  let db;
  try {
    console.log('------------agregando resindecial-------------')
    if (!tenant || !apiServer || estatus === undefined) {

      return (generateResponseFormat({ estatus: false, data: null, description: "bad request" }))

    }
    //Variables y objetos
    let idResidencial: number | undefined;
    db = new PostgreSQLConnection();

    //validaciones

    let sqlQuery = `INSERT INTO residenciales (tenant,api_server,estatus)
                    VALUES ($1, $2, $3)
                    RETURNING id_residencial;`;

    const values = [tenant, apiServer, estatus ? 1 : 0];
    console.log(sqlQuery)
    console.log(values)
    const result = await db.executeQuery(sqlQuery, values)
    // console.log(result)
    if (result && result.rowCount && result.rowCount > 0) {
      idResidencial = result.rows[0].id_residencial;
      // console.log('id_residencial',idResidencial)
      return (generateResponseFormat({ estatus: true, data: idResidencial, description: "Successfully insert residential" }))
    } else {
      return (
        generateResponseFormat({ estatus: false, data: null, description: "'Failed to insert residential'" })
      )
    }

  } catch (error) {
    console.log(error)
    return generateResponseFormat({ estatus: false, data: 500, description: `${error}` })
  }

};

export const updateStatusResidential = async ({ idResidencial, apiServer, lastConnection }: UpdateStatusResidentialParams): Promise<FormatResponse> => {
  let db;
  try {
    db = new PostgreSQLConnection();

    if (!idResidencial) {
      return (generateResponseFormat({ description: `idResidencial is ${idResidencial}` }))
    }
    const values = [1, apiServer, lastConnection, idResidencial]
    const sqlQuery = `UPDATE residenciales SET estatus=$1 ,api_server=$2, lastconnection=$3  WHERE id_residencial=$4;`

    const result = await db.executeQuery(sqlQuery, values);
    if (result && result.rowCount && result.rowCount > 0) {
      return (generateResponseFormat({ estatus: true, data: result, description: `Successfully update residential` }))
    }
    else {
      return (generateResponseFormat({ description: `Failed to update residential with id ${idResidencial}` }))
    }
  } catch (error) {
    console.log(error)
    return generateResponseFormat({ estatus: false, data: 500, description: `${error}` })
  }

};

export const getIdResidentialByTenant = async (request: NextRequest) => {
  let db;
  try {
    db = new PostgreSQLConnection();
    const body = await request.json();
    const { tenant } = body;

    if (!tenant) {
      return (generateResponseFormat({ description: `bad request` }))
    }
    const sqlQuery = `SELECT id_residencial FROM residenciales WHERE tenant='${tenant}';`;
    const resp = await db.executeQuery(sqlQuery)
    if (!resp) {
      return (generateResponseFormat({ description: `error en getIdResidentialByTenant` }))
    }
    else {
      return (generateResponseFormat({ estatus: true, data: resp.rows, description: `Successfull get id of residential` }))
    }

  } catch (error) {
    return generateResponseFormat({ description: `${error}` });
  }

}

export const setStatusDownToAllResidentials = async (): Promise<FormatResponse> => {
  let db;
  try {
    // console.log('setStatusDownToAllResidentials')
    db = new PostgreSQLConnection();
    const values = [0];
    const sqlQuery = `UPDATE residenciales SET estatus=$1;`;
    const result = await db.executeQuery(sqlQuery, values);
    if (result && result.rowCount) {
      return generateResponseFormat({ estatus: true, data: result, description: "Success change of status residentials" });
    }
    else {
      return (generateResponseFormat({ description: `Failed to set status down at residentials` }))
    }
  } catch (error) {
    console.log(error)
    return generateResponseFormat({ estatus: false, data: 500, description: `${error}` })

  }

}

export const sendNotificactionRedidentialIsDown = async (): Promise<FormatResponse> => {
  let db;
  try {
    db = new PostgreSQLConnection();
    const values = [0]
    let sqlQuery = `SELECT * FROM residenciales WHERE estatus=$1;`;
    const result = await db.executeQuery(sqlQuery, values);
    if (!result || result.rows.length === 0) {
      return generateResponseFormat({ description: "Residenciales Online" });
    }
    else {
      let residentials = 0;
      for (const residential of result.rows) {
        let { tenant, lastconnection } = residential;
        let date = new Date();
        date.setUTCHours(date.getUTCHours() - 6);
        let currentDate = date.toLocaleString('es-ES', { timeZone: 'UTC' });
        
        let arrayCurrentDate = currentDate.split(',')[0].split('/');
        let arrayCurrentTime = currentDate.split(',')[1].split(':');

        let arrayDateLastConnection = lastconnection.split(',')[0].split('/');
        let arrayTimeLastConnection = lastconnection.split(',')[1].split(':');

        let lastHour = parseInt(arrayTimeLastConnection[0]);
        let lastMinute = parseInt(arrayTimeLastConnection[1]);

        let currentHour = parseInt(arrayCurrentTime[0]);
        let currentMinute = parseInt(arrayCurrentTime[1]);

        let currentDay = parseInt(arrayCurrentDate[0])
        let lastDay = parseInt(arrayDateLastConnection[0]);
        if (lastDay <= currentDay && lastHour <= currentHour && (currentMinute - lastMinute) >= intervalTime) {

          let message = `El residencial ${tenant} no responde`

          console.log(`****************Enviando notificacion push de ${tenant}***********************************`)
          let url = `https://dev.visitapp.io/api/v2-7-0?query=mutation{ supportSendPushNotification(message:"${message}",residential:"${tenant}"){message}}`
          const { data } = await axios.request({
            url: url,
            method: 'POST',
            headers: {
              "Accept": "Application/json",
              "Content-Type": "Application/json",
              "Authorization": `Security: 7575658xoq0mk0vvvzwtehj1tlyik2w3cof211smvzpbxhm3fjxbvqfa3a1v5d14i8x2bqttodyrvhxpuxlhfvfw1qwodfbd; Channel: public`
            }
          })
          if (data.data.supportSendPushNotification.message) {
            residentials++
          }
        }
      }
      if (residentials) {
        return generateResponseFormat({ estatus: true, data: result.rows, description: "Success send notification" });
      }
      else {
        return (generateResponseFormat({ description: `Aun no se cumple el tiempo de ${intervalTime} para enviar notificaciones` }))
      }
    }
  } catch (error) {
    console.log(error)
    return generateResponseFormat({ estatus: false, data: 500, description: `${error}` })
  }

}


export const sendEmail = async ({ to, subject, text, html }: SendMailProps): Promise<FormatResponse> => {
  let db;
  try {
    db = new PostgreSQLConnection();
    const values = [0]
    let sqlQuery = `SELECT * FROM residenciales WHERE estatus=$1;`;
    let arrayResidentialsDown: ResidentialInformation[] = [];
    const result = await db.executeQuery(sqlQuery, values);
   
    // console.log('***************sendEmail**************************')
    // console.log(sqlQuery)
    // console.log(result)
    if (result?.rows === undefined) {
      return generateResponseFormat({ description: `result is ${result}` })
    }
    let residentials: ResidentialInformation[] = result.rows;
    if (residentials.length===0) {
      return generateResponseFormat({ estatus: true, description: "Residenciales Online", data: residentials });
    }

    else {
      let info;
      let credentials = {
        user: "visitappdesarrollo@gmail.com",
        pass: "algi psib cgzg xfbk"
      }
      //configuracion
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: credentials.user,
          pass: credentials.pass
        }
      });
     
      for (const residential of result.rows) {
        let { tenant, lastconnection } = residential;
        let date = new Date();
        date.setUTCHours(date.getUTCHours() - 6);
        let currentDate = date.toLocaleString('es-ES', { timeZone: 'UTC' });
        let intervalTime = 15//intervalo de tiempo para mandar la notificacion en caso de que no responda un residencial
        let arrayCurrentDate = currentDate.split(',')[0].split('/');
        let arrayCurrentTime = currentDate.split(',')[1].split(':');

        let arrayDateLastConnection = lastconnection.split(',')[0].split('/');
        let arrayTimeLastConnection = lastconnection.split(',')[1].split(':');

        let lastHour = parseInt(arrayTimeLastConnection[0]);
        let lastMinute = parseInt(arrayTimeLastConnection[1]);

        let currentHour = parseInt(arrayCurrentTime[0]);
        let currentMinute = parseInt(arrayCurrentTime[1]);

        let currentDay = parseInt(arrayCurrentDate[0])
        let lastDay = parseInt(arrayDateLastConnection[0]);


        if (lastDay <= currentDay && lastHour <= currentHour && (currentMinute - lastMinute) >= intervalTime) {
          console.log(`(lastDay <= currentDay && lastHour <= currentHour && (currentMinute - lastMinute) >= intervalTime)`)
        
          console.log(`(${lastDay} <= ${currentDay} && ${lastHour} <= ${currentHour} && (${currentMinute} - ${lastMinute}) >= ${intervalTime})`)
          console.log('residencial caido'+tenant)
          arrayResidentialsDown.push(residential)
        }

      }

      console.log(`****************Enviando correo electronico  de los residenciales caidos***********************************`)
      console.log('arrayResidentialsDown', arrayResidentialsDown)
     
      const mailOptions = {
        from: credentials.user,
        to,
        subject,
        text,
        html:
          `
                            <!DOCTYPE html>
                  <html lang="es">
                  <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Vistiapp</title>

                  </head>
                  <body>
                  <div class="container">
                    <h1>Visitapp</h1>
                    <h2>Monitoreo de residenciales</h2>
                    <ul>
                      ${arrayResidentialsDown.map(({ api_server, estatus, lastconnection, tenant }: ResidentialInformation) => (
            `<li>Residential: ${tenant} esta ${estatus ? 'Online' : 'OffLine'} dede ${lastconnection}, conectado a ${api_server}</li>`
          ))
          }

                    </ul>
                    <div style="text-align: center;">
                      <a href="http://visitapp.la:3000" class="button">Ver residenciales ahora</a>
                    </div>
                    <p class="footer">© 2024 Visitapp. Todos los derechos reservados.</p>
                  </div>
                  </body>
                  </html>

        `,
      }
      if (arrayResidentialsDown.length>0) {
        
        for (const email of EmailList) {
          mailOptions.to=email
          info = await transporter.sendMail(mailOptions)
        }
        info = info
      }
      return generateResponseFormat({ estatus: true, description: 'Correo enviado correctamente', data: info });
    }
  } catch (error) {
    console.log(error)
    return generateResponseFormat({ estatus: false, data: 500, description: `${error}` })
  }

}


