import { useEffect, useState } from "react";
import { Button } from "antd";
import { UnorderedListOutlined, TableOutlined } from "@ant-design/icons";
import BudgetGrid from "./BudgetGrid";
import BudgetTable from "./BudgetTable";
import { getBudget } from "../../../services/BudgetService";

function ListBudget() {
  const [budgets, setBudget] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const fetchApi = async () => {
    const result = await getBudget();
    console.log(result);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };
  return (
    <>
      <Button onClick={() => setIsGrid(false)}>
        <UnorderedListOutlined />
      </Button>
      <Button onClick={() => setIsGrid(true)}>
        <TableOutlined />
      </Button>

      <div style={{ marginTop: "20px" }}>
        {isGrid ? (
          <BudgetGrid budgets={budgets} />
        ) : (
          <BudgetTable budgets={budgets} />
        )}
      </div>
    </>
  );
}
export default ListBudget;
