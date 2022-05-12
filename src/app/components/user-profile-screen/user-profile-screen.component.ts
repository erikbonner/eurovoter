import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AppConstants } from 'src/app/models/app-constants.const';
import { DbService } from 'src/app/services/db.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-screen',
  templateUrl: './user-profile-screen.component.html',
  styleUrls: ['./user-profile-screen.component.scss']
})
export class UserProfileScreenComponent implements OnInit {
  public readonly defaultAvatar = AppConstants.defaultAvatar;

  constructor(
    readonly userService: UserService,
    private readonly dbService: DbService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    const inputNode: any = document.querySelector('#file');
    console.log(inputNode)
  }

  onUpdateUser(event: any, uid: string) {
    console.log('onUpdateUser', event?.target?.value, uid)
    const name = event?.target?.value

    this.dbService.patchVoter(uid, {name})
  }

  onFileSelected(event: any, uid: string) {
    const file = event.target.files[0]
    console.log('OnFileSelected', file)
    if (file) {
      this.dbService.updateVoterProfileImage(uid, file)
    }
  }

  onHome() {
    this.router.navigateByUrl('/main')
  }
}
