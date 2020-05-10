import axios from 'axios';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import DiagnosisContainer from './Diagnosis'
import GraphDiagnosesCount from './GraphDiagnosesCount'
import ThankYou from './ThankYou'


class SearchContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symptomsData: [],
            diagnosisData: [],
            graphData: {},
            symptomRank: 0,
            showThanksModal: false,
            startId: 0,
            showGraph: false,
            symptomId: 0
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/symptoms`)
        .then(res => {
            this.setState({
                symptomsData: res.data
            })
        })
    }

    requestDiagnoses = (symptomId) => {
        axios.get(`http://localhost:8000/api/symptoms/${symptomId}`)
            .then(res => {
                console.log("data", res)
                this.setState({
                    diagnosisData: res.data,
                    startId: res.data[0].id
                })
            })
    }

    rejectChoice = () => {
        if(this.state.symptomRank === this.state.diagnosisData.length - 1){
            alert("all choices rejected")
            return
        }
        this.setState({ symptomRank: this.state.symptomRank + 1 })
    }

    generateGraphData = () => {
        this.requestDiagnoses(this.state.symptomId)
        let diagnosisNames = []
        let diagnosisCounts = []

        //comment
        for(const diag of this.state.diagnosisData){
            diagnosisNames.push(diag.name) // x-axis
            diagnosisCounts.push(diag.counter) // y-axis
        }
        let graphData = {
            labels: diagnosisNames,
            datasets: [
                {
                    label: 'Diagnosis Count',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: diagnosisCounts
                }
            ]
        }
        this.setState({
            graphData: graphData
        })
    }

    correctChoice = () => {
        // symtomId is the offset for 
        const symptomId = parseInt(this.state.symptomRank) + parseInt(this.state.startId)
        console.log("symptomId", symptomId)
        axios.get(`http://localhost:8000/api/diagnosis/${symptomId}/increment`)
            .then(res => {
                this.setState({showThanksModal: !this.state.showThanksModal, showGraph: true},
                    () => {
                        setTimeout(() => {
                            this.setState({showThanksModal: !this.state.showThanksModal})
                        }, 5000)
                    }
                )
            })
            .then(() => {
                this.generateGraphData()
            })
    }

    pickSymptom = (element) => {
        const symptomId = element.target.value
        this.setState({symptomId: symptomId})
        this.requestDiagnoses(symptomId)
    }

    resetUI = () => {
        this.setState({
            symptomsData: [],
            diagnosisData: [],
            graphData: {},
            symptomRank: 0,
            showThanksModal: false,
            startId: 0,
            showGraph: false,
            symptomId: 0

        })
    }

    renderSymptomsList = () => {
        return (
            this.state.symptomsData.map((symptom,i) => {
                return <option value={symptom.id} key={i}>{symptom.name}</option>
            })
        )
    }

    render() {
        return (
            <div className="SearchComponent">
                { this.state.showThanksModal ? <ThankYou /> : null }
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control as="select" custom onChange={this.pickSymptom}>
                        <option >Pick your symptom</option>
                        {this.renderSymptomsList()}
                    </Form.Control>
                    { 
                        this.state.diagnosisData.length ?
                        <DiagnosisContainer 
                            diagnosis={this.state.diagnosisData}
                            rejectChoice={this.rejectChoice}
                            correctChoice={this.correctChoice}
                            rank={this.state.symptomRank}
                        /> : null
                    }
                    </Form.Group>
                    { 
                        this.state.showGraph ? 
                        (<><Button variant="success" onClick={this.resetUI} float="center">Success</Button><GraphDiagnosesCount graphData={this.state.graphData} /></>) : null
                    }
                </Form>
            </div>
        );
    }
}

export default SearchContainer