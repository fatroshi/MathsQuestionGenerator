import React from 'react';
import BoxNumber from "../../components/BoxNumber/BoxNumber";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import './style.scss';

import TaskFactory from "../../lib/TaskFactory";
import {GRADE, OPERATION} from "../../lib/Question";
import {addQuestion} from "../../actions/questionActions";

const MAX_INTEGER = 10;

class QuestionManager extends React.Component {
    constructor(...props) {
        super(...props);
    }

    SaveAsPNG = () => {
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            //document.body.appendChild(canvas);
            canvas.toBlob((blob) => {
                saveAs(canvas.toDataURL(), 'test.png', true);
            },'image/png')
        });
    }

    genRandomInteger = (maxLimit) => {
        return Math.floor(Math.random() * maxLimit);
    }

    genNextInteger = (integer) => {
        const limit = MAX_INTEGER - integer;
        return this.genRandomInteger(limit);
    }

    createQuestion = () => {
        var num1, num2, num3, num4 = 0;

        num1 = this.genRandomInteger(MAX_INTEGER);
        num3 = this.genNextInteger(num1);
        num2 = this.genRandomInteger(MAX_INTEGER);
        num4 = this.genNextInteger(num2);


        while(this.props.questionReducer.lastQuestions.includes([{num1, num2, num3, num4}]))
        {
            num1 = this.genRandomInteger(MAX_INTEGER);
            num3 = this.genNextInteger(num1);
            num2 = this.genRandomInteger(MAX_INTEGER);
            num4 = this.genNextInteger(num2);
        }

        return [{num1, num2, num3, num4}];
    }

    createQuestions = (quantity) => {
        for(let i=0; i < quantity; ++i)
        {
            this.props.addQuestion(this.createQuestion());
        }
    }

    componentDidMount()
    {
        //Todo: Trigger addQuestions(quantity)

        // Testing:
        let factory = new TaskFactory(GRADE.FIRST);
        let question = factory.create(OPERATION.ADDITION);
        console.log(question);
    }

    render() {
        return (
            <Container id='capture'>
                <h1>{this.props.userReducer.name}</h1>
                <h1>{console.log(this.props.questionReducer.lastQuestions)}</h1>

                <Row className={'questions-container row-spacing'}>
                    {this.props.questionReducer.lastQuestions.map((questions, index) =>(
                        <Row className={'row-spacing'} key={index}>
                            {questions.map((question, index2) => (
                                <Col key={index2}><BoxNumber question={question} /></Col>
                            ))}
                        </Row>
                    ))}
                </Row>

                <button onClick={() => this.createQuestions(16)}>Add Questions</button>
                <button onClick={() => this.SaveAsPNG()}>Save</button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      userReducer: state.userReducer,
      questionReducer: state.questionReducer,
  };
};

// Actions to use
const mapDispatchToProps = (dispatch) => {
    return {
        //TODO: setName action is just for testing, remove it later
        setName: (name) => {
            dispatch({
               type: 'SET_NAME',
               payload: name
            });
        },
        // alt 1.
        /*
        addQuestion: (question) => {
            dispatch({
               type: 'ADD_QUESTION',
               payload: question
            });
        }*/

        // alt. 2
        addQuestion: (question) => {
            dispatch(addQuestion(question));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionManager);