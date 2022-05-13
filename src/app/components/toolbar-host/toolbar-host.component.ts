import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingService } from 'src/app/services/routing.service';
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
    readonly routingService: RoutingService,
    readonly userService: UserService
  ) { }
}
