import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  public onMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    //this.socket = new WebSocket('ws://139.59.140.132:3000');
    this.socket = new WebSocket('ws://localhost:3000');

    this.socket.onmessage = (event) => {
      this.onMessage.emit(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  login(username: string) {
    this.socket.send(JSON.stringify({type: "login", username}));
  }

  joinGame(gameID: string) {
    this.socket.send(JSON.stringify({ type: 'joinGame', gameID}));
  }

  createGame(gameID: string, minAddition: number, maxAddition: number, minMultiplication: number, maxMultiplication: number) {
    this.socket.send(JSON.stringify({
      type: 'createGame',
      gameID,
      minAddition,
      maxAddition,
      minMultiplication,
      maxMultiplication
    }));
  }

  requestQuestion() {
    this.socket.send(JSON.stringify({ type: 'questionRequest'}))
  }

  submitAnswer(answer: number) {
    if (answer == null)
      return;

    this.socket.send(JSON.stringify({ type: 'playerAnswer', answer: answer.toString() }));
  }

  leaveGame() {
    this.socket.send(JSON.stringify({ type: 'leaveGame'}));
  }
  
}
