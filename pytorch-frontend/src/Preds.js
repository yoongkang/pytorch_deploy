import React, { Component } from 'react';
import Paragraph from './Paragraph';


export class Preds extends Component {

  render() {
    const divStyle = {
      "fontSize": "1.5rem",
      "flexDirection": "row",
      "cursor": "pointer",
    }
    let pars = this.props.paragraphs.map(p =>
      <Paragraph key={p.order} text={p.text} scores={p}>
      </Paragraph>
    )


    return (
      <div style={divStyle}>
        {pars}
      </div>
    )
  }
}
