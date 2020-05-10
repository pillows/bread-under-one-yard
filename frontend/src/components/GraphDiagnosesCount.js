import React from 'react';
import {Bar} from 'react-chartjs-2';

class GraphDiagnosesCount extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={this.props.graphData}
          options={{
            title:{
              display:true,
              text:'Diagnoses Count',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}

export default GraphDiagnosesCount