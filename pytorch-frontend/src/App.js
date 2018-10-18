import React, { Component } from 'react';
import { TextBox } from './TextBox';
import { Preds } from './Preds';
import './bootstrap.min.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {paragraphs: []};
  }

  setParagraphs(paragraphs) {
    this.setState((state, props) => {
      return {paragraphs: paragraphs}
    })
  }

  render() {
    const info = {
      "fontSize": "1.2rem"
    }
    return (
      <div className="App">
        <div className="row">
          <div className="col" style={{"textAlign": "center"}}>
            <h1>Toxic comment classification</h1>
          </div>
        </div>

        <div className="row" style={info}>
          <div className="col">
            <strong>What's this?</strong>
            <p>
              This is an app that detects toxic comments. It also tells you what "kind" of toxicity it is when you click on the highlighted text.
            </p>
            <p>
              The model was trained using Deep Learning on the Jigsaw Toxic Comment Classification dataset on Kaggle.
            </p>
          </div>
        </div>
        <hr/>
        <div className="row" style={{"fontSize": "1.5rem"}}>
          <div className="col">
            <strong>Enter your comment here</strong>
            <TextBox setParagraphs={this.setParagraphs.bind(this)}></TextBox>

          </div>
          <div className="col">
            <strong>Result</strong>
            <Preds paragraphs={this.state.paragraphs}></Preds>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
