import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { API_BASE_URL } from './consts';

export class TextBox extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  async handleChange(event) {
    const value = event.target.value;
    this.setState({value: value});
    const setParagraphs = this.props.setParagraphs;
    try {
      let response = await fetch(`${API_BASE_URL}/predict/?text=${encodeURI(value)}`);
      let body = await response.json();
      setParagraphs(body.data);
    } catch(err) {
      console.log(err);
    }

  }

  render() {

    const textareaStyle = {
      "fontSize": "1.5rem",
      "border": "3px solid rgba(0,0,0,0.1)",
      "resize": "none"
    }
    const divStyle = {
      "alignItems": "stretch"
    }
    return (
      <div style={divStyle}>
        <DebounceInput
          element="textarea"
          minLength={2}
          cols="37"
          rows="10"
          debounceTimeout={300}
          value={this.state.value}
          style={textareaStyle}
          onChange={this.handleChange.bind(this)} autoFocus>
        </DebounceInput>
      </div>
    )
  }
}
