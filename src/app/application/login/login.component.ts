import { Component, OnInit } from '@angular/core';
import { FormControl,
         FormGroup,
         Validators        } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService       } from '../../common/auth.service';
import { Base              } from '../../common/base.class';

@Component({
  selector: 'app-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    users:         any;
    filteredUsers: any;
    userProfile:   number;
    page:          string;
    base = new Base();

    form = new FormGroup({
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
        ]),

        email: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.email
        ])
    });

    get password() {
        return this.form.get('password');
    }

    get email() {
        return this.form.get('email');
    }

    constructor(private service: AuthService, private router: Router) { }

    ngOnInit() {}

    confirmForm() {
        this.service.login(this.form.value).subscribe(response => {
            const authenticate = response.json();

            if (authenticate === true) {
                const logged = window.btoa('true');
                localStorage.setItem('logged', logged);
                this.router.navigate(['/genres']);
            } else {
                this.base.setAlert(authenticate, 'warning');
            }
        }, error => {
            if (error.status === 401) {
                this.base.setAlert('Usuario e ou senha inválidos', 'warning');
            } else if (error.status === 404) {
                this.base.setAlert('Servidor indisponível tente novamente mais tarde', 'warning');
            } else {
                this.base.setAlert(error, 'danger');
            }

        });
    }

    clear() {
        this.base.closeAlert();
    }
}
