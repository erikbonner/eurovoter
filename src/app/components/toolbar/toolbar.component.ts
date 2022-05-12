import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() profileUrl: string | null | undefined = null;
  @Output() home = new EventEmitter<void>();
  @Output() account = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
}
