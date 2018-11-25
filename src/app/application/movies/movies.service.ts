import { Injectable    } from '@angular/core';
import { Http          } from '@angular/http';
import { Environment   } from '../../common/config';  

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    constructor(private http: Http) {

    }

    getAllMovies() {
  		return this.http.get(Environment.getUrl() + "movies");
    }

    saveMovie(params) {
    	return this.http.post(Environment.getUrl() + "movies", params);	
    }

    editMovie(params, id) {
    	return this.http.put(Environment.getUrl() + "movies/" + id, params);
    }

    removeMovie(id) {
        return this.http.delete(Environment.getUrl() + "movies/" + id);        
    }
}
