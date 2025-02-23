import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { WebsocketService } from './services/websocket.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MathTrainer';

  constructor(private router: Router, public socket: WebsocketService)  {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/game') {
          this.onGame();
        }
        else if (event.url === '/entry') {
          this.onEntry();
        }
      }
    });
  }

  onGame() {
    console.log('Route changed to game');
  }

  onEntry() {
    console.log('Route changed to entry');
    this.socket.leaveGame();
  }

}
