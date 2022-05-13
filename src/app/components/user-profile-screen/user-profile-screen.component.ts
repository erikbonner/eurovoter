import { Component } from '@angular/core';
import { AppConstants } from 'src/app/models/app-constants.const';
import { DbService } from 'src/app/services/db.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';

/**
 * Screen for configuring and updating user profile.
 */
@Component({
  selector: 'app-user-profile-screen',
  templateUrl: './user-profile-screen.component.html',
  styleUrls: ['./user-profile-screen.component.scss']
})
export class UserProfileScreenComponent {
  public readonly defaultAvatar = AppConstants.defaultAvatar;

  constructor(
    readonly userService: UserService,
    private readonly dbService: DbService,
    private readonly routingService: RoutingService
    ) { }

  onUpdateUser(event: any, uid: string) {
    console.log('onUpdateUser', event?.target?.value, uid)
    const name = event?.target?.value

    this.dbService.patchVoter(uid, {name})
  }

  onFileSelected(event: any, uid: string) {
    const file = event.target.files[0]
    if (file) {
      this.dbService.updateVoterProfileImage(uid, file)
    }
  }

  onHome() {
    this.routingService.home();
  }
}
