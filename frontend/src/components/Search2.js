import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import DiagnosisContainer from './Diagnosis'
import axios from 'axios';

class SearchContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            symptoms: [],
            ready: false,
            currentSymptom: ""
        }

        this.pickSymptom = this.pickSymptom.bind(this)
    }

    pickSymptom(e){
        console.log(e.target.value)
        this.setState({
            ready:true
        })

        this.setState({
            currentSymptom: e.target.value
        })
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/symptoms`)
        .then(res => {
            // console.log("test", res.data)
            this.setState({
                symptoms: res.data
            })

            // console.log("state", this.state)
            // console.log("state", this.state)
            // const persons = res.data;
            // this.setState({ persons });
        })

        // console.log(this.state)

    }

    render() {
 
        
        return (
            <div className="SearchComponent">
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Custom select</Form.Label>
                    <Form.Control as="select" custom onChange={this.pickSymptom}>
                        <option>Pick your symptom</option>
                        {
                            this.state.symptoms.map((symptom,i) => {
                                return <option key={i}>{symptom.name}</option>
                            })
                        }
                        
                    </Form.Control>
                    {
                        this.state.ready ? <DiagnosisContainer symptom={this.state.currentSymptom} /> : ""
                    }
                    </Form.Group>
                </Form>
            </div>
            
            
            
        );
    }
}

export default SearchContainer