import mailjet from 'node-mailjet';
import config from './../config.js';

export default class Notificacion {
    #clienteMailjet;
    constructor() {
        this.#clienteMailjet = mailjet.apiConnect(config.MJ_APIKEY_PUBLIC, config.MJ_APIKEY_PRIVATE);
    }

    enviarInforme = async (email, nombre, informe) => {
        try {
            const request = this.#clienteMailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                  {
                    From: {
                      Email: 'csm@findket.com',
                      Name: 'Api Refugios',
                    },
                    To: [
                      {
                        Email: `${email}`,
                        Name: `${nombre}`,
                      },
                    ],
                    Subject: 'Informe Refugio',
                    TextPart: 'Informe refugio',
                    HTMLPart:
                    `${informe}`,
                  },
                ],
              })
              await request;
        } catch(error) {
            console.log(error);
        }
    }
}