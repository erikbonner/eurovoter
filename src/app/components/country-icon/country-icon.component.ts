import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-country-icon',
  template: `<span [ngClass]="['fi', 'fi-' + country.code]"></span>`,
})
export class CountryIconComponent {
  @Input() country: Country
}
