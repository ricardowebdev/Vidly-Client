import { Injectable  } from '@angular/core';
import { Http        } from '@angular/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private http: Http) { }

    getAllUsers() {
        return this.http.get(environment.baseUrl + 'users');
    }

    removeUser(id) {
        return this.http.delete(environment.baseUrl + 'users/' + id);
    }

    saveUser(params) {
        return this.http.post(environment.baseUrl + 'users', params);
    }

    editUser(params, id) {
        return this.http.put(environment.baseUrl + 'users/' + id, params);
    }
}
