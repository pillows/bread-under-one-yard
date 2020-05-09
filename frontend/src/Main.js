import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015

const Main = () => {
    return (
        <div className="main">
            
            <Container className="">
                <Row className="v-center">
                <Col xs="3"></Col>
                    <Col xs="6" >
                        <h1>Symptom Diagnostic</h1>
                        <Typeahead
                            onChange={(selected) => {
                            // Handle selections...
                            }}
                            options={[ 'test', 'cool' ]}
                        />
                    </Col>
                    <Col xs="3"></Col>
                </Row>
            </Container>

            
        </div>
    )
}

export default Main;