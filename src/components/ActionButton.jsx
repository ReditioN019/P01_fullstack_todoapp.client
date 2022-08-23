import Button from '@mui/material/Button';
import { AiFillFileAdd } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

export const ActionButton = ({handleFunction, text, icon}) => {
    return (
        <Button
                variant="outlined"
                onClick={handleFunction}
            >
                {text}
                {
                    (icon == 'addTask') &&
                    <AiFillFileAdd
                        size={20}
                        style={{ marginLeft: "1rem" }}
                    />
                }

                {
                    (icon == 'deleteTask') &&
                    <FaTrash
                        size={20}
                        style={{ marginLeft: "1rem" }}
                    />
                }
                
            </Button>
    )
}
