import { Problem } from '../problem.model';
import { evaluate } from 'mathjs';

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

class ProblemGenerator {
  constructor(private min: number = 1,
    private max: number = 10,
    private operator: string = "+"
  ) {}

  generateNumber() {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  generateProblem() {
    let num1: number = this.generateNumber();
    let num2: number = this.generateNumber();

    return new Problem(`${num1} ${this.operator} ${num2}`, Math.floor(evaluate(`${num1} ${this.operator} ${num2}`)).toString());
  }
}

export class ProblemGeneratorService {
  private additionGenerator: ProblemGenerator = new ProblemGenerator(1, 10, "+");
  private subtractionGenerator: ProblemGenerator = new ProblemGenerator(1, 10, "-");
  private multiplicationGenerator: ProblemGenerator = new ProblemGenerator(1, 10, "*");
  private divisionGenerator: ProblemGenerator = new ProblemGenerator(1, 10, "/");

  constructor() {}

  setAdditionRange(min: number, max:number) {
    this.additionGenerator = new ProblemGenerator(min, max, "+");
  }

  setSubtractionRange(min: number, max: number) {
    this.subtractionGenerator = new ProblemGenerator(min, max, "-");
  }
  setMultiplicationRange(min: number, max: number) {
    this.multiplicationGenerator = new ProblemGenerator(min, max, "*");
  }

  setDivisionRange(min: number, max: number) {
    this.divisionGenerator = new ProblemGenerator(min, max, "/");
  }

  // TODO: fix division
  generateProblem() {
    let generator = randomChoice([this.additionGenerator, this.subtractionGenerator, this.multiplicationGenerator]);
    return generator.generateProblem();
  }

  generateAdditionProblem() {
    return this.additionGenerator.generateProblem();
  }

  generateSubtractionProblem() {
    return this.subtractionGenerator.generateProblem();
  }

  generateMultiplicationProblem() {
    return this.multiplicationGenerator.generateProblem();
  }

  generateDivisionProblem() {
    return this.divisionGenerator.generateProblem();
  }
}
