import { Injectable } from '@angular/core';
import { collectionData, Firestore, collection, doc, updateDoc, query, where, getDocs, CollectionReference, DocumentData, setDoc, getDoc, onSnapshot, FirestoreError } from '@angular/fire/firestore';
import { map, Observable, tap } from 'rxjs';
import { Country } from '../models/country.model';
import { Voter } from '../models/voter.model';

const collections = {
  voters: 'voters',
  countries: 'countries2022'
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  readonly countries$: Observable<Country[]>;
  readonly voters$: Observable<Voter[]>;

  private readonly votersCollectionRef: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore
  ) {
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

  async addVoter(voter: Voter) {
    try {
      const docRef = doc(this.firestore, collections.voters, voter.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log('User does not already exist, adding...')
        await setDoc(doc(this.votersCollectionRef, voter.uid), { ...voter })
      }
    } catch (e) {
      console.error('addVoter error: ', JSON.stringify(e))
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

  getVoter$(uid: string): Observable<Voter> {
    return new Observable(subscriber => {
      try {
        onSnapshot(doc(this.firestore, collections.voters, uid), {
          next: (snapshot) => {
            const data = snapshot.data() as Voter;
            console.log(`user ${data.name} updated`);
            subscriber.next(data);
          },
          error: (e: FirestoreError) => subscriber.error(e),
          complete: () => subscriber.complete()
        })
      } catch (e) {
        console.error('getVoter() observable ERROR', e);
        subscriber.error(e);
      }
    })
  }
}
