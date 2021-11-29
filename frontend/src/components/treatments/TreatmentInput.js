import React, { useState } from 'react';

import './TreatmentInput.css';
import Card from '../UI/Card';

function TreatmentInput(props) {
  const [enteredTreatmentText, setEnteredTreatmentText] = useState('');

  function updateTreatmentTextHandler(event) {
    setEnteredTreatmentText(event.target.value);
  }

  function treatmentSubmitHandler(event) {
    event.preventDefault();

    if (enteredTreatmentText.trim().length === 0) {
      alert('Invalid text - please enter a longer one!');
      return;
    }

    props.onAddTreatment(enteredTreatmentText);

    setEnteredTreatmentText('');
  }

  return (
    <section id='treatment-input'>
      <Card>
        <form onSubmit={treatmentSubmitHandler}>
          <label htmlFor='text'>New Treatment</label>
          <input
            type='text'
            id='text'
            value={enteredTreatmentText}
            onChange={updateTreatmentTextHandler}
          />
          <button className="add-button">Add Treatment</button>
        </form>
      </Card>
    </section>
  );
}

export default TreatmentInput;