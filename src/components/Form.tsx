import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Error } from './Error';
import { patient, FormInterface } from '../interfaces';

interface Props {
  patient: patient;
  setPatient: React.Dispatch<React.SetStateAction<patient>>;
  patients: patient[];
  setPatients: React.Dispatch<React.SetStateAction<patient[]>>;
}

const initialForm = {
  petName: '',
  ownerName: '',
  email: '',
  discharge: '',
  symptom: '',
};

export const Form : FC<Props> = ({ patient, setPatient, patients, setPatients }) => {

  const [formState, setFormState] = useState<FormInterface>(initialForm);
  const [error, setError] = useState(false);

  useEffect(() => {

    if (Object.keys(patient).length > 0) {
      setFormState(patient);
    }

  }, [ patient ]);

  const { petName, ownerName, email, discharge, symptom } = formState;

  const onInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {

    const { value, name } = event.target;

    setFormState({
      ...formState,
      [ name ] : value,
    });

  };

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formState);
    if([ petName, ownerName, email, discharge, symptom ].includes('') ) {
      console.log('Hay al menos un campo vacío');
      setError(true);
      return;
    }

    setError(false);

    const newPatient = {
      id: '',
      petName,
      ownerName,
      email,
      discharge,
      symptom,
    }

    if(patient.id) {

      newPatient.id = patient.id;

      const patientsUpdated = patients.map( patientState => (
        patientState.id === patient.id ? newPatient : patientState
      ));

      setPatients(patientsUpdated);
      setPatient({
        id: '',
        petName: '',
        ownerName: '',
        email: '',
        discharge: '',
        symptom: '',
      });

    } else {
      
      newPatient.id = uuid();
      setPatients([...patients, newPatient]);
    }

    setFormState(initialForm);

  }

  return (

    <div className="md:w-1/2 lg:w-2/5 mx-5">

      <h2 className="font-black text-3xl text-center">
        Seguimiento Pacientes
      </h2>

      <p className="text-xl mt-5 text-center mb-7">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={ handleSubmit }
        className="bg-white shadow-md rounded-xl py-10 px-5 mb-10"
      >

        { error && <Error errorMessage='Todos los campos son obligatorios' /> }

        <div className="mb-5">
          <label
            htmlFor="pet"
            className="block text-gray-700 uppercase font-bold"
          >Nombre Mascota:</label>
          <input
            id="pet"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name='petName' 
            value={ petName }
            onChange={ onInputChange }
          /> 
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="owner"
            className="block text-gray-700 uppercase font-bold"
          >Nombre Propietario:</label>
          <input
            id="owner"
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name='ownerName'
            value={ ownerName }
            onChange={ onInputChange }
          /> 
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >Email:</label>
          <input
            id="email"
            type="email" 
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name='email'
            value={ email }
            onChange={ onInputChange }
          /> 
        </div>

        <div className="mb-5">
          <label
            htmlFor="discharge"
            className="block text-gray-700 uppercase font-bold"
          >Alta:</label>
          <input
            id="discharge"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            name='discharge'
            value={ discharge }
            onChange={ onInputChange }
          /> 
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptom"
            className="block text-gray-700 uppercase font-bold"
          >Síntomas:</label>
          <textarea 
            id="symptom"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            name="symptom"
            value={ symptom }
            onChange={ onInputChange }
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 rounded-md text-white uppercase font-bold 
            hover:bg-indigo-700 cursor-pointer transition-colors"
          value={ patient.id ? 'Editar Paciente' : 'Agregar paciente' }
        />

      </form>

    </div>
    
  );

};