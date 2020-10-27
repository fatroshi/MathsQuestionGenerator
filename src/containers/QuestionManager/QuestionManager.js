import React from 'react';
import BoxNumber from "../../components/BoxNumber/BoxNumber";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import './style.scss';

import TaskFactory from "../../lib/TaskFactory";
import {GRADE, OPERATION} from "../../lib/Question";
import {addQuestion, addQuestionAsync} from "../../actions/questionActions";

const MAX_INTEGER = 10;

class QuestionManager extends React.Component {
    constructor(...props) {
        super(...props);
        this.factory = new TaskFactory(GRADE.FIRST);
    }

    saveAsPNG = () => {
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            //document.body.appendChild(canvas);
            canvas.toBlob((blob) => {
                saveAs(canvas.toDataURL(), 'test.png', true);
            },'image/png')
        });
    }

    createQuestions = (quantity) => {
        for(let i=0; i < quantity; ++i)
        {
           let question = this.factory.create(OPERATION.ADDITION);
           this.props.addQuestionAsync(question.numbers);
        }
    }

    componentDidMount()
    {

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
                <button onClick={() => this.saveAsPNG()}>Save</button>
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
        },

        addQuestionAsync: (question) => {
            dispatch(addQuestionAsync(question));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionManager);