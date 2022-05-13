import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from "rxjs";
import { UserService } from '../services/user.service';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly routingService: RoutingService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.loggedInUser$.pipe(
      map(loggedInUser => !!loggedInUser),
      tap(canActivate => {
        if (!canActivate) {
          this.routingService.loginScreen();
        }
      })
    )
  }
}

