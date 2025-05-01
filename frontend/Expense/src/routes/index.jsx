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
import Borrow from "../page/Borrow";
import Calendars from "../page/Calendars";
import PrivateRoutes from "../components/PrivateRoutes";
import Error404 from "../page/Error404/index";
import Introduce from "../page/Introduce";
import Logout from "../page/Logout";
import GoalDetail from "../page/GoalsSaving/GoalDetail";
import TransactionNew from "../page/TransactionNew";

export const routes = [
  {
    path: "/gioi-thieu",
    element: <Introduce />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <LayoutDefault />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "ngan-sach",
            element: <Budget />,
          },
          {
            path: "giao-dich",
            element: <TransactionNew />,
            // children: [
            //   {
            //     index: true,
            //     element: <Navigate to="recent" replace />,
            //   },
            //   {
            //     path: "recent",
            //     element: <Recent />,
            //   },
            //   {
            //     path: "chi",
            //     element: <Expense />,
            //   },
            //   {
            //     path: "thu",
            //     element: <Income />,
            //   },
            //   {
            //     path: "recurring",
            //     element: <Recurring />,
            //   },
            // ],
          },
          {
            path: "tiet-kiem",
            element: <GoalsSaving />,
          },
          {
            path: "tiet-kiem/:id",
            element: <GoalDetail />,
          },
          {
            path: "khoan-vay",
            element: <Borrow />,
          },

          {
            path: "lich",
            element: <Calendars />,
          },
          {
            path: "bao-cao",
            element: <Statistics />,
          },
          {
            path: "dang-xuat",
            element: <Logout />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
];
