import { Component, Input, OnInit } from '@angular/core';
import { Voter } from 'src/app/models/voter.model';

@Component({
  selector: 'app-voter-avatar',
  templateUrl: './voter-avatar.component.html',
  styleUrls: ['./voter-avatar.component.scss']
})
export class VoterAvatarComponent {
  @Input() voter: Voter
}
