import { useState, useEffect } from 'react';
import { Form, Header, PatientList } from './components';
import { patient } from './interfaces';

const App = () => {

  const [patients, setPatients] = useState<patient[]>([]);
  const [patient, setPatient] = useState<patient>({
    id: '',
    petName: '',
    ownerName: '',
    email: '',
    discharge: '',
    symptom: '',
  });

  useEffect(() => {

    const getLocalStorage = () => {

      const localPatients = JSON.parse(localStorage.getItem('patients') ?? '[]');
      // console.log(localPatients);
      setPatients(localPatients);

    };

    getLocalStorage();

  }, []);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [ patients ]);

  const deletePatient = (id : string) => {
    const patientUpdated = patients.filter(patient => patient.id !== id);
    setPatients(patientUpdated);
  };

  return (

    <div className="container mx-auto my-10 py-5">

      <Header />

      <div className="my-5 md:flex">

        <Form 
          patient={ patient }
          setPatient={ setPatient }
          patients={ patients }
          setPatients={ setPatients }
        />

        <PatientList 
          patients={ patients }
          setPatient={ setPatient }
          deletePatient={ deletePatient }
        />

      </div>

    </div>

  );

};

export default App;
