import BudgetDashboard from "../BudgetDashboard";
import TransactionDashboard from "../TransactionDashboard";
import "./BudgetTransaction.scss";

function BudgetTransaction() {
  return (
    <>
      <div className="budget-transaction">
        <BudgetDashboard />
        <TransactionDashboard />
      </div>
    </>
  );
}
export default BudgetTransaction;
