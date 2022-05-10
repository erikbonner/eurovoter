import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(firestore: Firestore) {
    const coll = collection(firestore, 'sessions');
    const item$ = collectionData(coll);
    item$.subscribe(i => {
      console.log(i);
    })
  }
  title = 'ng-eurovoter';
}
