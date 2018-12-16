import { Component, OnInit } from '@angular/core';
import { FormControl,
         FormGroup,
         Validators        } from '@angular/forms';

import { UserService       } from '../user/user.service';
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
        id: new FormControl('', []),

        name: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
        ]),

        password: new FormControl('', [
            Validators.minLength(5),
            Validators.maxLength(50),
        ]),

        oldPassword: new FormControl('', [
            Validators.minLength(5),
            Validators.maxLength(50),
        ]),

        profile: new FormControl('' , [
            Validators.required
        ]),

        email: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.email
        ]),
    });

    constructor(private service: UserService) { }

    ngOnInit() {
        this.page = 'list';
        this.loadUsers();
        this.userProfile  = parseInt(window.localStorage.getItem('profile'), 2) || 2;
    }

    get id() {
        return this.form.get('id');
    }

    get name() {
        return this.form.get('name');
    }

    get profile() {
        return this.form.get('profile');
    }

    get password() {
        return this.form.get('password');
    }

    get email() {
        return this.form.get('email');
    }

    get oldPassword() {
        return this.form.get('oldPassword');
    }

    loadUsers() {
        this.users = this.service.listUsers();
        this.filteredUsers = this.users;
    }

    changePage(page) {
        this.page = page;
        this.filteredUsers = this.users;
        this.form.reset();
    }

    selectUser(user) {
        this.form.reset();
        this.id.setValue(user.id);
        this.name.setValue(user.name);
        this.email.setValue(user.email);
        this.profile.setValue(user.profile);
        this.oldPassword.setValue(user.password);
    }

    confirmDelete() {
        const result = this.service.removeUser(this.users, this.form.value);

        if (typeof(result) === 'string') {
            this.base.setAlert(result, 'danger');
        } else {
            window.scrollTo(0, 0);
            this.base.setAlert('Usuario removido com sucesso', 'success');
            this.users = result;
        }
    }

    confirmForm() {
        if (this.id.value !== null && this.id.value > 0) {
            const result = this.service.editUser(this.users, this.form.value);

            if (typeof(result) === 'string') {
               this.base.setAlert(result, 'danger');
            } else {
                this.users = result;
                this.base.setAlert('Usuário Alterado com sucesso', 'success');
                this.changePage('list');
            }
        } else {
            /*
            *
            * Validando a senha no caso de inserção
            * A senha foi feita desse jeito por motivos de uma integração
            * com o backend pode pedir que a senha seja transformada em hash
            *
            */
            if (this.password.value === '' || this.password.value === null) {
                this.base.setAlert('Para cadastrar um novo usuario uma senha é necessaria', 'danger');
                document.getElementById('password').focus();
                return false;
            }

            const result = this.service.saveUser(this.users, this.form.value);

            if (typeof(result) === 'string') {
                this.base.setAlert(result, 'danger');
            } else {
                this.users = result;
                this.changePage('list');
                this.base.setAlert('Usuário inserido com sucesso', 'success');
            }
        }
    }

    findUser(userName) {
        this.base.closeAlert();

        if (userName === '' || userName == null) {
            this.filteredUsers = this.users;
        } else {
            this.filteredUsers = [];
            const size = userName.length;
            userName   = userName.toLowerCase();

            for (const user of this.users) {
                let parse = user.name.substr(0, size);
                parse = parse.toLowerCase();

                if (parse === userName) {
                    this.filteredUsers.push(user);
                }
            }

            if (!this.filteredUsers.length) {
                this.base.setAlert('Nenhum usuário encontrado', 'warning');
            }
        }
    }
}
