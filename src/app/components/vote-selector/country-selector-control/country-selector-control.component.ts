import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-country-selector-control',
  templateUrl: './country-selector-control.component.html',
  styleUrls: ['./country-selector-control.component.scss']
})
export class CountrySelectorControlComponent  {

  /**
   * List of countries to choose from
   */
   @Input() countries: Country[] = []

   @Input() selectedCountry: Country | undefined = undefined;

   @Input() label: string | undefined = undefined;

   /**
    * Event raised whenever user updates their vote
    */
   @Output() selectedCountryChange = new EventEmitter<Country>();

   onCountrySelected(countryName: string) {
    const country = this.countries?.find(c => c.name === countryName)
    this.selectedCountryChange.emit(country)
   }
}
