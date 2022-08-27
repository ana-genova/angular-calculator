import {OperatorTypeEnum} from "../enum/operatorType.enum";

export class Operator {
  display: string;
  type: OperatorTypeEnum

  constructor(display: string, operator: OperatorTypeEnum) {
    this.display = display;
    this.type = operator;
  }
}
