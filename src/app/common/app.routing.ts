import { Routes } from '@angular/router';

import { GenresComponent } from '../application/genres/genres.component';
import { MoviesComponent } from '../application/movies/movies.component';
import { UserComponent   } from '../application/user/user.component';

export const appRoutes: Routes = [
    {
        path: 'genres',
        component: GenresComponent,
        pathMatch: 'full'
    },
    {
        path: 'movies',
        component: MoviesComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: GenresComponent,
    }
];
