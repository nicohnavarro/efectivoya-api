import { landingURL } from "../config/index.js";

export default function generateResetPasswordTemplate(
  email,
  resetPasswordCode
) {
  const redirect = `reset?code=${resetPasswordCode}&email=${email}`;
  const emailOptions = {
    from: '""Efectivo Ya 💲"" <notificacionesIT@zenziya.com>', // sender address
    to: email, // list of receivers
    subject: "¡Este correo para recuperar tu contraseña!", // Subject line
    text: "Con EfectiyoYa puedes recibir el dinero en tu cuenta en el mismo día.", // plain text body
    attachments: [
      {
        filename: "efectivoyalogo.png",
        path: `./src/utils/efectivoyalogo.png`,
        cid: "logo",
      },
    ],
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://wwww.w3.org/1999/xhtml">
    
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;600&display=swap" rel="stylesheet">
    <title>HTML Email</title>
    <style type="text/css">
    body {
        margin: 0;
        padding: 0;
        background-color: #f6f9fc;
    }
    
    table {
        border-spacing: 0;
    }
    
    td {
        padding: 0;
    }
    
    img {
        border: 0;
    }
    
    .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #f6f9fc;
        padding-bottom: 40px;
    }
    
    .webkit {
        max-width: 600px;
        background-color: #ffffff;
    }
    
    .outer {
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #4a4a4a;
    }
    
    @media screen and (max-width: 600px) {}
    
    @media screen and (max-width: 400px) {}
    </style>
    </head>
    
    <body>
    <center class="wrapper">
    <div class="webkit">
        <table class="outer" align="center">
            <tr>
                <td>
                    <table width="100%" style="border-spacing: 0">
                        <tr>
                            <td style="background-color: #388cda;padding: 10px;text-align: left;">
                                <a href=""><img src="cid:logo" alt="Logo" width="120" /></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" style="border-spacing: 0">
                                    <tr>
                                        <td style="background-color: #388cda;padding: 10px;text-align: center;">
                                            <h3
                                                style="font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600; font-size: 24px; line-height: 33px; text-align: center; color: #FFFFFF;">
                                                Recupera tu contraseña </h3>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" style="border-spacing: 0">
                                    <tr>
                                        <td
                                            style="background-color: #F8F8F8;padding:40px;text-align: left;align-items: center;">
                                            <span
                                                style="font-family: 'Poppins', sans-serif; font-style: normal; font-weight: normal; font-size: 16px; line-height: 18px; text-align: center; color: #455A64;">
                                                Para crear una nueva contraseña,
                                                clickea el botón ‘’Continuar’’. </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table width="100%" style="border-spacing: 0">
                                    <tr>
                                        <td
                                            style="background-color: #F8F8F8;padding:40px;text-align: center;align-items: center;">
                                            <a href="https://${landingURL}/#/${redirect}" style=" text-decoration: none; background-color: #6C63FB;border-color: #6C63FB;color: rgb(255, 255, 255);width: 100%;border-radius: 10px;margin: auto;padding: 20px 80px;"><span  style="font-family: 'Poppins', sans-serif; font-style: normal; font-weight: normal; font-size: 16px; line-height: 18px; text-align: center;">Continuar</span></a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <td>
                            <table width="100%" style="border-spacing: 0">
                                <tr>
                                    <td
                                        style="background-color: #F8F8F8;padding:40px;text-align: center;align-items: center;">
                                        <span
                                            style="font-family: 'Poppins', sans-serif; font-style: normal; font-weight: normal; font-size: 16px; line-height: 18px; text-align: center; color: #455A64;">
                                            ¿Necesitas ayuda? </span><a href="https://api.whatsapp.com/send/?phone=18494104542"
                                            style="text-decoration: none; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: normal; font-size: 16px; line-height: 18px; text-align: center;color: #6C63FB;">Contáctanos.</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </table>
    </div>
    </center>
    </body>
    
    </html>`,
  };
  return emailOptions;
}
