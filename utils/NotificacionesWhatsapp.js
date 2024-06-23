import whatsappWeb from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsappWeb
import qrcode from 'qrcode-terminal';

class NotificacionesWhatsapp {
    static #cliente;
    static #instancia;
    constructor() {
        if (!NotificacionesWhatsapp.#instancia) {
            NotificacionesWhatsapp.#instancia = this;
            NotificacionesWhatsapp.#conectar();
        }
        return NotificacionesWhatsapp.#instancia;
    }

    static async #conectar() {
        if (!NotificacionesWhatsapp.#cliente) {
            NotificacionesWhatsapp.#cliente = new Client({
                webVersion: "2.3000.1012750699-alpha", //lock version here
                webVersionCache: {
                    type: "remote",
                    remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2325.3.html",
                },
                authStrategy: new LocalAuth({
                    dataPath: './ws_session/',
                }),
                qrMaxRetries: 3,
                puppeteer: {
                    headless: false,
                    args: [
                        "--no-sandbox",
                        "--no-first-run",
                        "--disable-setuid-sandbox",
                        "--disable-dev-shm-usage",
                        "--disable-accelerated-2d-canvas",
                        "--disable-gpu",
                        "--single-process",
                        "--no-zygote",
                    ],
                },
            });
            NotificacionesWhatsapp.#cliente.on('qr',  NotificacionesWhatsapp.#obtenerQR.bind(this));
            NotificacionesWhatsapp.#cliente.on('ready', () => {
                console.log('Cliente de Whatsapp conectado correctamente');
            });

            try {
                await NotificacionesWhatsapp.#cliente.initialize();
            } catch (error) {
                console.log('Error al conectar whatsapp web:', error);
            }
        }
    }
    static async #obtenerQR (qr) {
        await qrcode.generate(qr, { small: true });
    }
    enviarMensaje = async (mensaje, numero) => {
        let numeroFormateado = `${numero}@c.us`
        await NotificacionesWhatsapp.#cliente.sendMessage(numeroFormateado, mensaje);
    }

}

export default NotificacionesWhatsapp;