import { Injectable } from '@angular/core';
import { Http        } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private http: Http) { }

    login(login) {
        return this.http.post(environment.baseUrl + 'users/login', login);
    }

    logout() {
        localStorage.clear();
    }

    isLogged() {
        let decodedData = localStorage.getItem('logged');

        if (decodedData === null || decodedData === 'null') { return false; }

        decodedData = window.atob(decodedData);

        if (decodedData === 'true') { return true; }
    }
}
