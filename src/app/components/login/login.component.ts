import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI;

  constructor(
    private readonly auth: Auth
  ) {
  }

  onLoginSuccessful(authResult: any, redirectUrl?: string): boolean {
    console.log('Login Success!', {authResult, redirectUrl})
    // routing will be handled by userService
    return false
  }

  ngOnInit(): void {
    const  uiConfig: firebaseui.auth.Config = {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
      signInFlow:'popup',
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
