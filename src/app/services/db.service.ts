import { Injectable, NgZone } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, FirestoreError, collection, collectionData, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, connectStorageEmulator, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country.model';
import { Voter } from '../models/voter.model';

const collections = {
  voters: 'voters2023',
  countries: 'countries2023'
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  readonly countries$: Observable<Country[]>;
  readonly voters$: Observable<Voter[]>;

  private readonly votersCollectionRef: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore,
    private readonly storage: Storage,
    private ngZone: NgZone
  ) {
    // if we have a dev build, use emulator for storage
    if(environment.useEmulators) {
      connectStorageEmulator(this.storage, "localhost", 9199);
    }

    const countriesRef = collection(this.firestore, collections.countries);
    this.countries$ = (
      collectionData(countriesRef, { idField: 'id' }) as Observable<Country[]>
    ).pipe(
        map(countries => {
          return countries.map(country => ({...country, code: country.code.toLowerCase()}));
        })
    )

    this.votersCollectionRef = collection(this.firestore, collections.voters);
    this.voters$ = collectionData(this.votersCollectionRef, { idField: 'id' }) as Observable<Voter[]>
  }

  async addVoter(voter: Voter): Promise<'Success' | 'AlreadyExists' | 'Error'> {
    try {
      const docRef = doc(this.firestore, collections.voters, voter.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log('User does not already exist, adding...')
        await setDoc(doc(this.votersCollectionRef, voter.uid), { ...voter });
        return 'Success';
      } else {
        return 'AlreadyExists';
      }
    } catch (e) {
      console.error('addVoter error: ', JSON.stringify(e))
      return 'Error'
    }
  }

  async patchVoter(uid: string, patch: Partial<Voter>) {
    const docRef = doc(this.firestore, collections.voters, uid);
    try {
      await updateDoc(docRef, { ...patch })
    } catch (e) {
      console.error('patchVoter ERROR', e);
    }
  }

  async updateVoterProfileImage(uid: string, file: any) {
    console.log('uploadProfileImage', file)
    const imgRef = ref(this.storage, 'profilePics/' + file.name)

    try {
      const snapshot = await uploadBytes(imgRef, file);
      const url = await  getDownloadURL(snapshot.ref);

      console.log('update user profile: ', url);
      await this.patchVoter(uid, { photoUrl: url });
    } catch(e) {
      console.error('Error uploading profile image!')
    }
  }

  getVoter$(uid: string): Observable<Voter> {
    return new Observable(subscriber => {

      try {
        onSnapshot(doc(this.firestore, collections.voters, uid), {
          next: (snapshot) => {
            const data = snapshot.data() as Voter;
            if(data) {
              console.log(`user ${data.name} updated`);
              this.ngZone.run(() => subscriber.next(data));
            } else {
              console.log('getVoters$() snapshot.data is null')
            }

          },
          error: (e: FirestoreError) => this.ngZone.run(() => subscriber.error(e)),
          complete: () => this.ngZone.run(() => subscriber.complete())
        })
      } catch (e) {
        console.error('getVoter() observable ERROR', e);
        subscriber.error(e);
      }
    })
  }
}
