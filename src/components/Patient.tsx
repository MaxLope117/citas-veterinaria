import { FC } from 'react';
import Swal from 'sweetalert2';
import { patient } from '../interfaces';

interface Props {
    patient: patient;
    setPatient: React.Dispatch<React.SetStateAction<patient>>;
    deletePatient: (id: string) => void;
}

export const Patient : FC<Props> = ({ patient, setPatient, deletePatient }) => {

    const { petName, ownerName, email, discharge, symptom, id } = patient;

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePatient(id);
                Swal.fire(
                    '¡Eliminado!',
                    'El paciente ha sido eliminado de la lista.',
                    'success'
                )
            }
        })
    }

    return (
        <div className="mx-5 my-5 bg-white shadow-md py-10 px-5 rounded-xl">

            <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
                <span className="font-normal normal-case">{ petName }</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {''}
                <span className="font-normal normal-case">{ ownerName }</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
                <span className="font-normal normal-case">{ email }</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Fecha de Alta: {''}
                <span className="font-normal normal-case">{ discharge }</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas: {''}
                <span className="font-normal normal-case">{ symptom }</span>
            </p>

            <div className='flex justify-between mt-10'>
                <button 
                  className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-md'
                  type='button'
                  onClick={ () => setPatient(patient) }
                >
                    Editar
                </button>

                <button 
                  className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-md'
                  type='button'
                  onClick={ handleDelete }
                >
                    Eliminar
                </button>
            </div>
        
        </div>
    );

};
