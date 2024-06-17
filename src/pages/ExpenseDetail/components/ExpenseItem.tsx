import { Expense } from "../../../models/Expense";
import { formatAmount } from "../../../utils/NumberUtil";
import { formatDate } from "../../../utils/DateUtil";

const ExpenseItem = ({ title, expense }: { title?: string, expense: Expense }) => (
    <div className="product-detail">
        <p>{title}</p>
        <ul className="product-detail-list">
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Fecha</b></div>
                <div>{formatDate(expense.date)}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Descripción</b></div>
                <div>{expense.concept}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Categoría</b></div>
                <div>{expense.category}</div>
            </li>
            <li className="product-detail-item">
                <div className="product-detail-title"><b>Monto</b></div>
                <div>{formatAmount(expense.amount)}</div>
            </li>
        </ul>
    </div>
)


export default ExpenseItem;