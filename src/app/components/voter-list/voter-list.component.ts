import { Component, Input, OnInit } from '@angular/core';
import { Voter } from 'src/app/models/voter.model';

@Component({
  selector: 'app-voter-list',
  templateUrl: './voter-list.component.html',
  styleUrls: ['./voter-list.component.scss']
})
export class VoterListComponent {
  @Input() voters: Voter[] = []
}
