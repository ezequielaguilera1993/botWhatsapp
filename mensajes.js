//Precios
const certiX1 = 800
const certiX2 = 1000
const certiX3 = 1200
const certiX4 = 1400
const certiX5 = 1600

//Fechas
const viernes = 9
const sabado = 10
const domingo = 11


const info1 = `*1) Inscripción gratuita (sin certificado)* 
Acceda a este enlace https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing y súmese a todos los cursos que desee. *Importante: recuerde unirse al grupo de Whatsapp y Classroom de cada curso*
`

const info2 = `*2) Inscripción paga (con certificado)*
Debe abonar los certificados que desee y luego sumarse a los cursos
*Modelos de Certificado* https://photos.app.goo.gl/Grm54bW161weeXB26
*Promoción por pre-inscripción (hasta el viernes inclusive)*
• *Un (1)* Certificado *${certiX1}$* https://mpago.la/2pwTDcY
• *Dos (2)* Certificados *${certiX2}$* (${certiX2 / 2}$ cada certificado)* ➤https://mpago.la/1noxX9Y
• *Tres (3)* Certificados *${certiX3}$* (${certiX3 / 3}$ cada certificado)* ➤https://mpago.la/2RKS4fA
• *Cuatro (4)* Certificados *${certiX4}$* (${certiX4 / 4}$ cada certificado)* ➤https://mpago.la/1eQvfze
• *Cinco (5)* Certificados *${certiX5}$* (${certiX5 / 5}$ cada certificado)* ➤https://mpago.la/234vbAd
En total puede abonar hasta 5 certificados (porque son 5 cursos). Si abona menos de 5 certificados, deberá elegir en qué cursos utilizar el comprobante.
*Luego de abonar debe unirse a los cursos que desee por los enlaces públicos de unión  https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing*

*Formas de pago*
• Débito
• Crédito
• Efectivo desde un Rapipago, Pago Facil, Kiosco o Provincia Net Pagos
• Transferencias desde cuentas de mercado pago

También puede abonarlos mediante una transferencias bancarias`

const info3 = `*3) Sobre los cursos*

*Duración*: dos semanas

*Pasos para realizar los cursos*
*1)* Asistir a un encuentro virtual (o en su defecto ver la grabación), y conseguir un muñeco almohadón o frazada enrollada para practicar (para Acv/Infarto no es necesario) 
*2)* Acceder a un Classroom 
*3)* Presentar una actividad. 
*4)* Marcar la tarea como completada
*5) (opcional)* Si abonaron el certificado les estará llegando firmado digitalmente, en calidad de impresión y con doble código de autenticidad a su casilla de mail en menos de 1 hora

*En el Classroom de cada curso también encontrarán*
‣ Protocolos para imprimir
‣ Todas las imágenes vistas en el curso en un PDF
‣ La grabación del encuentro
‣ Videos con contenido extra
‣ Un video que explica de forma concisa la fisiologia humana (y un cupón gratuito para un curso de fisiología humana)
`



const info4 = `*4) Por cada curso de dictará una clase virtual, luego deberan realizar actividades en un Classroom (un classroom es un aula virtual).*

*Dias y horario de cada clase virtual (sea el caso que no pueda asistir, recuerde que las clases quedan grabadas)*

1• *Acv/Infarto*  viernes ${viernes} a las 18hs

2• *RCP en Bebés* Sábado ${sabado} a las 18hs

3• *Maniobra de Heimlich en Bebés* (para asistir en caso de atragantamiento) Sábado ${sabado} a las 20hs

4• *RCP en Adultos* Domingo ${domingo} a las 18hs

5• *Maniobra de Heimlich en adultos* (para asistir en caso de atragantamiento) Domingo ${domingo} a las 20hs
`

const presentacion = `*🤖 Le dejo mas info sobre todos los cursos*
*1)* Cómo inscribirse de forma gratuita (sin certificado)
*2)* Cómo inscribirse de forma paga (con certificado) y costos de los certificados
*3)* Cómo son los cursos, duración, pasos a seguir etc.
*4)* Cuando empiezan los cursos`

