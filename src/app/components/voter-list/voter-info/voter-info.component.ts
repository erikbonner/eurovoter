import { APP_BASE_HREF } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { AppConstants } from 'src/app/models/app-constants.const';
import { Voter } from 'src/app/models/voter.model';

@Component({
  selector: 'app-voter-info',
  templateUrl: './voter-info.component.html',
  styleUrls: ['./voter-info.component.scss']
})
export class VoterInfoComponent {
  public readonly defaultAvatar = AppConstants.defaultAvatar;
  @Input() voter: Voter
  constructor(@Inject(APP_BASE_HREF) readonly baseHref: string) { }
}
	