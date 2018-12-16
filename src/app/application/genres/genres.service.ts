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
}
