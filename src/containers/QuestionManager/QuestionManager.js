import React from 'react';
import BoxNumber from "../../components/BoxNumber/BoxNumber";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

    saveAsPDF = () => {
        const input = document.getElementById('page');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG',0, 0, 210, 297);
                pdf.save("download.pdf");
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
            <>
                <h1>{this.props.userReducer.name}</h1>
                <button onClick={() => this.createQuestions(3)}>Add Questions</button>
                <button onClick={() => this.saveAsPDF()}>Save</button>

                <Container id='page' className='page'>
                    <div className=''>
                        <Row className={'questions-container row-spacing'}>
                            {this.props.questionReducer.lastQuestions.map((questions, index) =>(
                                <Row className={'row-spacing'} key={index}>
                                    {questions.map((question, index2) => (
                                        <Col key={index2}><BoxNumber question={question} /></Col>
                                    ))}
                                </Row>
                            ))}
                        </Row>
                    </div>

                </Container>
            </>
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

        addQuestion: (question) => {
            dispatch(addQuestion(question));
        },

        addQuestionAsync: (question) => {
            dispatch(addQuestionAsync(question));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionManager);