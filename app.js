/**
 * ⚡ DECLARAMOS LAS LIBRERIAS y CONSTANTES A USAR! ⚡
 */
 const fs = require('fs');
 const mimeDb = require('mime-db')
 const express = require('express');
 const moment = require('moment');
 const ora = require('ora');
 const chalk = require('chalk');
 const ExcelJS = require('exceljs');
 const qrcode = require('qrcode-terminal');
 const { flowConversation } = require('./conversation')
 const { Client, MessageMedia } = require('whatsapp-web.js');
 const { query } = require('express');
 const app = express();
 app.use(express.urlencoded({ extended: true }))
 const SESSION_FILE_PATH = './session.json';
 let client;
 let sessionData;
 let sendQr;
 let ready=false
 
 app.get('/aut', (req, res) => {
 
     
     
     const { presentacion, info1, info2, info3, info4 } = require('./mensajes');
     const { time } = require('console');
     const { resolve } = require('path');
     /**
      * Guardamos archivos multimedia que nuestro cliente nos envie!
      * @param {*} media 
      */
     const saveMedia = (media) => {
         
         const extensionProcess = mimeDb[media.mimetype]
         const ext = extensionProcess.extensions[0]
         fs.writeFile(`./media/${media.filename}.${ext}`, media.data, { encoding: 'base64' }, function (err) {
             console.log('** Archivo Media Guardado **');
         });
     }
     
     /**
      * Enviamos archivos multimedia a nuestro cliente
      * @param {*} number 
      * @param {*} fileName 
      */
     const sendMedia = (number, fileName) => {
         number = number.replace('@c.us', '');
         number = `${number}@c.us`
         const media = MessageMedia.fromFilePath(`./mediaSend/${fileName}`);
         client.sendMessage(number, media);
     }
     
     /**
      * Enviamos un mensaje simple (texto) a nuestro cliente
      * @param {*} number 
      */
     const sendMessage = (number = null, text = null) => {
         number = number.replace('@c.us', '');
         number = `${number}@c.us`
         const message = text || `Hola soy un BOT recuerda https://www.youtube.com/leifermendez`;
         client.sendMessage(number, message);
         readChat(number, message)
         console.log(`${chalk.green('📺 Mensaje a: ' + number)}`);
     }
     
     
     /**
      * Escuchamos cuando entre un mensaje
      */
     const listenMessage = () => {
         client.on('message', async msg => {
             const { from, to, body } = msg;
             //34691015468@c.us
             if (msg.hasMedia) {
                 console.log(`${chalk.grey("Tiene media> " + msg.hasMedia)}`)
                 const media = await msg.downloadMedia();
                 saveMedia(media);
                 // do something with the media data here
             }
             
             await greetCustomer(from);
             console.log(`NUMERO NUEVO
             ${chalk.yellow(`📩 Recibido a las ${timeNow()} de ${from}: `)}
             "${body}"\n`)
             
             await replyAsk(from, body);
             
             // await readChat(from, body)
             // console.log(`${chalk.red('⚡⚡⚡ Enviando mensajes....')}`);
             // console.log('Guardar este número en tu Base de Datos:', from);
             
         });
     }
     
     /**
      * Response a pregunta
      */
     
     const replyAsk = (from, answer) => new Promise((resolve, reject) => {
         console.log(`${chalk.yellow(`📩 Recibido a las ${timeNow()} de ${from}`)}
         "${answer}"\n`)
         
         /* 
         if (answer.toLowerCase()==='info'||answer.toLowerCase()==='informacion') {
             
             sendMessageSync(from, presentacion, 1)
             sendMessageSync(from, info1, 500)
             sendMessageSync(from, info2, 1000)
             sendMessageSync(from, info3, 1500)
             sendMessageSync(from, info4, 2000)
             sendMessageSync(from, '*Modelos de certificados*', 2500)
             sendMediaSync(from, './todosCertificados.png', 3000)
             ultimoMensaje(from, 4000)
             
         } */
         
         
         if (answer.toLowerCase() === 'instructor' || answer.toLowerCase() === 'intructor' || answer.toLowerCase() === 'ezequiel') {
             
             sendMessageSync(from, `🤖 *El instructor Ezequiel se contactará con usted cuando sea posible (estamos atendiendo muchas consultas)* ⏳ \nMientras tanto puede consultarme a mi lo que desee
             
             *Envieme un mensaje con algunos de los siguientes números para tener mas informacion, o envie la palabra info para tener toda la informacion del curso*
             
             • Envie un *1* para saber cómo inscribirse de forma gratuita (sin certificado)
             
             • Envie un *2* para saber cómo inscribirse de forma paga (con certificado) y para saber cuando cuestan los certificados
             
             • Envie un *3* para saber cómo son los cursos, duración, pasos a seguir etc.
             
             • Envie un *4* para saber horarios del encuentro virtual de cada curso
             
             • Envie un *5* para saber de donde somos
             
             • Envie un *6* para saber si las clases son virtuales
             
             • Envie un *7* para saber cuanto tarda en llegar el certificado
             
             • Envie un *8* para ver modelos de certificados
             `, 10)
             
         }
         
         else if (answer === "1" || answer == "*1*" || answer == "uno") {
             sendMessageSync(from, info1, 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "2" || answer == "*2*" || answer == "dos") {
             sendMessageSync(from, info2, 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "3" || answer == "*3*" || answer == "tres") {
             sendMessageSync(from, info3, 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "4" || answer == "*4*" || answer == "cuatro") {
             sendMessageSync(from, info4, 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "5" || answer == "*5*" || answer == "cinco" || answer == "sinco") {
             sendMessageSync(from, "*El instructor es de Buenos Aires, pero los cursos se dan en todo el pais.*", 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "6" || answer == "*6*" || answer == "seis") {
             sendMessageSync(from, "*Las clases son 100% virtuales*", 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "7" || answer == "*7*" || answer == "siete") {
             sendMessageSync(from, "*Luego de aprobar un curso, si abono un certificado deberá completar una planilla con sus datos para solicitarlo, y en menos de un minuto le estará llegando a su casilla de mail, firmado digitalmente y con dos códigos de autenticidad. Al enviar la planilla un programa comprueba si es de las personas aprobadas, genera un certificado y se los envia automaticamente*", 10)
             ultimoMensaje(from, 1000)
         }
         
         else if (answer === "8" || answer == "*8*" || answer == "ocho") {
             sendMessageSync(from, `*Modelos de certificados*
             https://photos.app.goo.gl/Grm54bW161weeXB26`, 10)
             sendMediaSync(from, './todosCertificados.png', 500)
             ultimoMensaje(from, 1000)
             
         }
         
         else if (answer === "🤖") sendMessageSync(from, '*🤖 Soy el bot Dominique Larrey, tomo mi nombre del inventor de la ambulancia y del triage. "Dominique-Jean Larrey fue un cirujano que, en las guerras napoleónicas, creó el transporte por ambulancia e introdujo los principios de la sanidad militar moderna, realizando los primeros triaje en los campos de batalla.". Mas info en Wikipedia https://es.wikipedia.org/wiki/Dominique-Jean_Larrey*', 10)
         
         
         resolveSync(resolve, 4500)
         
     })
     
     /**
      * Revisamos si tenemos credenciales guardadas para inciar sessio
      * este paso evita volver a escanear el QRCODE
      */
     const withSession = () => {
         // Si exsite cargamos el archivo con las credenciales
         const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`);
         sessionData = require(SESSION_FILE_PATH);
         spinner.start();
         client = new Client({
             session: sessionData //creo el cliente pero con esta secion iniciada, es como una forma de emular la persistencia de la secion
         });
         
         client.on('ready', () => {
             ready=true
             console.log('Client is ready!');
             spinner.stop();//para el spinner
             // sendMessage();
             // sendMedia();
             connectionReady();
 
         });
 
 
         client.on('auth_failure', () => {
             spinner.stop();
             console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
         })
 
 
         client.initialize();
     }
 
 
 
     /**
      * Generamos un QRCODE para iniciar sesion
      */
     const withOutSession = () => {
         console.log('No tenemos session guardada');
         client = new Client();
         client.on('qr', qr => {
             qrcode.generate(qr, { small: true }, function (qrcode) {
                 sendQr = qrcode
 
                 console.log(sendQr, "aca")
 
 
 
 
             });
         });
 
         client.on('ready', () => {
             console.log('Client is ready!');
             connectionReady();
         });
 
         client.on('auth_failure', () => {
             console.log('** Error de autentificacion vuelve a generar el QRCODE **');
         })
 
 
         client.on('authenticated', (session) => {
             // Guardamos credenciales de de session para usar luego
             sessionData = session;
             fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
                 if (err) {
                     console.log(err);
                 }
             });
         });
 
         client.initialize();
     }
 
     const connectionReady = () => {
         listenMessage();
         readExcel();
     }
 
     /**
      * Difundir mensaje a clientes
      */
     const readExcel = async () => {
         const pathExcel = `./chats/clientes-saludar.xlsx`;
         const workbook = new ExcelJS.Workbook();
         await workbook.xlsx.readFile(pathExcel);
         const worksheet = workbook.getWorksheet(1);
         const columnNumbers = worksheet.getColumn('A');
         columnNumbers.eachCell((cell, rowNumber) => {
             const numberCustomer = cell.value
 
             const columnDate = worksheet.getRow(rowNumber);
             let prevDate = columnDate.getCell(2).value;
             prevDate = moment.unix(prevDate);
             const diffMinutes = moment().diff(prevDate, 'minutes');
 
             // Si ha pasado mas de 60 minuitos podemos enviar nuevamente
             if (diffMinutes > 60) {
                 sendMessage(numberCustomer)
                 columnDate.getCell(2).value = moment().format('X')
                 columnDate.commit();
 
             }
         });
 
         workbook.xlsx.writeFile(pathExcel);
 
     }
 
 
     /**
      * Guardar historial de conversacion
      * @param {*} number 
      * @param {*} message 
      */
     const readChat = async (number, message) => {
         const pathExcel = `./chats/${number}.xlsx`;
         const workbook = new ExcelJS.Workbook();
         const today = moment().format('DD-MM-YYYY hh:mm')
 
         if (fs.existsSync(pathExcel)) {
             /**
              * Si existe el archivo de conversacion lo actualizamos
              */
             const workbook = new ExcelJS.Workbook();
             workbook.xlsx.readFile(pathExcel)
                 .then(() => {
                     const worksheet = workbook.getWorksheet(1);
                     const lastRow = worksheet.lastRow;
                     var getRowInsert = worksheet.getRow(++(lastRow.number));
                     getRowInsert.getCell('A').value = today;
                     getRowInsert.getCell('B').value = message;
                     getRowInsert.commit();
                     workbook.xlsx.writeFile(pathExcel);
                 });
 
         } else {
             /**
              * NO existe el archivo de conversacion lo creamos
              */
             const worksheet = workbook.addWorksheet('Chats');
             worksheet.columns = [
                 { header: 'Fecha', key: 'number_customer' },
                 { header: 'Mensajes', key: 'message' }
             ];
             worksheet.addRow([today, message]);
             workbook.xlsx.writeFile(pathExcel)
                 .then(() => {
 
                     console.log("saved");
                 })
                 .catch((err) => {
                     console.log("err", err);
                 });
         }
     }
 
     /**
      * Saludos a primera respuesta
      * @param {*} req 
      * @param {*} res 
      */
 
     const greetCustomer = (from) => new Promise((resolve, reject) => {
         from = from.replace('@c.us', '');
 
         const pathExcel = `./chats/${from}@c.us.xlsx`;
         if (!fs.existsSync(pathExcel)) {
             const firstMessage = [
                 `🤖 *Hola soy un bot, me llamo Dominique Larrey, intentaré responder a sus consultas.* 
   Como recibimos muchísimas preguntas me contrataron a mi para responderlas, como soy un robot no me canso, aunque podrían pagarme algo no? 😒
   `
             ].join(' ')
             sendMessageSync(from, firstMessage, 100)
             sendMessageSync(from, presentacion, 1000)
             sendMessageSync(from, info1, 2000)
             sendMessageSync(from, info2, 3000)
             sendMessageSync(from, info3, 4000)
             sendMessageSync(from, info4, 5000)
             sendMessageSync(from, `*Modelos de certificados*
   https://photos.app.goo.gl/Grm54bW161weeXB26`, 6000)
             sendMediaSync(from, './todosCertificados.png', 7000)
             sendMediaSync(from, './Mundo hd.png', 8000)
             ultimoMensaje(from, 9000)
         }
         resolveSync(resolve, 10000)
     })
 
     /**
      * Controladores
      */
 
 
     /*   *☼* Si desea recibir toda la info sobre los cursos envie como mensaje la palabra *info*
     
       *☼* Si quiere hablar un tema en especifico con el profesor Ezequiel envie como mensaje la palabra *instructor*  */
 
     const sendMessagePost = (req, res) => {
         const { message, number } = req.body
         console.log(message, number);
         //sendMessage(number, message)   ACA DESCOMENTAR
         res.send({ status: 'Enviado!' })
     }
 
     /**
      * Rutas
      */
 
 
 
 
 
 
 
 
     app.post('/send', sendMessagePost);
 
     /**
      * Revisamos si existe archivo con credenciales!
      */
     (fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();
 
 
 
 
     function sendMessageSync(from, message, timer) {
         setTimeout(() => sendMessage(from, message), timer)
     }
 
     function sendMediaSync(from, media, timer) {
         setTimeout(() => sendMedia(from, media), timer)
     }
 
     function resolveSync(resolve, timer) {
 
         setTimeout(() => resolve(true), timer)
 
     }
 
     function ultimoMensaje(from, timer) {
 
         sendMessageSync(from, `*🤖 Si le quedó una duda envieme un mensaje con algunos de los siguientes números para tener mas informacion*
 *IMPORTANTE LEER*: escriba el numero sin letras o números adicionales, luego envie el mensaje y le llegara la info que precisa.
    
     • *Cómo inscribirse de manera gratuita*: envíe 1
 
     • *Cómo inscribirse de forma paga (con certificado):* envie 2
 
     • *cómo son los cursos, duración, pasos a seguir etc.:* envie 3
 
     • *Horarios del encuentro virtual de cada curso:* envie 4
 
     • *De donde somos:* envie 5
 
     • *Si las clases son virtuales:* envie 6
 
     • *Cuanto tarda en llegar el certificado:* envie 7
 
     • *Modelos de certificados:* envie 8
 
     • Escriba la palabra *instructor* si desea hablar un tema en especifico con el instructor
 
 *🤖 IMPORTANTE* si contesta algo diferente a lo de esta lista no podre responderle de manera adecuada. Recuerde que si desea hablar con el instructor debe enviar la palabra *instructor* como mensaje
 
          `, timer)
 
     }
 
     res.send("Ya empezo la aut")
 
 })
 
 app.get('/', (req, res) => {
     // res.send(qrcode.split("\n").map((e)=>"<p>"+e+"</p>").join(""))
     if(ready) res.send("Client is ready!")
     else res.send("<textarea style='background-color: #000000; color:#ffffff; width: 375px; height: 375px;'>" + sendQr + "</textarea>")
 })
 
 app.get('/wipe', (req, res) => {
     // res.send(qrcode.split("\n").map((e)=>"<p>"+e+"</p>").join(""))
 
     fs.promises.unlink('./session.json')
     .then(() => {
       console.log('File removed')
       res.send("removido session")
     }).catch(err => {
       console.error('Something wrong happened removing the file', err)
       res.send("error al removerlo")
     })
 })
 
 app.listen(9000, () => {
     console.log('Server ready!');
 })
 
 function timeNow() {
     const date = new Date();
     const minutes = date.getMinutes();
     return date.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes);
 }