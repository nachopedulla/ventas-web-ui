import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import { Form } from "../../models/Filter";
import ResultTable, { Header } from "../../components/Table/ResultTable";
import SuccessIconButton from "../../components/Button/Success";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { useExpenses } from "../../context/ExpenseContext";
import Modal from "../../components/Modal/Modal";
import ExpenseItem from "../ExpenseDetail/components/ExpenseItem";
import { FaEye } from "@react-icons/all-files/fa/FaEye";

const Expenses = ({ forms, headers }: { forms: Array<Form>, headers: Array<Header> }) => {

    const [request, setRequest] = useState({ dateUntil: undefined, dateFrom: undefined, concept: undefined });
    const [selectedExpense, setSelectedExpense] = useState<string | undefined>(undefined);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const navigate = useNavigate();
    const newExpenseHandler = (id: string) => navigate('/gastos/nuevo');

    const expenses = useExpenses();

    const removeHandler = () => {
        expenses.remove(selectedExpense!);
        setSelectedExpense(undefined);
        handleConfirm(undefined);
    }

    const handleConfirm = (id: string | undefined) => {
        setSelectedExpense(id);
        setShowConfirmation(!showConfirmation);
    }

    const actions = [
        {
            id: 'Ver Detalle',
            icon: <FaEye size={14} />,
            handler: (id : string) => navigate('/gastos/' + id)
        },
        {
            id: 'Eliminar',
            icon: <FaTrash size={14} color='#c11f1f' />,
            handler: handleConfirm
        }
    ]

    return (
        <>
            <h4>{`Panel de Gastos`}</h4>
            <Filters
                forms={forms}
                request={{}}
                changeHandler={() => { }}
            />
            <SuccessIconButton
                text='Nuevo Gasto'
                icon={<FaPlus size={13} />}
                handler={newExpenseHandler}
            />
            <ResultTable
                data={expenses.get()}
                headers={headers}
                actions={actions}
            />
            <Modal
                show={showConfirmation}
                cancel={handleConfirm}
                confirm={removeHandler}
            >
                <ExpenseItem
                    title="¿Está seguro de que desea eliminar el elemento?"
                    expense={expenses.getById(selectedExpense!)!}
                />

            </Modal>
        </>
    )
};

export default Expenses;