import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';

interface GameMessage {
  type: string;
  [key: string]: any;
}

@Component({
  selector: 'app-game-page',
  imports: [
    RouterOutlet,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatPaginator
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css'
})

export class GamePageComponent implements OnInit {
  public score: number = 0;
  public question: string = "";
  public userInput: string = "";
  public leaderboard: { name: string, score: number }[] = [];
  public displayedColumns: string[] = ['name', 'score', 'playTime'];

  constructor(public socket: WebsocketService) {}

  ngOnInit(): void {
    this.socket.onMessage.subscribe((msg: string) => {
      try {
        this.onMessage(JSON.parse(msg));
      }
      catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    });
  }

  onMessage(msg: GameMessage) {
    switch (msg.type) {
      case "joinedGame": this.onJoinedGame(); break;
      case "gameCreated": break;
      case "question": this.onQuestionReceived(msg["question"]); break;
      case "answerWasCorrect": this.onAnswerCorrect(); break;
      case "leaderboard": this.onLeaderboardReceived(msg["leaderboard"]); break;
      case "error": console.log(msg["message"]); break;
    }
  }

  onJoinedGame() {
    
  }

  onLeaderboardReceived(leaderboard: {"name": string, "score": number, "playeTime": number}[]) {
    this.leaderboard = leaderboard;
  }

  onQuestionReceived(question: string) {
    this.question = question;
  }

  onAnswerCorrect() {
    this.score++;
    this.userInput = "";
    this.socket.requestQuestion();
  }

  // TODO: Put this function somewhere else
  formatTime(s: number): string {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = Math.floor((s % 60));

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }


}
