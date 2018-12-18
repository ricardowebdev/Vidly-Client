import { Component, OnInit } from '@angular/core';
import { trigger,
         style,
         animate,
         transition        } from '@angular/animations';

import { UserService       } from './user.service';
import { Base              } from '../../common/base.class';
import { StatusHandler     } from '../../common/statusHandler';
import { FormControl,
        FormGroup,
        Validators        } from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(500)
            ])
        ])
    ]
})
export class UserComponent implements OnInit {
    users:         any;
    selectedUser:  any;
    filteredUsers: any;
    page:          string;
    isActive:      boolean;
    base = new Base();

    form = new FormGroup({
        id: new FormControl('', []),

        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
        ]),

        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(10)
        ]),

        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ]),

        active: new FormControl('', [])
    });

    get id() {
        return this.form.get('id');
    }

    get name() {
        return this.form.get('name');
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    get active() {
        return this.form.get('active');
    }

    constructor(private service: UserService) { }

    ngOnInit() {
        this.page   = 'list';
        this.users = [];
        this.isActive = false;
        this.getUsers();
    }

    getUsers() {
        this.service.getAllUsers().subscribe(response => {
            this.users         = response.json();
            this.filteredUsers = response.json();
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    changePage(page) {
        this.page = page;
        this.form.reset();
        this.isActive = this.page === 'single' ? true : false;
    }

    selectUser(user) {
        this.id.setValue(user._id);
        this.name.setValue(user.name);
        this.active.setValue(user.active);
        this.email.setValue(user.email);
    }

    callDelete(user) {
        this.selectedUser = user;
    }

    confirmForm() {
        const user = {
            _id:      this.id.value,
            name:     this.name.value,
            active:   this.active.value === 'true' ? true : false,
            email:    this.email.value,
            password: this.password.value
        };

        if (this.id.value === null || this.id.value === 0) {
            this.service.saveUser(user).subscribe(response => {
                this.getUsers();
                this.base.setAlert('Usuário inserido com sucesso', 'success');
                this.changePage('list');
            }, error => {
                console.log(error);
                this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
            });
        } else {
            this.service.editUser(user, this.id.value).subscribe(response => {
                this.getUsers();
                this.base.setAlert('Usuário alterado com sucesso', 'success');
                this.changePage('list');
            }, error => {
                console.log(error);
                this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
            });
        }
    }

    confirmDelete() {
        this.service.removeUser(this.selectedUser._id).subscribe(response => {
            this.getUsers();
            this.base.setAlert('Usuário removido com sucesso', 'success');
            this.changePage('list');
        }, error => {
            this.base.setAlert(StatusHandler.errorHandler(error), 'danger');
        });
    }

    findUser(filter) {
        this.base.closeAlert();

        if (filter === '' || filter == null) {
            this.filteredUsers = this.users;
        } else {
            this.filteredUsers = [];
            filter = filter.toLowerCase();

            this.filteredUsers = this.users.filter( (instance) => {
                const name = instance.name.toLowerCase();
                return name.includes(filter);
            });

            if (!this.filteredUsers.length) {
                this.base.setAlert('Nenhum usuário encontrado', 'warning');
            }
        }
    }


}