module.exports = { presentacion, info1, info2, info3, info4 }




/* const todaLaInfo = `
*Recuerde tocar 'Leer más..' para acceder al resto del contenido*
*1)* Cómo inscribirse de forma gratuita (sin certificado)
*2)* Cómo inscribirse de forma paga (con certificado) y costos de los certificados
*3)* Cómo son los cursos, duración, pasos a seguir etc.
*4)* Cuando empiezan los cursos

*1) Inscripción gratuita (sin certificado)* 
Acceda a este enlace https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing y súmese a todos los cursos que desee. *Importante: recuerde unirse al grupo de Whatsapp y Classroom de cada curso*

*2) Inscripción paga (con certificado)*
Debe abonar los certificados que desee y luego sumarse a los cursos
*Modelos de Certificado* https://photos.app.goo.gl/Grm54bW161weeXB26
*Promoción por pre-inscripción (hasta el viernes inclusive)*
• *Un (1)* Certificado *${certiX1}$* https://mpago.la/2pwTDcY
• *Dos (2)* Certificados *${certiX2}$* (${certiX2 / 2}$ cada certificado)* ➤https://mpago.la/1noxX9Y
• *Tres (3)* Certificados *${certiX3}$* (${certiX3 / 3}$ cada certificado)* ➤https://mpago.la/2RKS4fA
• *Cuatro (4)* Certificados *${certiX4}$* (${certiX4 / 4}$ cada certificado)* ➤https://mpago.la/1eQvfze
• *Cinco (5)* Certificados *${certiX5}$* (${certiX5 / 5}$ cada certificado)* ➤https://mpago.la/234vbAd
En total puede abonar hasta 5 certificados (porque son 5 cursos). Si abona menos de 5 certificados, deberá elegir en qué cursos utilizar el comprobante.
*Luego de abonar debe unirse a los cursos que desee por los enlaces públicos de unión  https://docs.google.com/document/d/1H8DsbU-qfeIijVni4zrfG_ND1ugv_gNHq2x8dvFyiQU/edit?usp=sharing*

*Formas de pago*
  • Débito
  • Crédito
  • Efectivo desde un Rapipago, Pago Facil, Kiosco o Provincia Net Pagos
  • Transferencias desde cuentas de mercado pago

También puede abonarlos mediante una transferencias bancarias


*3) Sobre los cursos*

*Duración*: dos semanas

*Pasos para realizar los cursos*
*1)* Asistir a un encuentro virtual (o en su defecto ver la grabación), y conseguir un muñeco almohadón o frazada enrollada para practicar (para Acv/Infarto no es necesario) 
*2)* Acceder a un Classroom 
*3)* Presentar una actividad. 
*4)* Marcar la tarea como completada
*5) (opcional)* Si abonaron el certificado les estará llegando firmado digitalmente, en calidad de impresión y con doble código de autenticidad a su casilla de mail en menos de 1 hora

*En el Classroom de cada curso también encontrarán*
‣ Protocolos para imprimir
‣ Todas las imágenes vistas en el curso en un PDF
‣ La grabación del encuentro
‣ Videos con contenido extra
‣ Un video que explica de forma concisa la fisiologia humana (y un cupón gratuito para un curso de fisiología humana)


*4) En cada curso de dictará una clase virtual, luego deberan realizar actividades en un Classroom (un aula virtual).*
*Dias y horario de cada clase virtual (sea el caso que no pueda asistir, recuerde que las clases quedan grabadas)*
 • *Acv/Infarto*  *viernes 9 a las 18hs*
 • *RCP en Bebés* (para asistir en caso de paro cardíaco) *Sábado 10 a las 18hs*
 • *Maniobra de Heimlich en Bebés* (para asistir en caso de atragantamiento) *Sábado 10 a las 21hs*
 • *RCP en Adultos* (para asistir en caso de paro cardíaco) *Domingo 11 a las 18hs*
 • *Maniobra de Heimlich en adultos* (para asistir en caso de atragantamiento) *Domingo 11 a las 21hs* 

` */








