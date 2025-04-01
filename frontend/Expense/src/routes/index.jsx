import LayoutDefault from "../layout/LayoutDefault";
import Dashboard from "../page/Dashboard/index";
import Budget from "../page/Budget/index";
import Transaction from "../page/Transaction/index";
import Recent from "../page/Transaction/Recent";
import Expense from "../page/Transaction/Expense/index";
import Income from "../page/Transaction/Income/index";
import Recurring from "../page/Transaction/Recurring/index";
import { Navigate } from "react-router-dom";
import GoalsSaving from "../page/GoalsSaving";
import Statistics from "../page/Statistics";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "budget",
        element: <Budget />,
      },
      {
        path: "transaction",
        element: <Transaction />,
        children: [
          {
            index: true,
            element: <Navigate to="recent" replace />,
          },
          {
            path: "recent",
            element: <Recent />,
          },
          {
            path: "expense",
            element: <Expense />,
          },
          {
            path: "income",
            element: <Income />,
          },
          {
            path: "recurring",
            element: <Recurring />,
          },
        ],
      },
      {
        path: "saving",
        element: <GoalsSaving />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
];
