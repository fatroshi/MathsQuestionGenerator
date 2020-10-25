export const GRADE = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
}

export const OPERATION = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*'
}

export default class Question {
    constructor(operation, grade) {
        this.operation = operation;
        this.grade = grade;
        this.integerMaxLimit = this.setIntegerMaxLimit(grade)
        this.question = null;
    }

    // TODO: This is for addition only, need to adjust this for handling other operations.
    setIntegerMaxLimit = (grade) => {
        switch (grade)
        {
            case GRADE.FIRST: return 10;
            case GRADE.SECOND: return 20;
            case GRADE.THIRD: return 30;
        }
    }

    genRandomInteger = (maxLimit) => {
        return Math.floor(Math.random() * maxLimit);
    }

    genNextInteger = (integer) => {
        const limit = this.integerMaxLimit - integer;
        return this.genRandomInteger(limit);
    }

    createQuestion = () => {
        let num1, num2, num3, num4 = 0;

        num1 = this.genRandomInteger(this.integerMaxLimit);
        num3 = this.genNextInteger(num1);
        num2 = this.genRandomInteger(this.integerMaxLimit);
        num4 = this.genNextInteger(num2);

        this.question = [{num1, num2, num3, num4}];
        return this.question;
    }

}