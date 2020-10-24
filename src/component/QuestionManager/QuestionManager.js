import React from 'react';
import BoxNumber from "../BoxNumber/BoxNumber";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import './style.scss';

const MAX_INTEGER = 10;

class QuestionManager extends React.Component {
    constructor(...props) {
        super(...props);
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


        while(this.props.mathReducer.lastQuestions.includes([{num1, num2, num3, num4}]))
        {
            num1 = this.genRandomInteger(MAX_INTEGER);
            num3 = this.genNextInteger(num1);
            num2 = this.genRandomInteger(MAX_INTEGER);
            num4 = this.genNextInteger(num2);
        }

        return [{num1, num2, num3, num4}];
    }

    addQuestions = (quantity) => {
        for(let i=0; i < quantity; ++i)
        {
            this.props.addQuestion(this.createQuestion());
        }
    }

    componentDidMount()
    {
        //Todo: Trigger addQuestions(quantity)
    }

    render() {
        return (
            <Container >
                <h1>{this.props.userReducer.name}</h1>
                <h1>{console.log(this.props.mathReducer.lastQuestions)}</h1>

                <Row className={'questions-container row-spacing'}>
                    {this.props.mathReducer.lastQuestions.map((questions, index) =>(
                        <Row className={'row-spacing'} key={index}>
                            {questions.map((question, index2) => (
                                <Col key={index2}><BoxNumber question={question} /></Col>
                            ))}
                        </Row>
                    ))}
                </Row>

                <button onClick={() => this.addQuestions(1)}>Add Questions</button>
                <button onClick={() => this.props.setName('Atroshi')}>Test</button>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      userReducer: state.userReducer,
      mathReducer: state.mathReducer,
  };
};

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
            dispatch({
               type: 'ADD_QUESTION',
               payload: question
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionManager);