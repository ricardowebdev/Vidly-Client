// Modulos do angular
import { BrowserModule              } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule    } from '@angular/platform-browser/animations';
import { RouterModule,              } from '@angular/router';
import { HttpModule                 } from '@angular/http';
import { FormsModule,
         ReactiveFormsModule        } from '@angular/forms';

// Terceiros
import { MDBBootstrapModule         } from 'angular-bootstrap-md';

// Componentes do projeto
import { AppComponent               } from './app.component';
import { appRoutes                  } from './common/app.routing';
import { AlertComponent             } from './bootstrap/alert/alert.component';
import { MoviesComponent            } from './application/movies/movies.component';
import { GenresComponent            } from './application/genres/genres.component';
import { LoginComponent             } from './application/login/login.component';
import { UserComponent              } from './application/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MoviesComponent,
    GenresComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
