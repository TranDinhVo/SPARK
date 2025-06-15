import BudgetDashboard from "./BudgetDashboard";
import TransactionDashboard from "./TransactionDashboard";
import "../../assets/scss/BudgetTransaction.scss";  

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
