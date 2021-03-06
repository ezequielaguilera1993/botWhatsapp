//Precios
const certiX1 = 800
const certiX2 = 1000
const certiX3 = 1200
const certiX4 = 1400
const certiX5 = 1600

//Fechas
const viernes = 20
const sabado = 21
const domingo = 22

const presentacion = `*馃 Le dejo mas info sobre todos los cursos*
*1)* C贸mo inscribirse de forma gratuita (sin certificado)
*2)* C贸mo inscribirse de forma paga (con certificado) y costos de los certificados
*3)* C贸mo son los cursos, duraci贸n, pasos a seguir etc.
*4)* Cuando empiezan los cursos`


const info1 = `*1) Inscripci贸n gratuita (sin certificado)* 
Acceda a este enlace https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing y s煤mese a todos los cursos que desee. *Importante: recuerde unirse al grupo de Whatsapp y Classroom de cada curso*
`

const info2 = `*2) Inscripci贸n paga (con certificado)*
Debe abonar los certificados que desee y luego sumarse a los cursos
*Modelos de Certificado* https://photos.app.goo.gl/Grm54bW161weeXB26
*Promoci贸n por pre-inscripci贸n (hasta el lunes ${domingo + 1} inclusive)*
鈥? *Un (1)* Certificado *${certiX1}$* https://mpago.la/2pwTDcY
鈥? *Dos (2)* Certificados *${certiX2}$* (${certiX2 / 2}$ cada certificado)* 鉃ttps://mpago.la/1noxX9Y
鈥? *Tres (3)* Certificados *${certiX3}$* (${certiX3 / 3}$ cada certificado)* 鉃ttps://mpago.la/2RKS4fA
鈥? *Cuatro (4)* Certificados *${certiX4}$* (${certiX4 / 4}$ cada certificado)* 鉃ttps://mpago.la/1eQvfze
鈥? *Cinco (5)* Certificados *${certiX5}$* (${certiX5 / 5}$ cada certificado)* 鉃ttps://mpago.la/234vbAd
En total puede abonar hasta 5 certificados (porque son 5 cursos). Si abona menos de 5 certificados, deber谩 elegir en qu茅 cursos utilizar el comprobante.
*Luego de abonar debe unirse a los cursos que desee por los enlaces p煤blicos de uni贸n  https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing*

*Formas de pago*
鈥? D茅bito
鈥? Cr茅dito
鈥? Efectivo desde un Rapipago, Pago Facil, Kiosco o Provincia Net Pagos
鈥? Transferencias desde cuentas de mercado pago

Tambi茅n puede abonarlos mediante una transferencia bancaria al 0140389103703753820095`

const info3 = `*3) Sobre los cursos*

*Duraci贸n*: dos semanas

*Pasos para realizar los cursos*
*1)* Asistir a un encuentro virtual (o en su defecto ver la grabaci贸n), y conseguir un mu帽eco almohad贸n o frazada enrollada para practicar (para Acv/Infarto no es necesario) 
*2)* Acceder a un Classroom 
*3)* Presentar una actividad. 
*4)* Marcar la tarea como completada
*5) (opcional)* Si abonaron el certificado les estar谩 llegando firmado digitalmente, en calidad de impresi贸n y con doble c贸digo de autenticidad a su casilla de mail en menos de 1 hora

*En el Classroom de cada curso tambi茅n encontrar谩n*
鈥? Protocolos para imprimir
鈥? Todas las im谩genes vistas en el curso en un PDF
鈥? La grabaci贸n del encuentro
鈥? Videos con contenido extra
鈥? Un video que explica de forma concisa la fisiologia humana (y un cup贸n gratuito para un curso de fisiolog铆a humana)
`



const info4 = `*4) Por cada curso de dictar谩 una clase virtual, luego deberan realizar actividades en un Classroom (un Classroom es un aula virtual).*

*Dias y horario de cada clase virtual (sea el caso que no pueda asistir, recuerde que las clases quedan grabadas)*

1鈥? *Acv/Infarto*  viernes ${viernes} a las 18hs

2鈥? *RCP en Beb茅s* S谩bado ${sabado} a las 18hs

3鈥? *Maniobra de Heimlich en Beb茅s* (para asistir en caso de atragantamiento) S谩bado ${sabado} a las 21hs

4鈥? *RCP en Adultos* Domingo ${domingo} a las 18hs

5鈥? *Maniobra de Heimlich en adultos* (para asistir en caso de atragantamiento) Domingo ${domingo} a las 21hs
`



const opciones = `鈥? Envie un *1* para saber c贸mo inscribirse de forma gratuita (sin certificado)
鈥? Envie un *2* para saber c贸mo inscribirse de forma paga (con certificado) y para saber cuando cuestan los certificados
鈥? Envie un *3* para saber c贸mo son los cursos, duraci贸n, pasos a seguir etc.
鈥? Envie un *4* para saber horarios del encuentro virtual de cada curso
鈥? Envie un *5* para saber de donde somos
鈥? Envie un *6* para saber si las clases son virtuales
鈥? Envie un *7* para saber cuanto tarda en llegar el certificado
鈥? Envie un *8* para ver modelos de certificados`



