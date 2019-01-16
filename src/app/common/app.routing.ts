import { Routes } from '@angular/router';

import { GenresComponent } from '../application/genres/genres.component';
import { MoviesComponent } from '../application/movies/movies.component';
import { UserComponent   } from '../application/user/user.component';
import { LoginComponent  } from '../application/login/login.component';
import { AuthGuard       } from './auth.guard';

export const appRoutes: Routes = [
    {
        path: 'genres',
        component: GenresComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'movies',
        component: MoviesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        component: GenresComponent,
    }
];
