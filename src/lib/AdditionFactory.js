import Question, {OPERATION, GRADE} from './Question'

export default class AdditionFactory {
    constructor(grade) {
        this.questions = new Array();
        this.grade = grade;
    }

    createQuestion = () => {
        let question = new Question(OPERATION.ADDITION, this.grade);
        question.createQuestion();

        // TODO: Before push check if the question is unique
        this.questions.push({question: question});

        return question;
    }
}