import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router} from '@angular/router';
import { InputBoxComponent } from "../input-box/input-box.component";
import { WebsocketService } from '../services/websocket.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

interface GameMessage {
  type: string;
  [key: string]: any;
}

interface QuestionRanges {
  minAddition: string;
  maxAddition: string;
  minMultiplication: string;
  maxMultiplication: string;
}

@Component({
  selector: 'app-entry-page',
  imports: [
    RouterOutlet,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './entry-page.component.html',
  styleUrl: './entry-page.component.css'
})

export class EntryPageComponent implements OnInit {
  username: string = "anonymous";
  minAddition: string = '1';
  maxAddition: string = '100';
  minMultiplication: string = '1';
  maxMultiplication: string = '100';

  constructor(public socket: WebsocketService, private router: Router) {}

  ngOnInit(): void {
    this.socket.onMessage.subscribe((msg: string) => {
      try {
        this.onMessage(JSON.parse(msg));
      }
      catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    });

    let ranges = this.loadQuestionRangesCache();
    if (ranges != null) {
      this.minAddition = ranges.minAddition;
      this.maxAddition = ranges.maxAddition;
      this.minMultiplication = ranges.minMultiplication;
      this.maxMultiplication = ranges.maxMultiplication;
    }
  }

  loadQuestionRangesCache(): QuestionRanges {
    const data = localStorage.getItem("questionRanges");
    return data ? JSON.parse(data) : null;
  }

  setQuestionRangesCache() {
    localStorage.setItem("questionRanges", JSON.stringify({"minAddition": this.minAddition, "maxAddition": this.maxAddition, "minMultiplication": this.minMultiplication, "maxMultiplication": this.maxMultiplication}));
  }

  onMessage(msg: GameMessage) {
    switch (msg.type) {
      case "joinedGame": this.router.navigate(['/game']); break;
      case "gameCreated": this.router.navigate(['/game']); break;
      case "error": console.log(msg["message"]); break;
    }
  }

  onCreateGame(gameID: string) {
    this.socket.login(this.username);
    this.setQuestionRangesCache();
    this.socket.createGame(gameID, +this.minAddition, +this.maxAddition, +this.minMultiplication, +this.maxMultiplication);
    this.socket.requestQuestion();
  }

  onJoinGame(gameID: string) {
    this.socket.login(this.username);
    this.socket.joinGame(gameID);
    this.socket.requestQuestion();
  }
}
