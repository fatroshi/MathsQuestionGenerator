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
        this.limits = this.setIntegerMaxLimit(grade)
        this.numbers = null;
    }

    // TODO: This is for addition only, need to adjust this for handling other operations, and more numbers
    setIntegerMaxLimit = (grade) => {
        switch (grade)
        {
            case GRADE.FIRST: return {maxNumberValue: 10, maxNumbers: 4};
            case GRADE.SECOND: return {maxNumberValue: 10, maxNumbers: 4};
            case GRADE.THIRD: return {maxNumberValue: 10, maxNumbers: 6};
        }
    }

    genRandomInteger = (maxLimit) => {
        return Math.floor(Math.random() * maxLimit);
    }

    genNextInteger = (integer) => {
        let limit = this.limits.maxNumberValue;

        if (this.grade === GRADE.FIRST) {
            limit = this.limits.maxNumberValue - integer;
        }

        return this.genRandomInteger(limit);
    }

    create = () => {
        let num1, num2, num3, num4 = 0;

        num1 = this.genRandomInteger(this.limits.maxNumberValue);
        num3 = this.genNextInteger(num1);
        num2 = this.genRandomInteger(this.limits.maxNumberValue);
        num4 = this.genNextInteger(num2);

        this.numbers = [{num1, num2, num3, num4}];
        return this.numbers;
    }

}