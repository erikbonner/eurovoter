import { Component, Input, OnInit } from '@angular/core';
import { Voter } from 'src/app/models/voter.model';

@Component({
  selector: 'app-voter-info',
  templateUrl: './voter-info.component.html',
  styleUrls: ['./voter-info.component.scss']
})
export class VoterInfoComponent implements OnInit {

  @Input() voter: Voter
  constructor() { }

  ngOnInit(): void {
  }

}
	