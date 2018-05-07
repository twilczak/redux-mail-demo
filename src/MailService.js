import axios from 'axios';

export class MailService {

    static hostUrl = 'http://localhost:3000';

    static sendMessage(message) {
        const url = `${this.hostUrl}/outbox`;
        message.dateSent = this.getDateSent();

        return axios
            .post(url, message)
            .then(response => response.data);
    }

    static zeroPad(value) {
        return value > 9 ?  '' + value : '0' + value;
    }

    static getDateSent(date = new Date()) {
        const day = this.zeroPad(date.getDate());
        const month = this.zeroPad(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${year}.${month}.${day}`;
    }
}