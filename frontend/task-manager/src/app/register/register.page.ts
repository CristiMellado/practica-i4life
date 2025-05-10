import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {

  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) {}

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          header: '¡Éxito!',
          message: 'Usuario creado correctamente',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error?.error || 'No se pudo registrar el usuario',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
  

}
