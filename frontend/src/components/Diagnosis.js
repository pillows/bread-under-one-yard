import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DiagnosisContainer = (props) => {
	return(
		<div className="DiagnosisContainer">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Diagnosis Suggestion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Possible Diagnosis: {props.diagnosis[props.rank].name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.correctChoice} variant="primary">Correct</Button>
                    <Button onClick={props.rejectChoice} variant="secondary">Next Suggestion</Button>
                </Modal.Footer>
            </Modal.Dialog>
		</div>
	)   
}

export default DiagnosisContainer