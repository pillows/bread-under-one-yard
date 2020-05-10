import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import DiagnosisContainer from './Diagnosis'
import axios from 'axios';

class SearchContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            symptoms: [],
            diagnosis: [],
            currentSymptom: null
        }

        this.pickSymptom = this.pickSymptom.bind(this)
    }

    requestDiagnoses(symptom){
        axios.get(`http://localhost:8000/api/symptoms/${symptom}`)
        .then(res => {

            this.setState({
                diagnosis: res.data, 
            })

        })
    }

    pickSymptom(element){
        
        const symptom = parseInt(element.target.value) + 1

        this.setState({
            currentSymptom: symptom
        },() => {
            console.log("i am in pickSymptom", this.state)
        })

        this.requestDiagnoses(symptom)
        
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/symptoms`)
        .then(res => {
            // console.log("test", res.data)

            this.setState({
                symptoms: res.data
            })
        })

    }

    render() {
 
        return (
            <div className="SearchComponent">
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Custom select</Form.Label>
                    <Form.Control as="select" custom onChange={this.pickSymptom.bind(this)}>
                        <option >Pick your symptom</option>
                        {
                            this.state.symptoms.map((symptom,i) => {
                                return <option value={i} key={symptom.name}>{symptom.name}</option>
                            })
                        }
                        
                    </Form.Control>
                    {
                        this.state.diagnosis.length ? <DiagnosisContainer diagnosis={this.state.diagnosis}/> : ""
                    }
                    </Form.Group>
                </Form>
            </div>
            
            
        );
    }
}

export default SearchContainer