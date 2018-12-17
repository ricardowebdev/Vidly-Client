export class Base {
    alertMsg:  string;
    alertType: string;


    setAlert(msg, type) {
        this.alertMsg  = msg;
        this.alertType = type;
        window.scrollTo(0, 0);
    }

    closeAlert() {
        this.alertMsg  = '';
        this.alertType = '';
    }
}
