import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // Obtenemos el token
    if (!token) {
      this.router.navigate(['/login']); // Si no hay token, redirigimos al login
      return false;
    }

    try {
      // Decodificamos el token JWT para acceder a su payload
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); 
      
      // Extraemos el rol del payload del token
      const role = tokenPayload.role; 

      // Si el rol es 'user', lo redirigimos a /tasks
      if (role === 'user') { 
        this.router.navigate(['/tasks']);
        return false; // No dejamos continuar a la página actual
      } 

      // Si el rol es 'admin', lo dejamos acceder a la ruta solicitada
      if (role === 'admin') {
        return true; // Permite el acceso a la ruta solicitada
      }

    } catch (error) {
      // En caso de error al decodificar el token, también realizamos el logout
      this.authService.logout();
      return false;
    }

    return true; // Si todo está bien, el guard deja acceder
  }
}
