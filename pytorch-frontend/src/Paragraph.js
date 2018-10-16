import React, { Component } from 'react';
import Radium from 'radium';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './Paragraph.css';


class Paragraph extends Component {

  constructor(props) {
    super(props);
    this.state = {tooltipOpen: false};
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    let scores = this.props.scores;
    let mean = (
      scores.toxic + scores.severe_toxic +
      scores.obscene + scores.identity_hate +
      scores.threat + scores.insult
    ) / 6;

    const pStyle = {
      "backgroundColor": `rgba(255, 0, 0, ${mean})`,
      ":hover": {
        "textDecoration": "underline",
        "backgroundColor": `rgba(255, 0, 0, ${mean * 0.8 })`,
      }
    };

    const domId = `p_${scores.order}`

    return (
        <p id={domId} style={pStyle}
          onClick={this.toggle.bind(this)}>
          {/* onMouseLeave={this.toggle.bind(this)}> */}

          {this.props.text}

          <Popover placement="top-start"
                   isOpen={this.state.tooltipOpen}
                   target={domId} toggle={this.toggle.bind(this)}>
            <PopoverHeader>Toxicity score</PopoverHeader>
            <PopoverBody>
              <p><strong>Toxic:</strong> {scores.toxic.toFixed(4)}</p>
              <p><strong>Severe toxic:</strong> {scores.severe_toxic.toFixed(4)}</p>
              <p><strong>Obscene:</strong> {scores.obscene.toFixed(4)}</p>
              <p><strong>Threat:</strong> {scores.threat.toFixed(4)}</p>
              <p><strong>Insult:</strong> {scores.insult.toFixed(4)}</p>
              <p><strong>Identity hate:</strong> {scores.identity_hate.toFixed(4)}</p>


            </PopoverBody>
          </Popover>
        </p>
    )
  }
}

export default Radium(Paragraph);
