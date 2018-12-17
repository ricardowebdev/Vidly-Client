import { Injectable  } from '@angular/core';
import { Http        } from '@angular/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
    constructor(private http: Http) {}

    getAllGenres() {
        return this.http.get(environment.baseUrl + 'genres');
    }

    saveGenre(params) {
        return this.http.post(environment.baseUrl + 'genres', params);
    }

    editGenre(params, id) {
        return this.http.put(environment.baseUrl + 'genres/' + id, params);
    }

    removeGenre(id) {
        return this.http.delete(environment.baseUrl + 'genres/' + id);
    }

}
