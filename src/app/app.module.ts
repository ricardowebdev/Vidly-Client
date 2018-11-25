// Modulos do angular
import { BrowserModule              } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule    } from '@angular/platform-browser/animations';
import { HttpModule                 } from '@angular/http';
import { FormsModule,
         ReactiveFormsModule        } from '@angular/forms';

// Terceiros
import { MDBBootstrapModule         } from 'angular-bootstrap-md';

// Componentes do projeto
import { AppComponent               } from './app.component';
import { AlertComponent             } from './bootstrap/alert/alert.component';
import { MoviesComponent            } from './application/movies/movies.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
