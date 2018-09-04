import React, { Component } from 'react';
import './App.css';

import Plot from 'react-plotly.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          x: [],
          y: [],
          type: 'scatter',
          mode: 'points',
          marker: {color: 'red'},
        },
      ],
      layout: {
        width: 960,
        height: 500,
        title: 'A Fancy Plot',
        datarevision: 1,
        xaxis: {range: [-5, 5]},
        yaxis: {range: [-5, 5]}
      },
      frames: [],
      config: {} };
  }

  onInitialized = (figure, gd) => {
    this.setState(figure);

    let xaxis = gd._fullLayout.xaxis;
    let yaxis = gd._fullLayout.yaxis;
    let l = gd._fullLayout.margin.l;
    let t = gd._fullLayout.margin.t;

    gd.addEventListener('click', (evt) => {
      let newRealtimeData = [...this.state.data];

      const xInDataCoord = xaxis.p2c(evt.x - l) - 3;
      const yInDataCoord = yaxis.p2c(evt.y - t);

      console.log(xInDataCoord);
      console.log(yInDataCoord);

      newRealtimeData[0].x.push(xInDataCoord);
      newRealtimeData[0].y.push(yInDataCoord);

      const newLayout = Object.assign({}, this.state.layout);
      newLayout.datarevision++;

      this.setState({ data: newRealtimeData, layout: newLayout });

    });

    gd.addEventListener('mousemove', (evt) => {
      const xInDataCoord = xaxis.p2c(evt.x - l);
      const yInDataCoord = yaxis.p2c(evt.y - t);
      console.log(xInDataCoord);
      console.log(yInDataCoord);
    });
  }

  render() {
    return (
      <div className="App">
        <Plot
          data={this.state.data}
          layout={this.state.layout}

          onInitialized={this.onInitialized}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}

export default App;
