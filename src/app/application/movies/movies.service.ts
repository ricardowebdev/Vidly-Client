import { Injectable } from '@angular/core';
import { Http       } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    constructor(private http: Http) { }


    getAllMovies() {
  		return this.http.get("http://ricardowebdev.net/api/movies");
    }
}
