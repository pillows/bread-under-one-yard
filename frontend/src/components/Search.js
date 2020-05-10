import axios from 'axios';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

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
            showGraph: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/symptoms`)
        .then(res => {
            this.setState({
                symptoms: res.data
            })
        })
    }

    requestDiagnoses = (symptomId) => {
        axios.get(`http://localhost:8000/api/symptoms/${symptomId}`)
            .then(res => {
                this.setState({
                    diagnosisData: res.data,
                    startId: res.data[0].id
                })
            })
    }

    rejectChoice = () => {
        if(this.state.symptomRank === this.state.diagnosis.length - 1){
            alert("all choices rejected")
            return
        }
        this.setState({ symptomRankrank: this.state.symptomRank + 1 })
    }

    correctChoice = () => {
        // symtomId is the offset for 
        const symptomId = this.state.rank + this.state.startId 
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

                // make into graph function
                /*
                this.requestDiagnoses(symptomId)

                let diagnosisNames = []
                let diagnosisCounts = []

                //comment
                for(const diag of this.state.diagnosis){
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
                */
            })
    }

    pickSymptom = (element) => {
        const symptomId = element.target.value
        this.requestDiagnoses(symptomId)
    }

    resetUI(){
        
    }

    renderSymptomsList = () => {
        return (
            this.state.symptoms.map((symptom,i) => {
                return <option value={symptom.id} key={i}>{symptom.name}</option>
            })
        )
    }

    render() {
        return (
            <div className="SearchComponent">
                { this.state.showThanksModal && <ThankYou /> }
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Custom select</Form.Label>
                    <Form.Control as="select" custom onChange={this.pickSymptom)}>
                        <option >Pick your symptom</option>
                        {this.renderSymptoms()}
                    </Form.Control>
                    { 
                        this.state.diagnosis.length &&
                        <DiagnosisContainer 
                            diagnosis={this.state.diagnosis}
                            rejectChoice={this.rejectChoice}
                            correctChoice={this.correctChoice}
                            rank={this.state.rank}
                        />
                    }
                    </Form.Group>
                    { this.state.showGraph && <GraphDiagnosesCount graphData={this.state.graphData} /> }
                </Form>
            </div>
        );
    }
}

export default SearchContainer