import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor() { }

    listUsers() {
        const users = [
            {
                id:       1,
                name:     'Ricardo dos Santos Souza',
                email:    'ricardo.tecnology@gmail.com',
                password: '123456',
                profile:  1
            },
            {
                id:       2,
                name:     'Fabio Xavier',
                email:    'fabio.xavier@gmail.com',
                password: '123456',
                profile:  2
            },
            {
                id:       3,
                name:     'Thais Mizuno',
                email:    'thais.mizuno@gmail.com',
                password: '123456',
                profile:  2
            },
        ];

        return users;
    }

    removeUser(users, selectedUser) {
        try {
            let found = -1;

            for (let x = 0; x <= users.length; x++) {
                if (users[x].id === selectedUser.id) {
                    found = x;
                    break;
                }
            }

            if (found < 0) {
                throw new Error('Usuário selecionado não encontrado');
            }

            users.splice(found, 1);
            return users;

        } catch (err) {
            return err.message;
        }
    }

    saveUser(users, user) {
        const size = users.length;

        if (this.checkUnique(users, user.email)) {
            return 'Usuário já existe no sistema';
        }

        user.id = size + 1;
        users.push(user);
        return users;
    }

    checkUnique(users, email) {
        const user = users.find((instance) => instance.email === email);

        if (user) {
            return true;
        }
        return false;
    }

    editUser(users, user) {
        let selectedUser;
        let password;

        try {
            selectedUser = users.find((instance) => instance.id === user.id);
            if (!selectedUser) {
                throw new Error('Usuário não encontrado');
            }


        } catch (err) {
            return err.message;
        }

        password = user.oldPassword;

        if (user.password !== '') {
            password = user.password;
        }

        selectedUser.name     = user.name;
        selectedUser.email    = user.email;
        selectedUser.profile  = user.profile;
        selectedUser.password = password;

        return users;
    }
}
