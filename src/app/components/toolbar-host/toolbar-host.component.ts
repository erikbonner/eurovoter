import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

/**
 * Smart component that wrap the dumb toolbar and connects it to a router
 */
@Component({
  selector: 'app-toolbar-host',
  templateUrl: './toolbar-host.component.html',
  styleUrls: ['./toolbar-host.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarHostComponent {

  constructor(
    private readonly router: Router,
    readonly userService: UserService
  ) { }

  onHome() {
    this.routeTo('/main');
  }

  onAccount() {
    this.routeTo('/profile');
  }

  onLogout() {
    this.userService.logout()
  }

  private routeTo(url: string) {
    this.router.navigateByUrl(url)
  }
}
