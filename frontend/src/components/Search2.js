import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import axios from 'axios';

class SearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            symptoms: []
        }

        this.pickSymptom = this.pickSymptom.bind(this)
    }

    pickSymptom(e){
        console.log(e)
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
                    <Form.Control as="select" custom>
                        <option>Pick your symptom</option>
                        {
                            this.state.symptoms.map((symptom,i) => {
                                return <option onClick={this.pickSymptom} key={i}>{symptom.name}</option>
                            })
                        }
                    </Form.Control>
                    </Form.Group>
                </Form>
            </div>
            
            
            
        );
    }
}

export default SearchComponent