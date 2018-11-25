import { Component, OnInit } from '@angular/core';
import { MoviesService     } from './movies.service';  

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
	movies: any;

    constructor(private service: MoviesService) { }

    ngOnInit() {
    	this.movies = [];
  		this.getMovies();  	
  	}

    getMovies() {
	  	this.service.getAllMovies().subscribe(response => {
	  		this.movies = response.json();
	  	}, error => {
			console.log(error);
	  	})
	}

}