const respuestInstructor = `馃 *El instructor Ezequiel se contactar谩 con usted cuando sea posible (estamos atendiendo muchas consultas)* 鈴? \n_Mientras tanto puede consultarme a mi lo que desee_
         
*Escriba el numero sin letras o n煤meros adicionales, luego envie el mensaje y le llegara la info que precisa.*
  
${opciones}

    *馃 IMPORTANTE* si contesta algo diferente a lo de esta lista no podre responderle de manera adecuada.

    _El instructor se contactar谩 a la brevedad_
`



const ultimoMensaje = `*馃 Si le qued贸 una duda envieme un mensaje con algunos de las siguientes opciones para tener mas informacion*

_Escriba a los n煤meros sin letras o n煤meros adicionales, luego envie el mensaje y le llegara la info que precisa._
        
鈥? Escriba la palabra *instructor* si desea hablar un tema en especifico con el instructor
${opciones}

 *馃 IMPORTANTE* si contesta algo diferente a lo de esta lista no podre responderle de manera adecuada. Recuerde que si desea hablar con el instructor debe enviar la palabra *instructor* como mensaje, yo me encargo de avisarle. 馃摤
`





/*  const todaLaInfo = `
*Recuerde tocar 'Leer m谩s..' para acceder al resto del contenido*
*1)* C贸mo inscribirse de forma gratuita (sin certificado)
*2)* C贸mo inscribirse de forma paga (con certificado) y costos de los certificados
*3)* C贸mo son los cursos, duraci贸n, pasos a seguir etc.
*4)* Cuando empiezan los cursos

*1) Inscripci贸n gratuita (sin certificado)*
Acceda a este enlace https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing y s煤mese a todos los cursos que desee. *Importante: recuerde unirse al grupo de Whatsapp y Classroom de cada curso*

*2) Inscripci贸n paga (con certificado)*
Debe abonar los certificados que desee y luego sumarse a los cursos
*Modelos de Certificado* https://photos.app.goo.gl/Grm54bW161weeXB26
*Promoci贸n por pre-inscripci贸n (hasta el viernes inclusive)*
鈥? *Un (1)* Certificado *${certiX1}$* https://mpago.la/2pwTDcY
鈥? *Dos (2)* Certificados *${certiX2}$* (${certiX2 / 2}$ cada certificado)* 鉃ttps://mpago.la/1noxX9Y
鈥? *Tres (3)* Certificados *${certiX3}$* (${certiX3 / 3}$ cada certificado)* 鉃ttps://mpago.la/2RKS4fA
鈥? *Cuatro (4)* Certificados *${certiX4}$* (${certiX4 / 4}$ cada certificado)* 鉃ttps://mpago.la/1eQvfze
鈥? *Cinco (5)* Certificados *${certiX5}$* (${certiX5 / 5}$ cada certificado)* 鉃ttps://mpago.la/234vbAd
En total puede abonar hasta 5 certificados (porque son 5 cursos). Si abona menos de 5 certificados, deber谩 elegir en qu茅 cursos utilizar el comprobante.
*Luego de abonar debe unirse a los cursos que desee por los enlaces p煤blicos de uni贸n  https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing*

*Formas de pago*
  鈥? D茅bito
  鈥? Cr茅dito
  鈥? Efectivo desde un Rapipago, Pago Facil, Kiosco o Provincia Net Pagos
  鈥? Transferencias desde cuentas de mercado pago

Tambi茅n puede abonarlos mediante una transferencias bancarias


*3) Sobre los cursos*

*Duraci贸n*: dos semanas

*Pasos para realizar los cursos*
*1)* Asistir a un encuentro virtual (o en su defecto ver la grabaci贸n), y conseguir un mu帽eco almohad贸n o frazada enrollada para practicar (para Acv/Infarto no es necesario)
*2)* Acceder a un Classroom
*3)* Presentar una actividad.
*4)* Marcar la tarea como completada
*5) (opcional)* Si abonaron el certificado les estar谩 llegando firmado digitalmente, en calidad de impresi贸n y con doble c贸digo de autenticidad a su casilla de mail en menos de 1 hora

*En el Classroom de cada curso tambi茅n encontrar谩n*
鈥? Protocolos para imprimir
鈥? Todas las im谩genes vistas en el curso en un PDF
鈥? La grabaci贸n del encuentro
鈥? Videos con contenido extra
鈥? Un video que explica de forma concisa la fisiologia humana (y un cup贸n gratuito para un curso de fisiolog铆a humana)


*4) En cada curso de dictar谩 una clase virtual, luego deberan realizar actividades en un Classroom (un aula virtual).*
*Dias y horario de cada clase virtual (sea el caso que no pueda asistir, recuerde que las clases quedan grabadas)*
 鈥? *Acv/Infarto*  *viernes 9 a las 18hs*
 鈥? *RCP en Beb茅s* (para asistir en caso de paro card铆aco) *S谩bado 10 a las 18hs*
 鈥? *Maniobra de Heimlich en Beb茅s* (para asistir en caso de atragantamiento) *S谩bado 10 a las 21hs*
 鈥? *RCP en Adultos* (para asistir en caso de paro card铆aco) *Domingo 11 a las 18hs*
 鈥? *Maniobra de Heimlich en adultos* (para asistir en caso de atragantamiento) *Domingo 11 a las 21hs*

` */

module.exports = {
  presentacion, info1, info2, info3, info4, respuestInstructor, ultimoMensaje,
}






