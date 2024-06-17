import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useExpenses } from "../../context/ExpenseContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Expense } from "../../models/Expense";
import PageTitle from "../../components/PageTitle/PageTitle";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";
import { FaSave } from "@react-icons/all-files/fa/FaSave";
import Modal from "../../components/Modal/Modal";
import { CONCEPTS } from "../../mocks/ConceptMock";
import ExpenseItem from "./components/ExpenseItem";

const ExpenseDetail = ({ title }: { title: string }) => {

    const { expenseId } = useParams();

    const expenses = useExpenses();
    const navigate = useNavigate();

    const [expense, setExpense] = useState<Expense | undefined>(undefined);
    const [disabled, setDisabled] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (expenseId === undefined) {
            setExpense(new Expense());
            setDisabled(false);
        } else {
            setExpense(expenses.getById(expenseId as string));
        }
    }, [])

    function changeHandler<K extends keyof Expense>(key: K, value: any) {
        let auxExpense = { ...expense! };
        auxExpense[key] = value;
        setExpense(auxExpense);
    }


    function save() {
        expenses.add(expense!);
        navigate(-1);
    }

    return expense === undefined ? null : (
        <div>
            <PageTitle text={title} />
            <div className="product-form">
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='concept'
                    label='Descripcion'
                    InputLabelProps={{ shrink: true }}
                    type='text'
                    value={expense?.concept}
                    onChange={(event) => changeHandler('concept', event.target.value)}
                />
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='name'
                    label='Categoria'
                    InputLabelProps={{ shrink: true }}
                    type='text'
                    select
                    value={expense?.category}
                    onChange={(event) => changeHandler('category', event.target.value)}
                >
                    <MenuItem value={undefined}></MenuItem>
                    {
                        CONCEPTS.map(concept =>
                            <MenuItem key={concept} value={concept}>{concept}</MenuItem>
                        )
                    }
                </TextField>
                <TextField
                    disabled={disabled}
                    className="product-filter"
                    id='amount'
                    label='Monto'
                    type='number'
                    onChange={(event) => changeHandler('amount', Number.parseFloat(event.target.value))}
                    InputLabelProps={{ shrink: true }}
                    value={expense?.amount}
                    InputProps={{
                        sx: {
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                display: 'none'
                            },
                            '& input[type=number]': {
                                MozAppearance: 'textfield'
                            },
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaDollarSign />
                            </InputAdornment>
                        ),
                    }}
                />
            </div> 
            <div className="product-buttons">
                {
                disabled ? null : (                    
                    <Button
                        size="medium"
                        className="product-button"
                        variant="outlined"
                        endIcon={<FaSave size={14} />}
                        onClick={() => setShowConfirmation(!showConfirmation)}
                    >
                        Guardar
                    </Button>
                )
                }
            </div>
            <Modal
                show={showConfirmation}
                cancel={() => setShowConfirmation(!showConfirmation)}
                confirm={save}
            >
                <ExpenseItem
                    title="DETALLE DEL GASTO"
                    expense={expense!}
                />
            </Modal>
        </div>
    )
}

export default ExpenseDetail;