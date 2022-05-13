import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { Vote } from 'src/app/models/vote.model';
import { DbService } from 'src/app/services/db.service';
import { UserService } from 'src/app/services/user.service';
import { VotingService } from 'src/app/services/voting.service';

/**
 * The main voting screen.
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public readonly trackByFn = (index: number, country: Country) => country.code

  constructor(
    readonly dbService: DbService,
    readonly userService: UserService,
    readonly votingService: VotingService
    ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.userService.logout()
  }

  onVoteChanged(vote: Vote) {
    console.log('onVoteChanged: vote', vote)
    this.votingService.updateVote(vote);
  }
}
