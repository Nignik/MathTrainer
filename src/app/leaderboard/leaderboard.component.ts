import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  imports: [CommonModule],
  styleUrls: ['./leaderboard.component.css']
})

export class  LeaderboardComponent {
  @Input() leaderboard: { name: string, score: number }[] = [];

  addEntry(playerID: string, score: number) {
      this.leaderboard.push({"name": playerID, "score": score});
  }

  deleteEntry(name: string) {
    this.leaderboard = this.leaderboard.filter(entry => entry.name !== name);
  }

  changeEntry(name: string, score: number) {
    let entry = this.leaderboard.find(entry => entry.name === name);
    if (entry) {
      entry.score = score;
    }
  }
}
