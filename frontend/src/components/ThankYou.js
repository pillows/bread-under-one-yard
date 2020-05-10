import React from 'react';
import Modal from 'react-bootstrap/Modal'

const ThankYou = () => {
    return (
    <div>
        <Modal centered show={true} animation={false}>
            <Modal.Header>
                <Modal.Title>Thank You! 😊 </Modal.Title>
            </Modal.Header>
            <Modal.Body>Thank you for picking a diagnosis! This modal will close in <span id="seconds">5</span> seconds and show you statistics</Modal.Body>
        </Modal>
    </div>
    )
}

export default ThankYou