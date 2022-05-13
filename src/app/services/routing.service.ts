import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * A simple service to handle all app-routing.
 * This abstracts the routes from their target screens.
 */
@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(private readonly router: Router) { }

  home() { 
    this.router.navigateByUrl('/main');
  }

  profile() { 
    this.router.navigateByUrl('/profile');
  }

  loginScreen() { 
    this.router.navigateByUrl('/login');
  }
}
