import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import downArrow from '../../img/downArrow.png';
import style from './style.scss'
import Image from 'react-bootstrap/Image'

class BoxNumber extends React.Component {

    replaceZeroWithSpace = (number) => {
        return number === 0 ? ' ' : number;
    }

    componentDidMount()
    {

    }

    render() {
        const {question} = this.props;
        const numbers = {
            'num1': this.replaceZeroWithSpace(question.num1),
            'num2': question.num2,
            'num3': this.replaceZeroWithSpace(question.num3),
            'num4': question.num4
        };

        const {num1, num2, num3, num4} = numbers;

        return(
            <div className={'question'}>
                <Container className={''}>
                    <Row className={'sm-first-row'}>
                        <Col xs={1} md="auto" className={'sm-box first-term'}> {num1} </Col>
                        <Col xs={1} md="auto" className={'sm-box first-term'}> {num2}</Col>
                        <Col xs={1} md="auto" className={'sm-box'}> + </Col>
                        <Col xs={1} md="auto" className={'sm-box second-term'}> {num3} </Col>
                        <Col xs={1} md="auto" className={'sm-box second-term'}> {num4}</Col>
                    </Row>

                    <Row>
                        <Col>  </Col>
                        <Col>  </Col>
                            <Image src={downArrow} className={'down-arrow'}/>
                        <Col>  </Col>
                        <Col>  </Col>
                    </Row>


                    <Row className={'md-row'}>
                        <Col xs={1} md={4} className={'md-box'}></Col>
                        <Col xs={1} md={4} className={'md-box first-term'}></Col>
                        <Col xs={1} md={4} className={'md-box first-term'}></Col>
                    </Row>

                    <Row className={'md-row'}>
                        <Col xs={1} md={4} className={'md-box'}></Col>
                        <Col xs={1} md={4} className={'md-box first-term'}>{num1}</Col>
                        <Col xs={1} md={4} className={'md-box first-term'}>{num2}</Col>
                    </Row>

                    <Row className={'penultimate-row'}>
                        <Col xs={1} md={4} className={'md-box'}>+</Col>
                        <Col xs={1} md={4} className={'md-box second-term'}>{num3} </Col>
                        <Col xs={1} md={4} className={'md-box second-term'}>{num4}</Col>
                    </Row>

                    <Row className={'equal-row'}>
                        <Col xs={1} md={4} className={'md-box'}></Col>
                        <Col xs={1} md={4} className={'md-box'}></Col>
                        <Col xs={1} md={4} className={'md-box'}></Col>
                    </Row>

                </Container>
            </div>
        )
    }
}

export default BoxNumber;