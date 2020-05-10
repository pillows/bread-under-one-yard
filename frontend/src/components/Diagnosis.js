import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const DiagnosisContainer = () => {
	return(
		<div className="DiagnosisContainer">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Diagnosis Suggestion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Maybe you have the {this.props.diagnosis[this.props.rank].name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.correctChoice} variant="primary">Correct</Button>
                    <Button onClick={this.props.rejectChoice} variant="secondary">Next Suggestion</Button>
                </Modal.Footer>
            </Modal.Dialog>
		</div>
	)   
}

export default DiagnosisContainer