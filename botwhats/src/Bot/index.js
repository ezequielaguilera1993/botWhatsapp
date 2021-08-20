
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
const { presentacion, info1, info2, info3, info4, ultimoMensaje, respuestInstructor } = require("./mensajes");
// const { presentacion, info1, info2, info3, info4, ultimoMensaje, respuestInstructor } = require('./mensajes');
// const app = express();
// app.use(express.urlencoded({ extended: true }))




const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;



// const { time } = require('console');
// const { resolve } = require('path');





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
    console.log(`${chalk.blue('📺 Media to: ' + number)}`);
    const media = MessageMedia.fromFilePath(`./mediaSend/${fileName}`);
    return client.sendMessage(number, media).catch((e) => console.log("error en sendmedia()", e));
}

/**
 * Enviamos un mensaje simple (texto) a nuestro cliente
 * @param {*} number 
 */

const sendMessage = async (number = null, content = null) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    await readChat(number, content)
    console.log(`${chalk.green('📺 Mensaje a: ' + number)}`);
    return client.sendMessage(number, content).catch((e) => console.log("sendMessage()", e));
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


const replyAsk = (from, answer) => new Promise(async (resolve, reject) => {
    console.log(`${chalk.yellow(`📩 Recibido a las ${timeNow()} de ${from}`)}
 "${answer}"\n`)

    answer = answer.toLowerCase()

    if (answer === 'instructor' || answer === 'intructor' || answer === 'ezequiel' || answer === 'instrutor') {
        sendMessage(from, respuestInstructor)
    }

    else if (answer === "1" || answer == "*1*" || answer == "uno") {
        await sendMessage(from, info1)
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "2" || answer == "*2*" || answer == "dos") {
        await sendMessage(from, info2)
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "3" || answer == "*3*" || answer == "tres") {
        await sendMessage(from, info3)
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "4" || answer == "*4*" || answer == "cuatro") {
        await sendMessage(from, info4)
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "5" || answer == "*5*" || answer == "cinco" || answer == "sinco") {
        await sendMessage(from, "*El instructor es de Buenos Aires, pero los cursos se dan en todo el pais.*")
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "6" || answer == "*6*" || answer == "seis") {
        await sendMessage(from, "*Las clases son 100% virtuales*")
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "7" || answer == "*7*" || answer == "siete") {
        await sendMessage(from, "*Luego de aprobar un curso, si abono un certificado deberá completar una planilla con sus datos para solicitarlo, y en menos de un minuto le estará llegando a su casilla de mail, firmado digitalmente y con dos códigos de autenticidad. Al enviar la planilla un programa comprueba si es de las personas aprobadas, genera un certificado y se los envia automaticamente*")
        await sendMessage(from, ultimoMensaje)
    }

    else if (answer === "8" || answer == "*8*" || answer == "ocho") {
        await sendMessage(from, `*Modelos de certificados*
https://photos.app.goo.gl/Grm54bW161weeXB26`)
        await sendMessage(ultimoMensaje)

    }

    else if (answer === "cin" || answer == "cinthya" || answer == "mi amor" || answer == "eze mi amor" || answer == "eze mí amor" || answer == "mí amor") {
        await sendMessage(from, "Hola Cin hermosa ❤. ¿Como estás?")

    }

    else if (
        answer === "🤖"
        ||
        answer === "como te llamas"
        ||
        answer === "como te llamás"
    ) await sendMessage(from, '*🤖 Soy el bot Dominique Larrey, tomo mi nombre del inventor de la ambulancia y del triage. "Dominique-Jean Larrey fue un cirujano que, en las guerras napoleónicas, creó el transporte por ambulancia e introdujo los principios de la sanidad militar moderna, realizando los primeros triaje en los campos de batalla.". Mas info en Wikipedia https://es.wikipedia.org/wiki/Dominique-Jean_Larrey*')


    resolve(true)

}).catch((e) => console.log("replyAsk()", e))

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
        qrcode.generate(qr, { small: true });
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

    // readExcel(); //Es para esperar tiempo luego de un mensaje, pero se rompe por esto 

}

/**
 * Difundir mensaje a clientes
 */
const readExcel = async () => {


    const pathExcel = `./chats/clientes-saludar.xlsx`;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(pathExcel).catch((e) => console.log("ReadExcel", e));


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



    workbook.xlsx.writeFile(pathExcel).catch((e) => console.log("ReadExcel2", e));


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


        await workbook.xlsx.readFile(pathExcel)
            .then(async () => {
                const worksheet = workbook.getWorksheet(1);
                const lastRow = worksheet.lastRow;

                var getRowInsert = worksheet.getRow(++(lastRow.number));
                getRowInsert.getCell('A').value = today;
                getRowInsert.getCell('B').value = message;


                getRowInsert.commit();

                await workbook.xlsx.writeFile(pathExcel).catch((e) => console.log("readChat", e))


            }).catch((e) => console.log("readChat2", e));

    } else {
        /**
         * NO existe el archivo de conversacion lo creamos
         */
        const worksheet = workbook.addWorksheet('Chats');
        worksheet.columns = [
            { header: 'Fecha', key: 'number_customer' },
            { header: 'Mensajes', key: 'message' }
        ];
        await worksheet.addRow([today, message]);
        await workbook.xlsx.writeFile(pathExcel)
            .then(() => {

                console.log("Creado excel con historial de charlas");
            })
            .catch((err) => {
                console.log("else readChat()", err);
            });
    }
}

/**
 * Saludos a primera respuesta
 * @param {*} req 
 * @param {*} res 
 */


const greetCustomer = (from) => new Promise(async (resolve, reject) => {
    from = from.replace('@c.us', '');

    const pathExcel = `./chats/${from}@c.us.xlsx`;
    if (!fs.existsSync(pathExcel)) {

        const firstMessage = [
            `🤖 *Hola soy un bot, me llamo Dominique Larrey, intentaré responder a sus consultas.* 
  Como recibimos muchísimas preguntas me contrataron a mi para responderlas, como soy un robot no me canso, aunque podrían pagarme algo no? 😒
   `
        ].join(' ')


        await sendMessage(from, firstMessage)
        await sendMessage(from, presentacion)
        await sendMessage(from, info1)
        await sendMessage(from, info2)
        await sendMessage(from, info3)
        await sendMessage(from, info4)
        await sendMessage(from, `*Modelos de certificados*
https://photos.app.goo.gl/Grm54bW161weeXB26`)
        await sendMedia(from, './todosCertificados.png')
        await sendMedia(from, './Mundo hd.png')
        await sendMessage(from, ultimoMensaje)

    }
    resolve(true)
}).catch((e) => console.log("greetCustomer()", e))

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









// app.post('/send', sendMessagePost);

/**
 * Revisamos si existe archivo con credenciales!
 */
(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();





function timeNow() {
    const date = new Date();
    const minutes = date.getMinutes();
    return date.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes);
}