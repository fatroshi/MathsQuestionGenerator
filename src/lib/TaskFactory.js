import AdditionFactory from './AdditionFactory';
import {OPERATION, GRADE} from "./Question";


export default class TaskFactory {
    constructor(grade) {
        this.grade = grade;
        this.additionFactory = new AdditionFactory(grade);
    }

    create = (operation) => {
        switch (operation)
        {
            case OPERATION.ADDITION: return this.additionFactory.createQuestion();
            case OPERATION.SUBTRACTION:
                //TODO: implement
                return null;
            case OPERATION.MULTIPLICATION:
                //TODO: implement
                return null;
        }
    }
}