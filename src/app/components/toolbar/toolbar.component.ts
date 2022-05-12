import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConstants } from 'src/app/models/app-constants.const';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  public readonly defaultAvatar = AppConstants.defaultAvatar;
  @Input() profileUrl: string | null | undefined = null;
  @Output() home = new EventEmitter<void>();
  @Output() account = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
}
