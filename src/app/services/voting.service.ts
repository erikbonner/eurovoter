import { Injectable } from '@angular/core';
import { combineLatest, filter, map, Observable, take, tap } from 'rxjs';
import { Country } from '../models/country.model';
import { Vote } from '../models/vote.model';
import { Voter } from '../models/voter.model';
import { DbService } from './db.service';
import { UserService } from './user.service';

export interface RankedCountry {
  rank: number,
  country: Country,
  score: number
}

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  readonly results$: Observable<Array<RankedCountry>>

  constructor(
    private readonly userService: UserService,
    private readonly dbService: DbService
  ) {
    this.results$ =
      combineLatest([this.dbService.voters$, this.dbService.countries$]).pipe(
        map(this.getRankings.bind(this)),
        tap(result => console.log('Ranking: ', result))
      )
  }

  getRankings([voters, countries]: [Voter[], Country[]]): RankedCountry[] {
    const rankingHistogram = new Map<string, number>()

    // init our histogram
    countries.forEach(country => rankingHistogram.set(country.code, 0))

    const updateHistogram = (country: Country, score: number) => {
      const currValue = rankingHistogram.get(country.code) ?? 0;
      rankingHistogram.set(country.code, currValue + score)
    }

    // build our histogram
    voters.filter(voter => !!voter.vote).forEach(voter => {
      const { firstPlace, secondPlace, thirdPlace } = voter.vote!!;
      firstPlace && updateHistogram(firstPlace,  3);
      secondPlace && updateHistogram(secondPlace, 2);
      thirdPlace && updateHistogram(thirdPlace, 1);
    });

    console.log('rankingHistogram', rankingHistogram)

    // map histogram to a sorted results array
    const rankedResult: { country: Country, score: number }[] = []
    rankingHistogram.forEach((score, code) => {
      const country = countries.find(c => c.code === code);
      country && rankedResult.push({ country, score });
    })

    return rankedResult
      .sort((a, b) => b.score - a.score)
      .map((result, index) => ({
        rank: index + 1,
        ...result
      }));
  }

  /**
   * Updates vote for logged-in user
   */
  updateVote(vote: Vote) {
    this.userService.loggedInUser$.pipe(take(1)).subscribe(
      voter => {
        voter && this.dbService.patchVoter(voter.uid, { vote });
      }
    )
  }
}
