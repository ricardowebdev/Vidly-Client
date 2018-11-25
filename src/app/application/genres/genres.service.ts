import { Injectable } from '@angular/core';
import { Http          } from '@angular/http';
import { Environment   } from '../../common/config';  


@Injectable({
  providedIn: 'root'
})
export class GenresService {
    constructor(private http: Http) {

    }

    getAllGenres() {
  		return this.http.get(Environment.getUrl() + "genres");
    }
}
