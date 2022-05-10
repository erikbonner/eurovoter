import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, map, Observable, of, scan, Subscription, switchMap, take } from 'rxjs';
import { Voter } from '../models/voter.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  readonly loggedInUser$: Observable<Voter | null>;
  private readonly subscriptions = new Subscription()

  constructor(
    private readonly auth: Auth,
    private readonly dbService: DbService,
    private readonly router: Router
  ) {
    // track the currently authorized (logged-in) user in firestore
    const authorizedUser$ = authState(this.auth);

    // map the authorized user to a voter in our firestore db
    this.subscriptions.add(
      authorizedUser$.pipe(
        filter(userData => !!userData),
        map(userData => Voter.fromUser(userData!)),
      ).subscribe((voter: Voter) => this.registerVoter(voter))
    );

    // listen to firestore db for logged in user updates
    this.loggedInUser$ = authorizedUser$.pipe(
      switchMap(authUser => {
        return authUser?.uid ? this.dbService.getVoter$(authUser.uid) : of(null)
      }),
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigateByUrl('/login'))
  }

  private registerVoter(voter: Voter) {
    this.dbService.addVoter(voter);
  }

}

