import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { SETTINGS } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_STORAGE_EMULATOR } from '@angular/fire/compat/storage';
import { connectFirestoreEmulator, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getStorage } from 'firebase/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CountryIconComponent } from './components/country-icon/country-icon.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RankingTableComponent } from './components/ranking-table/ranking-table.component';
import { ToolbarHostComponent } from './components/toolbar-host/toolbar-host.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserProfileScreenComponent } from './components/user-profile-screen/user-profile-screen.component';
import { CountrySelectorControlComponent } from './components/vote-selector/country-selector-control/country-selector-control.component';
import { VoteSelectorComponent } from './components/vote-selector/vote-selector.component';
import { VoterInfoComponent } from './components/voter-list/voter-info/voter-info.component';
import { VoterListComponent } from './components/voter-list/voter-list.component';
import { MaterialModule } from './material.module';

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
    ToolbarHostComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (!environment.production) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
  ],
  providers: [
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
