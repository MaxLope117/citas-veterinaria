import { FC } from 'react';
import { patient } from '../interfaces';
import { Patient } from './Patient';

interface Props {
  patients: patient[];
  setPatient: React.Dispatch<React.SetStateAction<patient>>;
  deletePatient: (id: string) => void;
}

export const PatientList : FC<Props> = ({ patients, setPatient, deletePatient }) => {

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll">
      
      <h2 className="font-black text-3xl text-center">
        Listado Pacientes
      </h2>

      <p className="text-xl mt-5 text-center mb-7">
        Administra tus {''}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>

      {
        patients && patients.length 

          ? patients.map( patient => (
              <Patient 
                key={ patient.id } 
                patient={ patient } 
                setPatient={ setPatient }
                deletePatient={ deletePatient }
              />
            ))

          : (
            <div className="mx-5 my-5 bg-white shadow-md py-10 px-5 rounded-xl">

                <p className="font-bold mb-3 text-gray-700 text-center text-xl">
                  No hay ningún paciente registrado.
                </p>

                <p className='text-center'>
                  Comienza agregando pacientes {''} 
                  <span className='text-indigo-600 font-bold'>y aparecerán en este lugar.</span>
                </p> 

            </div>
          )
        
      }

    
    </div>
  );

};
