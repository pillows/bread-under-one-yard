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
            diagnosisRank: 0,
            showThanksModal: false,
            startId: 0, // This holds the ID of the first Diagnosis filtered by Symptom. Not always guaranted to start at 1
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

    requestDiagnoses = (currentsymptomId) => {
        axios.get(`http://localhost:8000/api/symptoms/${currentSymptomIdsymptomId}`)
            .then(res => {
                this.setState({
                    diagnosisData: res.data,
                    startId: res.data[0].id
                })
            })
    }

    rejectChoice = () => {
        if(this.state.diagnosisRank === this.state.diagnosisData.length - 1){
            alert("all choices rejected")
            return
        }
        this.setState({ diagnosisRank: this.state.diagnosisRank + 1 })
    }

    generateGraphData = () => {
        this.requestDiagnoses(this.state.currentSymptomId)
        let diagnosisNames = []
        let diagnosisCounts = []

        //This populates the names of the diagnoses and their respective counters of the statistics bar graph
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
        // symtomId is the offset for getting the Diagnosis that the user selected
        // Since it's not always guaranteed to start at ID 0 and a user may pick a 
        // Diagnosis that is not first ranked
        const symptomId = parseInt(this.state.diagnosisRank) + parseInt(this.state.startId)
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

    pickSymptom = (dropdown) => {
        const symptomId = dropdown.target.value
        this.setState({symptomId: symptomId})
        this.requestDiagnoses(symptomId)
    }

    resetUI = () => {
        this.setState({
            symptomsData: [],
            diagnosisData: [],
            graphData: {},
            diagnosisRank: 0,
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
                            rank={this.state.diagnosisRank}
                        /> : null
                    }
                    </Form.Group>
                    { 
                        this.state.showGraph ? 
                        (<><Button variant="success" onClick={this.resetUI} float="center">Start Over</Button><GraphDiagnosesCount graphData={this.state.graphData} /></>) : null
                    }
                </Form>
            </div>
        );
    }
}

export default SearchContainer