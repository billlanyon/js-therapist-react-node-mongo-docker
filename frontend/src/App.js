import React, { useState, useEffect } from 'react';

import TreatmentInput from './components/treatments/TreatmentInput';
import Treatments from './components/treatments/Treatments';
import ErrorAlert from './components/UI/ErrorAlert';

function App() {
  const [loadedTreatments, setLoadedTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/treatments');

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the treatments failed.');
        }

        setLoadedTreatments(resData.treatments);
      } catch (err) {
        setError(
          err.message ||
            'Fetching treatments failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addTreatmentHandler(treatmentText) {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/treatments', {
        method: 'POST',
        body: JSON.stringify({
          text: treatmentText,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the treatment failed.');
      }

      setLoadedTreatments((prevTreatments) => {
        const updatedTreatments = [
          {
            id: resData.treatment.id,
            text: treatmentText,
          },
          ...prevTreatments,
        ];
        return updatedTreatments;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a treatment failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteTreatmentHandler(treatmentId) {
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://localhost/treatments/' + treatmentId,
        {
          method: 'DELETE',
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the treatment failed.');
      }

      setLoadedTreatments((prevTreatments) => {
        const updatedTreatment = prevTreatments.filter(
          (treatment) => treatment.id !== treatmentId
        );
        return updatedTreatment;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the treatment failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <TreatmentInput onAddTreatment={addTreatmentHandler} />
      {!isLoading && (
        <Treatments
          treatments={loadedTreatments}
          onDeleteTreatment={deleteTreatmentHandler}
        />
      )}
    </div>
  );
}

export default App;
