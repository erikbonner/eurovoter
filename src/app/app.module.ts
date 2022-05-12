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
import { USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { VoteSelectorComponent } from './components/vote-selector/vote-selector.component';
import { CountrySelectorControlComponent } from './components/vote-selector/country-selector-control/country-selector-control.component';
import { VoterListComponent } from './components/voter-list/voter-list.component';
import { RankingTableComponent } from './components/ranking-table/ranking-table.component';
import { CountryIconComponent } from './components/country-icon/country-icon.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { VoterInfoComponent } from './components/voter-list/voter-info/voter-info.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserProfileScreenComponent } from './components/user-profile-screen/user-profile-screen.component';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { ToolbarHostComponent } from './components/toolbar-host/toolbar-host.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserProfileScreenComponent,
    LoginComponent,
    VoteSelectorComponent,
    CountrySelectorControlComponent,
    VoterListComponent,
    RankingTableComponent,
    CountryIconComponent,
    VoterInfoComponent,
    ToolbarComponent,
    ToolbarHostComponent
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
    provideStorage(() => getStorage()),

    // AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_STORAGE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9199] : undefined },
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
