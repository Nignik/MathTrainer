import { Injectable, OnInit } from '@angular/core';
import { ProblemGeneratorService } from './problem-generator.service';
import { Problem } from '../problem.model';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private score: number = 0;
  private problemGenerator = new ProblemGeneratorService();
  private currentProblem: Problem = new Problem("", "");

  constructor() {
    this.score = JSON.parse(localStorage.getItem('userScore') || '0');
  }

  // TODO: add opetion to set subtraction and division separately
  startGame(minAddition: number, maxAddition: number, minMultiplication: number, maxMultiplication: number): void {
    this.problemGenerator = new ProblemGeneratorService();
    this.problemGenerator.setAdditionRange(minAddition, maxAddition);
    this.problemGenerator.setSubtractionRange(minAddition, maxAddition);
    this.problemGenerator.setMultiplicationRange(minMultiplication, maxMultiplication);
    this.problemGenerator.setDivisionRange(minMultiplication, maxMultiplication);
    this.nextQuestion();
  }

  increaseScore(): void {
    this.score++;
    localStorage.setItem('userScore', JSON.stringify(this.score));
  }

  getScore(): number {
    return this.score;
  }

  getQuestion(): string {
    return this.currentProblem.question;
  }

  nextQuestion(): void {
    this.currentProblem = this.problemGenerator.generateProblem();
  }

  isAnswerCorrect(userAnswer: string): boolean {
    return userAnswer == this.currentProblem.answer;
  }
}
