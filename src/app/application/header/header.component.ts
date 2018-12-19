import { Component,
         OnInit      } from '@angular/core';
import { Router      } from '@angular/router';

import { AuthService } from '../../common/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private service: AuthService, private router: Router) {}

    logout() {
        this.service.logout();
        this.router.navigate(['/login']);
    }

    ngOnInit() {}
}
