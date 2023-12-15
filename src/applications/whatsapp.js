import {
    makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { logger } from "./logging.js"

class Whatsapp {
    constructor() {
        this.sock = null;
        this.status = 0;
        this.qr = null;
        this.count = 0;
    }

    async handleConnectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log(qr);
        }

        if (connection == "close") {
            const shouldReconnect =
                lastDisconnect.error.output.statusCode !=
                DisconnectReason.loggedOut;

            if (shouldReconnect) {
                this.connect();
            }
            this.status = 0;
            this.qr = null;
        } else {
            let qr = update.qr ? true : false;
            if (qr) {
                this.status = 1;
                this.qr = update.qr;
            } else {
                this.status = 3;
                this.qr = null;
            }
        }
    }

    async connect() {
        const { state, saveCreds } = await useMultiFileAuthState(
            "auth_info_baileys"
        );
        this.sock = makeWASocket({
            printQRInTerminal: true,
            auth: state,
        });

        this.sock.ev.on(
            "connection.update",
            this.handleConnectionUpdate.bind(this)
        );
        this.sock.ev.on("creds.update", saveCreds);
    }
}

export const whatsapp = new Whatsapp()
