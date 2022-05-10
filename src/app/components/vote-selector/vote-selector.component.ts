import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/models/country.model';
import { Vote } from 'src/app/models/vote.model';

@Component({
  selector: 'app-vote-selector',
  templateUrl: './vote-selector.component.html',
  styleUrls: ['./vote-selector.component.scss']
})
export class VoteSelectorComponent implements OnChanges {

  /**
   * Models for the first, second and third place selectors
   */
  selectModels: { label: string, selection: Country | undefined }[] = [
    {
      label: 'Select first place',
      selection: undefined
    },
    {
      label: 'Select second place',
      selection: undefined
    },
    {
      label: 'Select third place',
      selection: undefined
    }
  ]

  /**
   * List of countries to choose from
   */
  @Input() countries: Country[]

  @Input() vote: Vote | null = null;

  /**
   * Event raised whenever user updates their vote
   */
  @Output() voteChange = new EventEmitter<Vote>();

  constructor(private readonly snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vote } = changes;
    if (vote) {
      [
        this.vote?.firstPlace,
        this.vote?.secondPlace,
        this.vote?.thirdPlace
      ].forEach((value, index) => this.selectModels[index].selection = value)
    }
  }

  onSubmit() {

    // make sure user has made all votes
    if (this.selectModels.some(model => !model.selection?.name)) {
      this.snackBar.open("You must vote for 3 countries!", "Dismiss");
      return;
    }

    const selectionSet = new Set<string>()
    this.selectModels
      .map(model => model.selection?.name)
      .filter(name => !!name)
      .forEach(name => {
        selectionSet.add(name!)
      });

    if (selectionSet.size != 3) {
      this.snackBar.open("Nice try! You are not allowed to vote for the same country twice :-P", "Dismiss");
      return;
    }

    // console.log('onSubmit(): this.model =', this.vote);
    this.voteChange.emit({
      firstPlace: this.selectModels[0].selection,
      secondPlace: this.selectModels[1].selection,
      thirdPlace: this.selectModels[2].selection,
    });
  }

  onClear() {
    this.voteChange.emit({});
  }

}
