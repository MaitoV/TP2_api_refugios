import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

class NotificacionesWhatsapp {
    #cliente;
    clienteOK = false;
    constructor() {
        this.#cliente = new Client({
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
        this.#cliente.on('qr', this.#obtenerQR.bind(this));
        this.#cliente.on('ready', this.#clienteOK.bind(this));
    }
    #obtenerQR = (qr) => {
        qrcode.generate(qr, { small: true });
    }
    #clienteOK = () => {
        this.#clienteOK = true;
    }
    start() {
        return this.#cliente.initialize();
    }
    
}

export default NotificacionesWhatsapp;