import { APP_BASE_HREF } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/models/app-constants.const';
import { Voter } from 'src/app/models/voter.model';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  public readonly defaultAvatar = this.baseHref + AppConstants.defaultAvatar;

  @Input() src: string | null | undefined = null; 
  
  get url(): string {
    return this.src ?? this.defaultAvatar;
  }
  
  constructor(@Inject(APP_BASE_HREF) readonly baseHref: string) { }
}
