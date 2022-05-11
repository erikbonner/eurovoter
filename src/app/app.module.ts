import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SETTINGS, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { VoteSelectorComponent } from './components/vote-selector/vote-selector.component';
import { CountrySelectorControlComponent } from './components/vote-selector/country-selector-control/country-selector-control.component';
import { VoterListComponent } from './components/voter-list/voter-list.component';
import { RankingTableComponent } from './components/ranking-table/ranking-table.component';
import { CountryIconComponent } from './components/country-icon/country-icon.component';
import { VoterInfoComponent } from './components/voter-info/voter-info.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    VoteSelectorComponent,
    CountrySelectorControlComponent,
    VoterListComponent,
    RankingTableComponent,
    CountryIconComponent,
    VoterInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    // AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    {
      provide: SETTINGS,
      useValue: environment.production ? undefined : {
        host: 'localhost:8081',
        ssl: false
      },
    },
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
