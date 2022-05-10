/**
 * Created by erbo4300 on 06.07.2016.
 */
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from "rxjs";
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.loggedInUser$.pipe(
      map(loggedInUser => !!loggedInUser),
      tap(canActivate => {
        if (!canActivate) {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }
}

