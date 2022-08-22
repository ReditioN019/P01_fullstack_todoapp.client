import { useState } from "react";

export const useForm = (initialState = {}) => {

    const [inputs, setInputs] = useState(initialState);

    //Actualización del input de búsqueda
    const handleChange = ({ target }) => {
        const {name, value} = target;

        //restringe caracteres especiales en el input. (Solo letras, numeros y espacios)
        let dataInput = new RegExp(/^[A-Za-z0-9\s]+$/g);
        let res = dataInput.test(value)
        
        if ((res || value === '') /*&& value.length < 80*/) {
            setInputs( state => ({
                ...state,
                [name]: value
            }));
        }
    }

    const handleReset = () => setInputs( initialState );


    return {
        ...inputs,
        setInputs,
        inputs,
        handleChange,
        handleReset
    }

}