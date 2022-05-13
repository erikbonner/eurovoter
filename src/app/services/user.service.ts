import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { filter, map, Observable, of, scan, Subscription, switchMap, take } from 'rxjs';
import { Voter } from '../models/voter.model';
import { DbService } from './db.service';
import { RoutingService } from './routing.service';

/**
 * Handles the currently logged-in user
 */
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
    private readonly routingService: RoutingService
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
      ).subscribe(async (voter: Voter) => {
        await this.registerVoterAndTriggerRouting(voter)
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.auth.signOut().then(() => this.routingService.loginScreen())
  }

  /**
   * Registers a newly logged-in voter with the db. 
   * After registration, triggers the following routing:
   * - if user is new, go to profile screen
   * - if user has been here before, go to home
   */
  private async registerVoterAndTriggerRouting(voter: Voter) {
    const result = await this.dbService.addVoter(voter);
    switch (result) {
      case 'AlreadyExists': {
        console.log('Logged in user is already known, going to home');
        this.routingService.home();
        return;
      }
      case 'Success': {
        console.log('Logged in user is new, going to profile');
        this.routingService.profile();
        return;
      }
      default: {
        alert('Error registering user!');
        this.logout();
      }
    }
  }
}

