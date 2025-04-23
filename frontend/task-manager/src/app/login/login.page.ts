import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router,  private alertController: AlertController) {}
  

  //Aqui meto los roles dependiendo de cuantos vata a tener
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        switch (response.role) {
          case 'user': {
            this.router.navigate(['/tasks']); //Aquí es donde eligido a que ruta me va a cargar la página
            break;
          }
          case 'admin': {
            this.router.navigate(['/home']); //Aquí es donde eligido a que ruta me va a cargar la página
            break;

          }
          default: {
            alert('user role not currently managed')
            console.error('user role not currently managed')
          }
        }

        
      },
      error:(error: any) => {
        console.error(error)
        this.presentLoginErrorAlert(); 
      }
    })
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

    // Función para mostrar la alerta de error
    async presentLoginErrorAlert() {
      const alert = await this.alertController.create({
        header: 'Error de inicio de sesión',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['Aceptar']
      });
  
      await alert.present();
    }
}
