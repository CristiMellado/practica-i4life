import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {}
  
  login() {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/tasks']); //Aquí es donde eligido a que ruta me va a cargar la página
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
