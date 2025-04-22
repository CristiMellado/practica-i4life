import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {


  constructor(private router: Router, private authService: AuthService) {}


  logout() {
    // Elimina el token o cualquier información relacionada con la sesión
    this.authService.logout();

    // Redirige al login
    this.router.navigate(['/login']);
  }

}
