import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, map, Observable, of, scan, Subscription, switchMap, take } from 'rxjs';
import { Voter } from '../models/voter.model';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit, OnDestroy {

  readonly loggedInUser$: Observable<Voter | null>;
  private readonly subscriptions = new Subscription()

  // track the currently authorized (logged-in) user in firestore
  private readonly authorizedUser$ = authState(this.auth);

  constructor(
    private readonly auth: Auth,
    private readonly dbService: DbService,
    private readonly router: Router
  ) {
    // listen to firestore db for logged in user updates
    this.loggedInUser$ = this.authorizedUser$.pipe(
      switchMap(authUser => {
        return authUser?.uid ? this.dbService.getVoter$(authUser.uid) : of(null)
      }),
    );
  }

  ngOnInit(): void {
    // map the authorized user to a voter in our firestore db
    this.subscriptions.add(
      this.authorizedUser$.pipe(
        filter(userData => !!userData),
        map(userData => Voter.fromUser(userData!)),
      ).subscribe(async (voter: Voter) => await this.registerVoter(voter))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigateByUrl('/login'))
  }

  private async registerVoter(voter: Voter) {
    const result = await this.dbService.addVoter(voter);
    switch (result) {
      case 'AlreadyExists': {
        this.router.navigateByUrl('/main');
        return;
      }
      case 'Success': {
        this.router.navigateByUrl('/profile');
        return;
      }
      default: {
        alert('Error registering user!');
        this.logout();
      }
    }
  }
}

