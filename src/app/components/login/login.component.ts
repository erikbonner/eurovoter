import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EmailAuthCredential, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import { Voter } from 'src/app/models/voter.model';
import { DbService } from 'src/app/services/db.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(
    private readonly auth: Auth,
    private readonly dbService: DbService,
    private readonly router: Router,
  ) { 
  }

  onLoginSuccessful(authResult: any, redirectUrl?: string): boolean {
    console.log('Login Success!', {authResult, redirectUrl})
    this.router.navigateByUrl('/main')
    return false
  }

  ngOnInit(): void {
    const  uiConfig: firebaseui.auth.Config = {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      }
    }
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.ui.start('#firebaseui-auth-container', uiConfig)
  }

  ngOnDestroy(): void {
    this.ui.delete();
  }

}
