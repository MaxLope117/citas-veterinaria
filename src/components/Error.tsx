import { FC } from 'react';

interface Props {
    errorMessage: string;
}

export const Error : FC<Props> = ({ errorMessage }) => {
    return (
        <div className='bg-red-800 rounded-md text-white text-center p-3 uppercase text-bold mb-3'>
            <p>{errorMessage}</p>
        </div>
    );
};
