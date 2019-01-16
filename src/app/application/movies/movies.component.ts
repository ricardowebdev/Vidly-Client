import { Component, OnInit   } from '@angular/core';
import { trigger,
         style,
         animate,
         transition,         } from '@angular/animations';

import { MoviesService       } from './movies.service';
import { GenresService       } from '../genres/genres.service';
import { StatusHandler       } from '../../common/statusHandler';
import { Base                } from '../../common/base.class';
import { FormControl,
         FormGroup,
         Validators          } from '@angular/forms';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(500)
            ])
        ])
    ]
})
export class MoviesComponent implements OnInit {
    movies:         any;
    genres:         any;
    selectedMovie:  any;
    filteredMovies: any;
    page:           string;
    base = new Base();

    form = new FormGroup({
        id: new FormControl('', []),

        title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]),

        numberInStock: new FormControl('', [
            Validators.required,
            Validators.min(0),
        ]),

        dailyRentalRate: new FormControl('', [
            Validators.required,
            Validators.min(0),
        ]),

        genrerId: new FormControl('', [
            Validators.required
        ]),
    });

    get id() {
        return this.form.get('id');
    }

    get title() {
        return this.form.get('title');
    }

    get numberInStock() {
        return this.form.get('numberInStock');
    }

    get dailyRentalRate() {
        return this.form.get('dailyRentalRate');
    }

    get genrerId() {
        return this.form.get('genrerId');
    }

    constructor(private service: MoviesService, private genresService: GenresService) {}

    ngOnInit() {
        this.page   = 'list';
        this.movies = [];
        this.getGenres();
        this.getMovies();
    }

    getGenres() {
        this.genresService.getAllGenres().subscribe(response => {
            this.genres = response.json();
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    getMovies() {
        this.service.getAllMovies().subscribe(response => {
            this.movies         = response.json();
            this.filteredMovies = response.json();
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    changePage(page) {
        this.page = page;
        this.form.reset();
    }

    confirmForm() {
        const params = {
            title: 			 this.title.value,
            numberInStock:   this.numberInStock.value,
            dailyRentalRate: this.dailyRentalRate.value,
            genre: {
                id:  this.genrerId.value
            }
        };

        if (this.id.value === null || this.id.value === 0) {
            this.service.saveMovie(params).subscribe(response => {
                this.getMovies();
                this.base.setAlert('Filme inserido com sucesso', 'success');
                this.changePage('list');
            }, error => {
                this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
            });
        } else {
            this.service.editMovie(params, this.id.value).subscribe(response => {
                this.getMovies();
                this.base.setAlert('Filme alterado com sucesso', 'success');
                this.changePage('list');
            }, error => {
                this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
            });
        }
    }

    selectMovie(movie) {
        this.id.setValue(movie._id);
        this.title.setValue(movie.title);
        this.numberInStock.setValue(movie.numberInStock);
        this.dailyRentalRate.setValue(movie.dailyRentalRate);
        this.genrerId.setValue(movie.genre._id);
    }

    callDelete(movie) {
        this.selectedMovie = movie;
    }

    confirmDelete() {
        this.service.removeMovie(this.selectedMovie._id).subscribe(response => {
            this.getMovies();
            this.base.setAlert('Filme removido com sucesso', 'success');
            this.changePage('list');
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    findMovie(filter) {
        this.base.closeAlert();

        if (filter === '' || filter == null) {
            this.filteredMovies = this.movies;
        } else {
            this.filteredMovies = [];
            const size = filter.length;
            filter   = filter.toLowerCase();

            this.filteredMovies = this.movies.filter( (instance) => {
                const title = instance.title.toLowerCase();
                return title.includes(filter);
            });

            if (!this.filteredMovies.length) {
                this.base.setAlert('Nenhum filme encontrado', 'warning');
            }
        }
    }
}
