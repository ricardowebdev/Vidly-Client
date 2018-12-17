import { Component, OnInit } from '@angular/core';
import { trigger,
         style,
         animate,
         transition        } from '@angular/animations';

import { GenresService     } from './genres.service';
import { Base              } from '../../common/base.class';
import { StatusHandler     } from '../../common/statusHandler';
import { FormControl,
         FormGroup,
         Validators        } from '@angular/forms';

@Component({
    selector: 'app-genres',
    templateUrl: './genres.component.html',
    styleUrls: ['./genres.component.scss'],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(500)
            ])
        ])
    ]
})
export class GenresComponent implements OnInit {
    genres:         any;
    selectedGenre:  any;
    filteredGenres: any;
    page:           string;
    isActive:       boolean;
    base = new Base();

    form = new FormGroup({
        id: new FormControl('', []),

        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]),

        active: new FormControl('', [
            Validators.required
        ])
    });

    get id() {
        return this.form.get('id');
    }

    get name() {
        return this.form.get('name');
    }

    get active() {
        return this.form.get('active');
    }

    constructor(private service: GenresService) { }

    ngOnInit() {
        this.page   = 'list';
        this.genres = [];
        this.isActive = false;
        this.getGenres();
    }

    getGenres() {
        this.service.getAllGenres().subscribe(response => {
            this.genres         = response.json();
            this.filteredGenres = response.json();
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    changePage(page) {
        this.page = page;
        this.form.reset();
        this.isActive = this.page === 'single' ? true : false;
    }

    selectGenre(genre) {
        this.id.setValue(genre._id);
        this.name.setValue(genre.name);
        this.active.setValue(genre.active);
    }

    callDelete(genre) {
        this.selectedGenre = genre;
    }

    confirmForm() {
        if (this.id.value === null || this.id.value === 0) {
            this.service.saveGenre(this.form.value).subscribe(response => {
                this.getGenres();
                this.base.setAlert('Gênero inserido com sucesso', 'success');
                this.changePage('list');
            }, error => {
                this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
            });
        } else {
            this.service.editGenre(this.form.value, this.id.value).subscribe(response => {
                this.getGenres();
                this.base.setAlert('Gênero alterado com sucesso', 'success');
                this.changePage('list');
            }, error => {
                this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
            });
        }
    }

    confirmDelete() {
        this.service.removeGenre(this.selectedGenre._id).subscribe(response => {
            this.getGenres();
            this.base.setAlert('Gênero removido com sucesso', 'success');
            this.changePage('list');
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    findGenre(filter) {
        this.base.closeAlert();

        if (filter === '' || filter == null) {
            this.filteredGenres = this.genres;
        } else {
            this.filteredGenres = [];
            filter = filter.toLowerCase();

            this.filteredGenres = this.genres.filter( (instance) => {
                const name = instance.name.toLowerCase();
                return name.includes(filter);
            });

            if (!this.filteredGenres.length) {
                this.base.setAlert('Nenhum gênero encontrado', 'warning');
            }
        }
    }
}
