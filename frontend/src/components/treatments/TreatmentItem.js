import React from 'react';

import './TreatmentItem.css';

function TreatmentItem(props) {
  return <li className="treatment-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}

export default TreatmentItem;
