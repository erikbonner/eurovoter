import { Component, Input, OnInit } from '@angular/core';
import { RankedCountry } from 'src/app/services/voting.service';

@Component({
  selector: 'app-ranking-table',
  templateUrl: './ranking-table.component.html',
  styleUrls: ['./ranking-table.component.scss']
})
export class RankingTableComponent {
  displayedColumns: string[] = ['rank', 'country', 'score'];
  @Input() rankings: RankedCountry[] = []
}
