import React from 'react';

import './Treatments.css';
import Card from '../UI/Card';
import TreatmentItem from './TreatmentItem';

function Treatments(props) {
  const hasNoTreatments = !props.treatments || props.treatments.length === 0;

  return (
    <section id='treatments'>
      <Card>
        <h2>Your Treatments</h2>
        {hasNoTreatments && <h2>No treatments found. Start adding some!</h2>}
        <ul>
          {props.treatments.map((treatment) => (
            <TreatmentItem
              key={treatment.id}
              id={treatment.id}
              text={treatment.text}
              onDelete={props.onDeleteTreatment}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default Treatments;
