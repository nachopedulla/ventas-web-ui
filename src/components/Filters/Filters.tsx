import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import { SearchRequest } from '../../models/Movement';
import { Form } from '../../models/Filter';
import './Filters.css';

const Filters = ({ forms, request, changeHandler }: { forms: Array<Form>, request: SearchRequest, changeHandler: Function }) => (

    <div className='filters'>
        {
            forms.map(form => (
                <TextField
                    className='filter'
                    autoComplete='off'
                    id={form.id}
                    variant='outlined'
                    type={form.type}
                    select={form.type === 'select'}
                    value={request[form.id as keyof SearchRequest]}
                    InputLabelProps={{ shrink: true }}
                    label={form.label}
                    onChange={(event) => changeHandler(form.id, event)}
                >
                    {form.options?.map(option => <MenuItem key={option.value} value={option.value}>{option.label} </MenuItem>)}
                </TextField>
            ))
        }
    </div>
);

export default Filters;