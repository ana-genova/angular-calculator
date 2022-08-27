import {Component} from '@angular/core';

import {Operator} from "./model/operator.model";
import {OperatorTypeEnum} from "./enum/operatorType.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';

  numbers: Array<number> = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  operators: Array<Operator> = [
    new Operator('÷', OperatorTypeEnum.DIVISION),
    new Operator('x', OperatorTypeEnum.MULTIPLICATION),
    new Operator('-', OperatorTypeEnum.SUBTRACTION),
    new Operator('+', OperatorTypeEnum.ADDITION)
  ];

  current: string = '0';
  previous: string = '';

  onClickNumber(number: number): void {
    this.current === '0' ? this.current = number.toString() : this.current += number;
  }

  onClickOperator(operator: Operator): void {
    if (this.previous !== '' && this.current === '0') {
      this.changeOperator(operator);
      return;
    }

    this.previous = `${this.calculate(operator)} ${operator.display} `;
    this.current = '0';
  }

  reset(all = true): void {
    this.current = '0';
    if (all) {
      this.previous = '';
    }
  }

  total(): void {
    const operator: Operator | undefined = this.operators.find(item => item.display === this.previous.split(' ')[1]);
    if (operator) {
      this.current = this.calculate(operator).toString();
      this.previous = '';
    }
  }

  private changeOperator(operator: Operator): void {
    this.previous = `${this.previous.split(' ')[0]} ${operator.display}`;
  }

  private calculate(operator: Operator): number {
    const previous = Number(this.previous.split(' ')[0]) ?? 0;
    const current = Number(this.current);

    if (previous === 0) {
      return current;
    }

    switch (operator.type) {
      case OperatorTypeEnum.MULTIPLICATION:
        return previous * current;
      case OperatorTypeEnum.DIVISION:
        return previous / current;
      case OperatorTypeEnum.ADDITION:
        return previous + current;
      case OperatorTypeEnum.SUBTRACTION:
        return previous - current;
      default:
        return 0;
    }
  }
}
