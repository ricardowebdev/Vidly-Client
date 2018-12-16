import { Injectable    } from '@angular/core';
import { Http          } from '@angular/http';
import { environment   } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    constructor(private http: Http) {

    }

    getAllMovies() {
        return this.http.get(environment.baseUrl + 'movies');
    }

    saveMovie(params) {
        return this.http.post(environment.baseUrl + 'movies', params);
    }

    editMovie(params, id) {
        return this.http.put(environment.baseUrl + 'movies/' + id, params);
    }

    removeMovie(id) {
        return this.http.delete(environment.baseUrl + 'movies/' + id);
    }
}
